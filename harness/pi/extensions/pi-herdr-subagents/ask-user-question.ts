import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import {
	Editor,
	type EditorTheme,
	Key,
	Text,
	matchesKey,
	truncateToWidth,
	wrapTextWithAnsi,
} from "@earendil-works/pi-tui";
import { Type } from "@sinclair/typebox";

interface AskOption {
	label: string;
	value: string;
	description?: string;
}

interface DisplayOption extends AskOption {
	id: string;
	index?: number;
	isOther?: boolean;
	isSubmit?: boolean;
}

interface TextAnswer {
	type: "text";
	label: string;
	value: string;
}

interface OptionAnswer {
	type: "option";
	label: string;
	value: string;
	index: number;
}

interface OtherAnswer {
	type: "other";
	label: string;
	value: string;
}

type AskAnswer = TextAnswer | OptionAnswer | OtherAnswer;
type AskUserQuestionStatus = "answered" | "cancelled" | "unavailable";
type AskUserQuestionMode = "text" | "single-select" | "multi-select" | "questions";

interface AskUserQuestionResultDetails {
	status: AskUserQuestionStatus;
	question: string;
	context?: string;
	mode: AskUserQuestionMode;
	answers: AskAnswer[];
	message?: string;
	/** Present when multiple questions were asked in one window. */
	questions?: Array<{
		id: string;
		label: string;
		question: string;
		context?: string;
		mode: AskUserQuestionMode;
		answers: AskAnswer[];
	}>;
}

interface ResolvedAskQuestion {
	id: string;
	label: string;
	question: string;
	context?: string;
	mode: AskUserQuestionMode;
	options: AskOption[];
}

const OptionSchema = Type.Object({
	label: Type.String({
		description:
			'Display label for the option. If you recommend an option, place it first and append "(Recommended)" to the label.',
	}),
	value: Type.Optional(
		Type.String({
			description: "Optional machine-readable value returned for the option. Defaults to the label.",
		}),
	),
	description: Type.Optional(Type.String({ description: "Optional extra detail shown below the option." })),
});

const QuestionInputSchema = Type.Object({
	id: Type.Optional(Type.String({ description: "Optional unique id (defaults to q1, q2…)" })),
	label: Type.Optional(Type.String({ description: "Tab label (defaults to Q1, Q2…)" })),
	question: Type.String({ description: "The question text." }),
	details: Type.Optional(Type.String({ description: "Optional extra context shown under the question." })),
	options: Type.Optional(Type.Array(OptionSchema)),
	multiSelect: Type.Optional(Type.Boolean({ description: "Allow multiple answers for this question." })),
});

const AskUserQuestionParams = Type.Object({
	question: Type.Optional(
		Type.String({
			description: "The single question to ask the user. Either this or `questions` is required.",
		}),
	),
	details: Type.Optional(
		Type.String({
			description: "Optional extra context or instructions shown under the question.",
		}),
	),
	options: Type.Optional(
		Type.Array(OptionSchema, {
			description:
				"Optional multiple-choice options. Omit or pass an empty array for free-form text input. Users will always be able to choose Other and type a custom answer when options are provided.",
		}),
	),
	multiSelect: Type.Optional(
		Type.Boolean({
			description: "Set to true to allow multiple answers to be selected for a question.",
		}),
	),
	questions: Type.Optional(
		Type.Array(QuestionInputSchema, {
			description:
				"Ask several questions at once — shows a tabbed window with a header; Tab/←→ to move between questions. At least one answer per question is required to submit.",
		}),
	),
});

function normalizeOptions(options: Array<{ label: string; value?: string; description?: string }> | undefined): AskOption[] {
	return (options || [])
		.map((option) => ({
			label: option.label.trim(),
			value: option.value?.trim() || option.label.trim(),
			description: option.description?.trim() || undefined,
		}))
		.filter((option) => option.label.length > 0);
}

function getOtherLabel(options: AskOption[]): string {
	return options.some((option) => option.label.toLowerCase() === "other") ? "Other (custom)" : "Other";
}

function normalizeQuestionOptions(question: any): AskOption[] {
	return normalizeOptions(question.options);
}

function resolveAskQuestions(params: any): ResolvedAskQuestion[] {
	const inputs = Array.isArray(params.questions) && params.questions.length > 0 ? params.questions : [];
	if (inputs.length > 0) {
		return inputs.map((q: any, i: number) => {
			const options = normalizeQuestionOptions(q);
			return {
				id: typeof q.id === "string" && q.id.trim() ? q.id.trim() : `q${i + 1}`,
				label: typeof q.label === "string" && q.label.trim() ? q.label.trim() : `Q${i + 1}`,
				question: String(q.question ?? ""),
				context: typeof q.details === "string" ? q.details.trim() || undefined : undefined,
				mode: options.length === 0 ? "text" : q.multiSelect ? "multi-select" : "single-select",
				options,
			};
		});
	}

	const options = normalizeOptions(params.options);
	return [{
		id: "q1",
		label: "Q1",
		question: String(params.question ?? ""),
		context: typeof params.details === "string" ? params.details.trim() || undefined : undefined,
		mode: options.length === 0 ? "text" : params.multiSelect ? "multi-select" : "single-select",
		options,
	}];
}

function createEditorTheme(theme: any): EditorTheme {
	return {
		borderColor: (s) => theme.fg("accent", s),
		selectList: {
			selectedPrefix: (t) => theme.fg("accent", t),
			selectedText: (t) => theme.fg("accent", t),
			description: (t) => theme.fg("muted", t),
			scrollInfo: (t) => theme.fg("dim", t),
			noMatch: (t) => theme.fg("warning", t),
		},
	};
}

function addWrapped(lines: string[], text: string, width: number, indent = ""): void {
	const contentWidth = Math.max(1, width - indent.length);
	for (const line of wrapTextWithAnsi(text, contentWidth)) {
		lines.push(truncateToWidth(`${indent}${line}`, width));
	}
}

function formatAnswerForModel(answer: AskAnswer): string {
	switch (answer.type) {
		case "text":
			return answer.label;
		case "other":
			return `Other: ${answer.label}`;
		case "option":
			return `${answer.index}. ${answer.label}`;
	}
}

function answerSortRank(answer: AskAnswer): number {
	switch (answer.type) {
		case "option":
			return answer.index;
		case "other":
			return Number.MAX_SAFE_INTEGER - 1;
		case "text":
			return Number.MAX_SAFE_INTEGER;
	}
}

function sortAnswers(answers: AskAnswer[]): AskAnswer[] {
	return [...answers].sort((a, b) => answerSortRank(a) - answerSortRank(b));
}

function buildStructuredResult(
	status: AskUserQuestionStatus,
	question: string,
	mode: AskUserQuestionMode,
	answers: AskAnswer[],
	context?: string,
	message?: string,
) {
	return {
		status,
		question,
		context,
		mode,
		answers,
		message,
	} as AskUserQuestionResultDetails;
}

function cancelledResult(question: string, mode: AskUserQuestionMode, context?: string) {
	const message = "User cancelled the question";
	return {
		content: [{ type: "text" as const, text: message }],
		details: buildStructuredResult("cancelled", question, mode, [], context, message),
	};
}

function unavailableResult(question: string, mode: AskUserQuestionMode, message: string, context?: string) {
	return {
		content: [{ type: "text" as const, text: message }],
		details: buildStructuredResult("unavailable", question, mode, [], context, message),
	};
}

function buildResult(question: string, context: string | undefined, mode: AskUserQuestionMode, answers: AskAnswer[]) {
	let text: string;
	if (mode === "text") {
		const answer = answers[0];
		text = answer.label.trim().length > 0 ? `User answered: ${answer.label}` : "User submitted an empty response";
	} else if (mode === "single-select") {
		text = `User selected: ${formatAnswerForModel(answers[0])}`;
	} else {
		text = `User selected:\n${answers.map((answer) => `- ${formatAnswerForModel(answer)}`).join("\n")}`;
	}

	return {
		content: [{ type: "text" as const, text }],
		details: buildStructuredResult("answered", question, mode, answers, context),
	};
}

async function askSingleChoice(
	ctx: any,
	question: string,
	context: string | undefined,
	options: AskOption[],
): Promise<AskAnswer | null> {
	const otherLabel = getOtherLabel(options);
	const allOptions: DisplayOption[] = [
		...options.map((option, index) => ({ ...option, id: `option:${index}`, index: index + 1 })),
		{ id: "other", label: otherLabel, value: "__other__", isOther: true },
	];

	return ctx.ui.custom((tui: any, theme: any, _kb: any, done: (result: AskAnswer | null) => void) => {
		let optionIndex = 0;
		let editMode = false;
		let cachedLines: string[] | undefined;
		let cachedWidth = -1;
		const editor = new Editor(tui, createEditorTheme(theme));

		editor.onSubmit = (value) => {
			const trimmed = value.trim();
			if (!trimmed) return;
			done({ type: "other", label: trimmed, value: trimmed });
		};

		function refresh() {
			cachedLines = undefined;
			tui.requestRender();
		}

		function handleInput(data: string) {
			if (editMode) {
				if (matchesKey(data, Key.escape)) {
					editMode = false;
					editor.setText("");
					refresh();
					return;
				}
				editor.handleInput(data);
				refresh();
				return;
			}

			if (matchesKey(data, Key.up)) {
				optionIndex = Math.max(0, optionIndex - 1);
				refresh();
				return;
			}
			if (matchesKey(data, Key.down)) {
				optionIndex = Math.min(allOptions.length - 1, optionIndex + 1);
				refresh();
				return;
			}
			if (matchesKey(data, Key.enter)) {
				const selected = allOptions[optionIndex];
				if (selected.isOther) {
					editMode = true;
					editor.setText("");
					refresh();
					return;
				}
				done({
					type: "option",
					label: selected.label,
					value: selected.value,
					index: selected.index!,
				});
				return;
			}
			if (matchesKey(data, Key.escape)) {
				done(null);
			}
		}

		function render(width: number): string[] {
			// The cache MUST be keyed on width: pi-tui calls requestRender() but NOT
			// invalidate() on terminal resize, so render() can be re-entered with a
			// new width. Returning stale wider lines trips the TUI width guard and
			// crashes the process.
			if (cachedLines && cachedWidth === width) return cachedLines;

			const lines: string[] = [];
			const add = (text: string) => lines.push(truncateToWidth(text, width));

			add(theme.fg("accent", "─".repeat(width)));
			addWrapped(lines, theme.fg("text", ` ${question}`), width);
			if (context) {
				lines.push("");
				addWrapped(lines, theme.fg("muted", ` ${context}`), width);
			}
			lines.push("");

			for (let i = 0; i < allOptions.length; i++) {
				const option = allOptions[i];
				const selected = i === optionIndex;
				const prefix = selected ? theme.fg("accent", "> ") : "  ";
				const label = option.isOther ? option.label : `${option.index}. ${option.label}`;
				const styled = selected ? theme.fg("accent", label) : theme.fg("text", label);
				add(`${prefix}${styled}`);
				if (option.description) {
					addWrapped(lines, theme.fg("muted", option.description), width, "     ");
				}
			}

			if (editMode) {
				lines.push("");
				add(theme.fg("muted", " Write your custom answer:"));
				for (const line of editor.render(Math.max(1, width - 2))) {
					add(` ${line}`);
				}
				lines.push("");
				add(theme.fg("dim", " Enter to submit • Esc to go back"));
			} else {
				lines.push("");
				add(theme.fg("dim", " ↑↓ navigate • Enter select • Esc cancel"));
			}

			add(theme.fg("accent", "─".repeat(width)));
			cachedLines = lines;
			cachedWidth = width;
			return lines;
		}

		return {
			render,
			invalidate: () => {
				cachedLines = undefined;
			},
			handleInput,
		};
	});
}

async function askMultiChoice(
	ctx: any,
	question: string,
	context: string | undefined,
	options: AskOption[],
): Promise<AskAnswer[] | null> {
	const otherLabel = getOtherLabel(options);
	const choiceItems: DisplayOption[] = options.map((option, index) => ({
		...option,
		id: `option:${index}`,
		index: index + 1,
	}));
	const submitItem: DisplayOption = { id: "submit", label: "Submit", value: "__submit__", isSubmit: true };
	const allItems: DisplayOption[] = [
		...choiceItems,
		{ id: "other", label: otherLabel, value: "__other__", isOther: true },
		submitItem,
	];

	return ctx.ui.custom((tui: any, theme: any, _kb: any, done: (result: AskAnswer[] | null) => void) => {
		let optionIndex = 0;
		let editMode = false;
		let cachedLines: string[] | undefined;
		let cachedWidth = -1;
		const selected = new Map<string, AskAnswer>();
		const editor = new Editor(tui, createEditorTheme(theme));

		editor.onSubmit = (value) => {
			const trimmed = value.trim();
			if (!trimmed) return;
			selected.set("other", { type: "other", label: trimmed, value: trimmed });
			editMode = false;
			refresh();
		};

		function refresh() {
			cachedLines = undefined;
			tui.requestRender();
		}

		function toggleOption(item: DisplayOption) {
			if (selected.has(item.id)) {
				selected.delete(item.id);
			} else {
				selected.set(item.id, {
					type: "option",
					label: item.label,
					value: item.value,
					index: item.index!,
				});
			}
			refresh();
		}

		function handleInput(data: string) {
			if (editMode) {
				if (matchesKey(data, Key.escape)) {
					editMode = false;
					editor.setText(selected.get("other")?.label || "");
					refresh();
					return;
				}
				editor.handleInput(data);
				refresh();
				return;
			}

			if (matchesKey(data, Key.up)) {
				optionIndex = Math.max(0, optionIndex - 1);
				refresh();
				return;
			}
			if (matchesKey(data, Key.down)) {
				optionIndex = Math.min(allItems.length - 1, optionIndex + 1);
				refresh();
				return;
			}

			const current = allItems[optionIndex];
			if (matchesKey(data, Key.space)) {
				if (current.isSubmit) return;
				if (current.isOther) {
					if (selected.has("other")) {
						selected.delete("other");
						refresh();
					} else {
						editMode = true;
						editor.setText("");
						refresh();
					}
					return;
				}
				toggleOption(current);
				return;
			}

			if (matchesKey(data, Key.enter)) {
				if (current.isSubmit) {
					if (selected.size > 0) {
						done(sortAnswers(Array.from(selected.values())));
					}
					return;
				}
				if (current.isOther) {
					editMode = true;
					editor.setText(selected.get("other")?.label || "");
					refresh();
					return;
				}
				toggleOption(current);
				return;
			}

			if (matchesKey(data, Key.escape)) {
				done(null);
			}
		}

		function render(width: number): string[] {
			// The cache MUST be keyed on width: pi-tui calls requestRender() but NOT
			// invalidate() on terminal resize, so render() can be re-entered with a
			// new width. Returning stale wider lines trips the TUI width guard and
			// crashes the process.
			if (cachedLines && cachedWidth === width) return cachedLines;

			const lines: string[] = [];
			const add = (text: string) => lines.push(truncateToWidth(text, width));

			add(theme.fg("accent", "─".repeat(width)));
			addWrapped(lines, theme.fg("text", ` ${question}`), width);
			if (context) {
				lines.push("");
				addWrapped(lines, theme.fg("muted", ` ${context}`), width);
			}
			lines.push("");

			for (let i = 0; i < allItems.length; i++) {
				const item = allItems[i];
				const isFocused = i === optionIndex;
				const prefix = isFocused ? theme.fg("accent", "> ") : "  ";

				if (item.isSubmit) {
					const label = selected.size > 0 ? `✓ ${item.label} (${selected.size} selected)` : `○ ${item.label}`;
					const styled = isFocused
						? theme.fg("accent", label)
						: theme.fg(selected.size > 0 ? "success" : "dim", label);
					add(`${prefix}${styled}`);
					continue;
				}

				if (item.isOther) {
					const other = selected.get("other");
					const marker = other ? "[x]" : "[ ]";
					const suffix = other ? ` — ${other.label}` : "";
					const styled = isFocused
						? theme.fg("accent", `${marker} ${item.label}${suffix}`)
						: theme.fg(other ? "success" : "text", `${marker} ${item.label}${suffix}`);
					add(`${prefix}${styled}`);
					continue;
				}

				const checked = selected.has(item.id);
				const marker = checked ? "[x]" : "[ ]";
				const label = `${marker} ${item.index}. ${item.label}`;
				const styled = isFocused
					? theme.fg("accent", label)
					: theme.fg(checked ? "success" : "text", label);
				add(`${prefix}${styled}`);
				if (item.description) {
					addWrapped(lines, theme.fg("muted", item.description), width, "     ");
				}
			}

			if (editMode) {
				lines.push("");
				add(theme.fg("muted", " Write your custom answer:"));
				for (const line of editor.render(Math.max(1, width - 2))) {
					add(` ${line}`);
				}
				lines.push("");
				add(theme.fg("dim", " Enter to save • Esc to go back"));
			} else {
				lines.push("");
				if (selected.size === 0) {
					add(theme.fg("warning", " Select at least one answer before submitting."));
				}
				add(theme.fg("dim", " ↑↓ navigate • Space toggle • Enter edit/submit • Esc cancel"));
			}

			add(theme.fg("accent", "─".repeat(width)));
			cachedLines = lines;
			cachedWidth = width;
			return lines;
		}

		return {
			render,
			invalidate: () => {
				cachedLines = undefined;
			},
			handleInput,
		};
	});
}

// ── Multi-question tabbed UI ─────────────────────────────────────────

interface StoredAskAnswer {
	value: string;
	label: string;
	wasCustom: boolean;
	index?: number;
}

function buildQuestionsResult(
	status: AskUserQuestionStatus,
	questions: ResolvedAskQuestion[],
	answers: Map<string, AskAnswer[]>,
	message?: string,
) {
	const questionResults = questions.map((q) => ({
		id: q.id,
		label: q.label,
		question: q.question,
		context: q.context,
		mode: q.mode,
		answers: answers.get(q.id) ?? [],
	}));
	const flat = questionResults.flatMap((q) => q.answers);
	const text = questionResults
		.map((q) => {
			if (q.answers.length === 0) return `${q.label}: —`;
			return `${q.label}: ${q.answers.map(formatAnswerForModel).join("; ")}`;
		})
		.join("\n");
	return {
		content: [{ type: "text" as const, text }],
		details: {
			status,
			question: questions.map((q) => q.label).join(", "),
			mode: "questions",
			answers: flat,
			questions: questionResults,
			...(message ? { message } : {}),
		} as AskUserQuestionResultDetails,
	};
}

function cancelledQuestionsResult(questions: ResolvedAskQuestion[]) {
	const message = "User cancelled the questions";
	const empty = new Map<string, AskAnswer[]>();
	return {
		content: [{ type: "text" as const, text: message }],
		details: buildQuestionsResult("cancelled", questions, empty, message).details,
	};
}

function unavailableQuestionsResult(questions: ResolvedAskQuestion[], message: string) {
	const empty = new Map<string, AskAnswer[]>();
	return {
		content: [{ type: "text" as const, text: message }],
		details: buildQuestionsResult("unavailable", questions, empty, message).details,
	};
}

async function runAskQuestionsUI(
	ctx: any,
	questions: ResolvedAskQuestion[],
): Promise<{ cancelled: boolean; answers: Map<string, AskAnswer[]> }> {
	const totalTabs = questions.length + 1; // + Submit

	return ctx.ui.custom((tui: any, theme: any, _kb: any, done: (result: { cancelled: boolean; answers: Map<string, AskAnswer[]> }) => void) => {
		let currentTab = 0;
		let optionIndex = 0;
		let editMode = false;
		let editQuestionId: string | null = null;
		let cachedLines: string[] | undefined;
		let cachedWidth = -1;
		const answers = new Map<string, AskAnswer[]>();
		const editor = new Editor(tui, createEditorTheme(theme));

		function refresh() {
			cachedLines = undefined;
			tui.requestRender();
		}

		function currentQuestion(): ResolvedAskQuestion | null {
			return currentTab < questions.length ? questions[currentTab] : null;
		}

		function isAnswered(q: ResolvedAskQuestion): boolean {
			const list = answers.get(q.id);
			return !!list && list.length > 0;
		}

		function allAnswered(): boolean {
			return questions.every(isAnswered);
		}

		function bodyOptions(q: ResolvedAskQuestion): Array<AskOption & { isOther: boolean }> {
			const opts: Array<AskOption & { isOther: boolean }> = q.options.map((o) => ({ ...o, isOther: false }));
			if (q.mode !== "text") {
				opts.push({ label: getOtherLabel(q.options), value: "__other__", isOther: true });
			}
			return opts;
		}

		function store(q: ResolvedAskQuestion, list: StoredAskAnswer[]) {
			answers.set(q.id, list.map((a) => ({
				type: a.wasCustom ? "other" : "option",
				label: a.label,
				value: a.value,
				...(a.wasCustom ? {} : { index: a.index }),
			} as AskAnswer)));
		}

		function startEdit(q: ResolvedAskQuestion) {
			editMode = true;
			editQuestionId = q.id;
			editor.setText("");
			refresh();
		}

		function stopEdit() {
			editMode = false;
			editQuestionId = null;
			editor.setText("");
			refresh();
		}

		function goTab(index: number) {
			currentTab = ((index % totalTabs) + totalTabs) % totalTabs;
			optionIndex = 0;
			const q = currentQuestion();
			if (q && q.mode === "text" && !isAnswered(q)) {
				editMode = true;
				editQuestionId = q.id;
				editor.setText("");
			} else {
				editMode = false;
				editQuestionId = null;
			}
			refresh();
		}

		function advanceAfterAnswer() {
			if (currentTab < questions.length - 1) goTab(currentTab + 1);
			else goTab(questions.length);
		}

		function toggleMulti(q: ResolvedAskQuestion, opt: AskOption) {
			const current = answers.get(q.id) ?? [];
			const existing = current.findIndex((a) => !(a as any).wasCustom && a.value === opt.value);
			const mapped = current.map((a) => ({
				value: a.value,
				label: a.label,
				wasCustom: (a as any).wasCustom === true,
				...(a.type === "option" ? { index: a.index } : {}),
			}));
			if (existing >= 0) {
				store(q, mapped.filter((a) => a.value !== opt.value));
			} else {
				const optIndex = q.options.findIndex((o) => o.value === opt.value);
				store(q, [...mapped, {
					value: opt.value,
					label: opt.label,
					wasCustom: false,
					index: optIndex + 1,
				}]);
			}
			refresh();
		}

		editor.onSubmit = (value) => {
			if (!editQuestionId) return;
			const q = questions.find((item) => item.id === editQuestionId);
			if (!q) return;
			const trimmed = value.trim() || "(no response)";
			if (q.mode === "multi-select") {
				const current = answers.get(q.id) ?? [];
				const mapped = current.map((a) => ({
					value: a.value,
					label: a.label,
					wasCustom: (a as any).wasCustom === true,
					...(a.type === "option" ? { index: a.index } : {}),
				}));
				store(q, [...mapped, { value: trimmed, label: trimmed, wasCustom: true }]);
			} else {
				store(q, [{ value: trimmed, label: trimmed, wasCustom: true }]);
			}
			editMode = false;
			editQuestionId = null;
			editor.setText("");
			advanceAfterAnswer();
		};

		// Open the editor immediately when the first tab is a freeform question,
		// so the input is visible without pressing Enter first.
		const firstQuestion = questions[0];
		if (firstQuestion && firstQuestion.mode === "text") {
			editMode = true;
			editQuestionId = firstQuestion.id;
		}

		function handleInput(data: string) {
			if (editMode) {
				if (matchesKey(data, Key.escape)) {
					stopEdit();
					return;
				}
				editor.handleInput(data);
				refresh();
				return;
			}

			if (questions.length > 1) {
				if (matchesKey(data, Key.tab) || matchesKey(data, Key.right)) {
					goTab(currentTab + 1);
					return;
				}
				if (matchesKey(data, Key.shift("tab")) || matchesKey(data, Key.left)) {
					goTab(currentTab - 1);
					return;
				}
			}

			if (currentTab === questions.length) {
				if (matchesKey(data, Key.enter) && allAnswered()) {
					done({ cancelled: false, answers });
				} else if (matchesKey(data, Key.escape)) {
					done({ cancelled: true, answers });
				}
				return;
			}

			const q = currentQuestion();
			if (!q) return;
			const opts = bodyOptions(q);

			if (matchesKey(data, Key.up)) {
				optionIndex = Math.max(0, optionIndex - 1);
				refresh();
				return;
			}
			if (matchesKey(data, Key.down)) {
				optionIndex = Math.min(opts.length - 1, optionIndex + 1);
				refresh();
				return;
			}

			if (q.mode === "text") {
				if (matchesKey(data, Key.enter)) startEdit(q);
				else if (matchesKey(data, Key.escape)) done({ cancelled: true, answers });
				return;
			}

			if (matchesKey(data, Key.space) && q.mode === "multi-select") {
				const opt = opts[optionIndex];
				if (opt && !opt.isOther) toggleMulti(q, opt);
				return;
			}

			if (matchesKey(data, Key.enter)) {
				const opt = opts[optionIndex];
				if (!opt) return;
				if (opt.isOther) {
					startEdit(q);
					return;
				}
				if (q.mode === "multi-select") {
					toggleMulti(q, opt);
					advanceAfterAnswer();
				} else {
					const optionIndexInList = q.options.findIndex((o) => o.value === opt.value);
					store(q, [{ value: opt.value, label: opt.label, wasCustom: false, index: optionIndexInList + 1 }]);
					advanceAfterAnswer();
				}
				return;
			}

			if (matchesKey(data, Key.escape)) done({ cancelled: true, answers });
		}

		function render(width: number): string[] {
			const rw = Math.max(1, width);
			if (cachedLines && cachedWidth === rw) return cachedLines;
			const lines: string[] = [];
			const add = (t: string) => lines.push(truncateToWidth(t, rw));

			lines.push(theme.fg("accent", "─".repeat(rw)));

			// Header: ← Q1 ● Q2 ✓ Submit →
			if (questions.length > 1) {
				const tabs: string[] = ["← "];
				for (let i = 0; i < questions.length; i++) {
					const active = i === currentTab;
					const answered = isAnswered(questions[i]);
					const box = answered ? "●" : "○";
					const color = answered ? "success" : "muted";
					const text = ` ${box} ${questions[i].label} `;
					tabs.push(`${active ? theme.bg("selectedBg", theme.fg("text", text)) : theme.fg(color, text)} `);
				}
				const canSubmit = allAnswered();
				const submitActive = currentTab === questions.length;
				const submitText = " ✓ Submit ";
				tabs.push(submitActive
					? theme.bg("selectedBg", theme.fg("text", submitText))
					: theme.fg(canSubmit ? "success" : "dim", submitText));
				tabs.push(" →");
				addWrapped(lines, tabs.join(""), rw, " ");
				lines.push("");
			}

			if (currentTab === questions.length) {
				addWrapped(lines, theme.fg("accent", theme.bold("Ready to submit")), rw, " ");
				lines.push("");
				for (const q of questions) {
					const list = answers.get(q.id) ?? [];
					if (list.length > 0) {
						addWrapped(lines, `${theme.fg("muted", `${q.label}: `)}${theme.fg("text", list.map(formatAnswerForModel).join("; "))}`, rw, " ");
					} else {
						addWrapped(lines, `${theme.fg("muted", `${q.label}: `)}${theme.fg("warning", "—")}`, rw, " ");
					}
				}
				lines.push("");
				addWrapped(lines, allAnswered()
					? theme.fg("success", "Enter to submit")
					: theme.fg("warning", "Unanswered questions"), rw, " ");
			} else {
				const q = currentQuestion()!;
				addWrapped(lines, theme.fg("text", q.question), rw, " ");
				if (q.context) {
					lines.push("");
					addWrapped(lines, theme.fg("muted", q.context), rw, " ");
				}
				lines.push("");

				if (editMode && editQuestionId === q.id) {
					addWrapped(lines, theme.fg("muted", "Write your custom answer:"), rw, " ");
					for (const line of editor.render(Math.max(1, rw - 2))) add(` ${line}`);
					lines.push("");
					addWrapped(lines, theme.fg("dim", "Enter to submit • Esc to go back"), rw, " ");
				} else if (q.mode === "text") {
					addWrapped(lines, theme.fg("dim", "Press Enter to type your answer"), rw, " ");
				} else {
					const opts = bodyOptions(q);
					const selected = answers.get(q.id) ?? [];
					for (let i = 0; i < opts.length; i++) {
						const opt = opts[i];
						const isFocused = i === optionIndex;
						const prefix = isFocused ? theme.fg("accent", "> ") : "  ";
						const isSelected = selected.some((a) => a.value === opt.value);
						let label = `${i + 1}. ${opt.label}`;
						if (opt.isOther) label = opt.label + " ✎";
						if (q.mode === "multi-select") label = `${isSelected ? "[x]" : "[ ]"} ${label}`;
						const styled = isFocused
							? theme.fg("accent", label)
							: theme.fg(isSelected ? "success" : "text", label);
						add(`${prefix}${styled}`);
						if (opt.description) addWrapped(lines, theme.fg("muted", opt.description), rw, "     ");
					}
				}
			}

			lines.push("");
			if (!editMode) {
				addWrapped(lines, theme.fg("dim", questions.length > 1
					? "Tab/←→ navigate • ↑↓ select • Enter confirm • Esc cancel"
					: "↑↓ navigate • Enter select • Esc cancel"), rw, " ");
			}
			lines.push(theme.fg("accent", "─".repeat(rw)));

			cachedLines = lines;
			cachedWidth = rw;
			return lines;
		}

		return {
			render,
			invalidate: () => {
				cachedLines = undefined;
			},
			handleInput,
		};
	});
}

// Shared UI mutex. ctx.ui.custom()/editor can only handle one active call at
// a time, so ALL pop-up-style tools (ask_user_question, quiz, ...) must
// serialize against each other, not just against themselves. We stash one
// mutex on globalThis so separate extension files can share it without
// importing each other.
const SHARED_UI_LOCK_KEY = "__piSharedUiLock";
function getSharedUiLock() {
	const g = globalThis as any;
	if (!g[SHARED_UI_LOCK_KEY]) {
		let chain: Promise<void> = Promise.resolve();
		g[SHARED_UI_LOCK_KEY] = {
			withLock<T>(fn: () => T | Promise<T>): Promise<T> {
				const prev = chain;
				let release: () => void;
				chain = new Promise<void>((r) => { release = r; });
				return prev.then(fn).finally(() => release!());
			},
		};
	}
	return g[SHARED_UI_LOCK_KEY] as { withLock<T>(fn: () => T | Promise<T>): Promise<T> };
}
const sharedUiLock = getSharedUiLock();

function withUILock<T>(fn: () => Promise<T>): Promise<T> {
	return sharedUiLock.withLock(fn);
}

/**
 * Ask the human one or more questions using the main session's tabbed UI.
 * Reuses the same resolve/run path as the ask_user_question tool, so batched
 * subagent questions show as a header with tabs and per-question options.
 */
export interface RelayQuestionInput {
	question: string;
	details?: string;
	options?: AskOption[];
	multiSelect?: boolean;
	label?: string;
	id?: string;
}

export async function askUserQuestionsDirect(
	ctx: any,
	inputs: RelayQuestionInput[],
): Promise<{ cancelled: boolean; questions: ResolvedAskQuestion[]; answers: Map<string, AskAnswer[]> }> {
	const questions = resolveAskQuestions({ questions: inputs });
	if (!ctx?.hasUI) return { cancelled: true, questions, answers: new Map() };
	const result = await withUILock(() => runAskQuestionsUI(ctx, questions));
	return { cancelled: result.cancelled, questions, answers: result.answers };
}

/** One line per question: `Q1: <answer list>` — used to ship replies back to the child. */
export function buildRelayAnswerText(
	questions: ResolvedAskQuestion[],
	answers: Map<string, AskAnswer[]>,
): string {
	return questions
		.map((q) => {
			const list = answers.get(q.id) ?? [];
			if (list.length === 0) return `${q.label}: —`;
			return `${q.label}: ${list.map(formatAnswerForModel).join("; ")}`;
		})
		.join("\n");
}

export default function askUserQuestion(pi: ExtensionAPI) {
	pi.registerTool({
		name: "ask_user_question",
		label: "ask_user_question",
		description:
			"Ask the user one or more questions and pause execution until they answer. Pass `questions: [...]` to ask several at once (tabbed window, Tab/←→ to move). Use when requirements are ambiguous, user preferences are needed, a decision would materially affect implementation, or you need confirmation before proceeding.",
		promptSnippet:
			"Use this tool to ask one clarifying, missing-requirement, preference, or decision question (or several via `questions: [...]`) before continuing.",
		promptGuidelines: [
			"Ask one question per entry; use `questions` for several at once instead of bundling unrelated questions into one prompt.",
			"If you need answers to multiple questions, pass them as separate entries in `questions` (each with its own options/multiSelect).",
			'Users will always be able to select "Other" to provide custom text input when options are provided.',
			"Use multiSelect: true only when you need multiple answers to the same question.",
			'If you recommend a specific option, make it the first option in the list and add "(Recommended)" at the end of the label.',
			"Prefer this tool over guessing when requirements, preferences, or implementation choices are unclear.",
			"Use this tool when multiple valid implementation paths exist and the preferred path depends on user choice.",
		],
		parameters: AskUserQuestionParams,

		async execute(_toolCallId, params, signal, _onUpdate, ctx) {
			const questions = resolveAskQuestions(params);
			const first = questions[0] ?? {
				id: "q1",
				label: "Q1",
				question: "",
				mode: "text" as const,
				options: [],
			};

			if (signal?.aborted) {
				return questions.length > 1
					? cancelledQuestionsResult(questions)
					: cancelledResult(first.question, first.mode, first.context);
			}

			if (!ctx.hasUI) {
				return questions.length > 1
					? unavailableQuestionsResult(questions, "ask_user_question requires interactive mode UI")
					: unavailableResult(first.question, first.mode, "ask_user_question requires interactive mode UI", first.context);
			}

			return withUILock(async () => {
				if (questions.length > 1) {
					const result = await runAskQuestionsUI(ctx, questions);
					if (result.cancelled) return cancelledQuestionsResult(questions);
					return buildQuestionsResult("answered", questions, result.answers);
				}

				const { question, context, mode, options } = first;
				if (mode === "text") {
					const editorTitle = context ? `${question}\n\n${context}` : question;
					const answer = await ctx.ui.editor(editorTitle);
					if (answer === undefined) {
						return cancelledResult(question, mode, context);
					}
					return buildResult(question, context, mode, [
						{ type: "text", label: answer.trim(), value: answer.trim() },
					]);
				}

				if (mode === "single-select") {
					const answer = await askSingleChoice(ctx, question, context, options);
					if (!answer) {
						return cancelledResult(question, mode, context);
					}
					return buildResult(question, context, mode, [answer]);
				}

				const answers = await askMultiChoice(ctx, question, context, options);
				if (!answers) {
					return cancelledResult(question, mode, context);
				}
				return buildResult(question, context, mode, answers);
			});
		},

		renderCall(args, theme) {
			const multi = Array.isArray(args.questions) && args.questions.length > 0;
			if (multi) {
				const labels = (args.questions as any[]).map((q: any, i: number) => q.label?.trim() || `Q${i + 1}`).join(", ");
				let text = theme.fg("toolTitle", theme.bold("ask_user_question ")) +
					theme.fg("muted", `${(args.questions as any[]).length} questions`);
				if (labels) text += `\n${theme.fg("dim", `  ${labels}`)}`;
				return new Text(text, 0, 0);
			}

			const options = normalizeOptions(args.options as Array<{ label: string; value?: string; description?: string }> | undefined);
			let text = theme.fg("toolTitle", theme.bold("ask_user_question ")) + theme.fg("muted", String(args.question ?? ""));
			if (args.multiSelect) {
				text += theme.fg("dim", " [multi-select]");
			}
			if (options.length > 0) {
				const labels = [...options.map((option) => option.label), getOtherLabel(options)].join(", ");
				text += `\n${theme.fg("dim", `  Options: ${labels}`)}`;
			}
			return new Text(text, 0, 0);
		},

		renderResult(result, _options, theme) {
			const details = result.details as AskUserQuestionResultDetails | undefined;
			if (!details) {
				const first = result.content[0];
				return new Text(first?.type === "text" ? first.text : "", 0, 0);
			}

			if (details.status === "cancelled") {
				return new Text(theme.fg("warning", details.message || "Cancelled"), 0, 0);
			}

			if (details.status === "unavailable") {
				return new Text(theme.fg("warning", details.message || "ask_user_question unavailable"), 0, 0);
			}

			if (Array.isArray(details.questions) && details.questions.length > 0) {
				const lines: string[] = [];
				for (const q of details.questions as Array<{ label: string; answers: AskAnswer[] }>) {
					const entries = (q.answers || []).map((answer) => {
						switch (answer.type) {
							case "text":
								return `${theme.fg("success", "✓ ")}${theme.fg("accent", answer.label || "(empty response)")}`;
							case "other":
								return `${theme.fg("success", "✓ ")}${theme.fg("muted", "Other: ")}${theme.fg("accent", answer.label)}`;
							case "option":
								return `${theme.fg("success", "✓ ")}${theme.fg("accent", `${answer.index}. ${answer.label}`)}`;
						}
					});
					if (entries.length > 0) {
						lines.push(`${theme.fg("accent", q.label)} ${entries.join(", ")}`);
					}
				}
				return new Text(lines.join("\n"), 0, 0);
			}

			const lines = details.answers.map((answer) => {
				switch (answer.type) {
					case "text":
						return `${theme.fg("success", "✓ ")}${theme.fg("accent", answer.label || "(empty response)")}`;
					case "other":
						return `${theme.fg("success", "✓ ")}${theme.fg("muted", "Other: ")}${theme.fg("accent", answer.label)}`;
					case "option":
						return `${theme.fg("success", "✓ ")}${theme.fg("accent", `${answer.index}. ${answer.label}`)}`;
				}
			});
			return new Text(lines.join("\n"), 0, 0);
		},
	});
}
