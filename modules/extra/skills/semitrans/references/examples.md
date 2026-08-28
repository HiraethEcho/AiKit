# semitrans examples — review draft
# format: EN source → Lite / Default / Full
# edit any tier column, adjust abbreviation scale, dictionary coverage, or level granularity.
# ──────────────────────────────────────────────

## Reference: abbrev.md (top entries)
# Format: English term: candidate1 | candidate2
# atomic entries only, no compound
smooth: sm
projective: proj
variety: var
varieties: vars
divisor: div
nef: nef
pseudo-effective: peff
minimal model program: MMP
good minimal model: GMM
weak log canonical model: WLCM
log canonical model: LCM
ample model: AM
birational map: bir map
log discrepancy: log discrep
singularity: sing
lemma: lem
normal variety: norm var
numerical equivalence: num equiv
effective: eff
effective divisor: eff div
base-point-free: BPF
Q-factorial: Q-fac
contraction: cont

## Reference: dictionary.md (selected entries)
# Format: english_term: 中文术语
geometry:
  projective_variety: 射影簇
  smooth_projective_variety: 光滑射影簇
  birational_map: 双有理映射
  birational_morphism: 双有理态射
  normal_variety: 正规簇
  projective_morphism: 射影态射
divisor:
  ample_divisor: 丰沛除子
  nef_divisor: nef 除子
  boundary_divisor: 边界除子
  Cartier_divisor: Cartier 除子
  effectivedivisor: 有效除子
mm:
  minimal_model_program: 极小模型纲领
  minimal_model: 极小模型
  flip: flip（保留）
  flop: flop（保留）
  Mori_fiber_space: Mori 纤空间
  divisorial_contraction: 除子收缩
  flipping_contraction: flip 收缩
singularity:
  terminal: 终端
  canonical: 典范
  klt: klt
  dlt: dlt
  log_canonical: log canonical
  glc: glc
generalized:
  g_pair: 广义对
  generalized_pair: 广义对
  foliated_triple: 叶层化三元组
sheaf:
  canonical_sheaf: 典范层
  canonical_bundle: 典范丛
  line_bundle: 线丛

## Passage A — Flop / minimal models

EN source:
Let $X$ be a smooth projective variety with a pseudo-effective canonical divisor $K_X$. The minimal model program predicts that after a $K_X$-MMP, i.e., a sequence of $K_X$-divisorial contractions and flips, one obtains a minimal model $X_{\min}$ of $X$, such that $X_{\min}$ has $\mathbb{Q}$-factorial terminal singularities and $K_{X_{\min}}$ is nef.

Lite: 设 $X$ 为具有 peff can div $K_X$ 的 sm proj var。MMP 予言：经 $K_X$-MMP（即一列 $K_X$-div cont 与 flip）后得到 $X$ 的 min model $X_{\min}$，此时 $X_{\min}$ 具 $\mathbb{Q}$-fac term sings 且 $K_{X_{\min}}$ 为 nef。

Default: 设 $X$ 为具有 pseudo-effective canonical divisor $K_X$ 的 smooth projective variety。minimal model program 予言：经一列 $K_X$-MMP（即一系列 $K_X$-divisorial contractions 与 flips）后，得到 $X$ 的 minimal model $X_{\min}$，此时 $X_{\min}$ 具 $\mathbb{Q}$-factorial terminal singularities 且 $K_{X_{\min}}$ 为 nef。

Full: 设 $X$ 为具有伪有效典范除子 $K_X$ 的光滑射影簇。极小模型程序予言：经一列关于 $K_X$ 的极小模型程序——即一列 $K_X$-除子收缩与 flip——可得 $X$ 的一个极小模型 $X_{\min}$；此时 $X_{\min}$ 具 $\mathbb{Q}$-因子终审奇点，且典范除子 $K_{X_{\min}}$ 为 nef。

---

## Passage B — Existence of flip

EN source:
A flip $X \dashrightarrow X^+$ is a small birational map of $\mathbb{Q}$-factorial varieties, projective over a variety $W$ such that $\rho(X/W) = \rho(X^+/W) = 1$ and both $-(K_X+B)$ and $K_{X^+}+B^+$ are ample over $W$ where $B^+$ is the strict transform of $B$. As a consequence of the negativity lemma, flips improve certain singularity invariants known as log discrepancies.

Lite: flip $X \dashrightarrow X^+$ 是 $\mathbb{Q}$-fac vars 间的 sm bir map，在 proj var $W$ 上 projective，满足 $\rho(X/W) = \rho(X^+/W) = 1$，且 $-(K_X+B)$ 与 $K_{X^+}+B^+$ 均在 $W$ 上为 ample，其中 $B^+$ 是 $B$ 的 strict trans。neg lem 的直接结果是 flip 改善某些 sing inv，即 log discrep。

Default: 所谓 flip $X \dashrightarrow X^+$，是指 variety $W$ 上的 projective $\mathbb{Q}$-factorial variety 间的 small birational map，满足 $\rho(X/W) = \rho(X^+/W) = 1$，且 $-(K_X+B)$ 与 $K_{X^+}+B^+$ 均在 $W$ 上为 ample 的，其中 $B^+$ 表示 $B$ 的 strict transform。negativity lemma 的一个直接结果是 flip 改善某些 singularity invariants，称为 log discrepancies。

Full: 所谓 flip $X \dashrightarrow X^+$，是指 $\mathbb{Q}$-因子簇间在底簇 $W$ 上的射影小双有理映射，满足 $\rho(X/W) = \rho(X^+/W) = 1$，且 $-(K_X+B)$ 与 $K_{X^+}+B^+$ 均在 $W$ 上丰沛；式中 $B^+$ 是 $B$ 的严格变换。Negativity lemma 说明，flip 能够改善一类奇点不变量，即所谓对数差异。

---

## Passage C — Generalized foliated quadruple

EN source:
Generalized foliated quadruples can be considered as a mixture of foliated triples and generalized pairs. It is clear that when $M = 0$ is the trivial b-divisor, a generalized foliated quadruple is just a foliated triple $(X, \mathcal{F}, B)/U$; on the other hand, when $\mathcal{F} = T_X$, a generalized foliated quadruple is a generalized pair $(X, B, M)/U$.

Lite: gfq 可视作 fol triples 与 g-pair 的混合。当 $M = 0$ 为平凡 b-div 时，gfq 即为 fol triple $(X, \mathcal{F}, B)/U$；当 $\mathcal{F} = T_X$ 时化为 g-pair $(X, B, M)/U$。

Default: generalized foliated quadruple 可视作 foliated triple 与 generalized pair 的混合。当 $M = 0$ 是 trivial b-divisor 时，generalized foliated quadruple 即为 foliated triple $(X, \mathcal{F}, B)/U$；当进一步设 $\mathcal{F} = T_X$ 时，它退化为 generalized pair $(X, B, M)/U$。

Full: 广义叶化四元组实质上是叶化三元组与广义对的混合。显见，若 $M = 0$ 为平凡 b-除子，该结构即化为叶化三元组 $(X, \mathcal{F}, B)/U$；若进一步有 $\mathcal{F} = T_X$，又退回到广义对 $(X, B, M)/U$ 的特例。

---

## Passage D — g-pair motivation

EN source:
The theory of generalized pairs (g-pairs for short) is a central topic in modern birational geometry. Introduced by Birkar and Zhang in the study of effective Iitaka fibrations, this theory is known to be useful in many aspects of birational geometry, such as the proof of the Borisov-Alexeev-Borisov conjecture, the theory of complements, the connectedness principles, non-vanishing theorems, etc.

Lite: g-pairs 理论是现代 bir geom 的核心课题。Birkar 与 Zhang 在研究有效 Iitaka fibrations 时引入此理论，其在 bir geom 的用途广，如 Borisov-Alexeev-Borisov 猜想证明、complements 理论、connectedness principles、non-vanishing theorems 等。

Default: generalized pairs (g-pairs) 理论是现代 birational geometry 的核心课题。Birkar 与 Zhang 在研究 effective Iitaka fibrations 时引入此理论，其在 birational geometry 的多方面都有重要应用，如 Borisov-Alexeev-Borisov 猜想证明、complements 理论、connectedness principles、non-vanishing theorems 等。

Full: 广义对 (g-pairs) 理论堪称现代双有理几何的核心课题。Birkar 与 Zhang 最早在研究有效 Iitaka 纤维化时引入此理论；随后发展发现其在双有理几何的诸多方面均有重要应用，例如 Borisov-Alexeev-Borisov 猜想的证明、补元理论、连通性原理，以及非消失定理等。

---

## Passage G — MMP for foliations

EN source:
Let $(X,\mathcal{F},B)$ be a $\mathbb{Q}$-factorial projective F-dlt foliated triple such that $\mathcal{F}$ is algebraically integrable. Let $A$ be an ample $\mathbb{R}$-divisor on $X$. Then: the cone theorem, contraction theorem, and the existence of flips hold for $(X,\mathcal{F},B)$. In particular, we can run a $(K_{\mathcal{F}}+B)$-MMP.

Lite: 设 $(X,\mathcal{F},B)$ 为 $\mathbb{Q}$-factorial proj F-dlt fol tri，$\mathcal{F}$ 为 alg int。令 $A$ 为 ampl $\mathbb{R}$-div。则 $(X,\mathcal{F},B)$ 满足 cone thm、cont thm，且存在 flip。特别可执行 $(K_{\mathcal{F}}+B)$-MMP。

Default: 设 $(X,\mathcal{F},B)$ 为 $\mathbb{Q}$-factorial projective F-dlt foliated triple，$\mathcal{F}$ 为 algebraically integrable。令 $A$ 为 ample $\mathbb{R}$-divisor。此时 $(X,\mathcal{F},B)$ 满足 cone theorem、contraction theorem，且存在 flip。特别地，可运行 $(K_{\mathcal{F}}+B)$-MMP。

Full: 设 $(X,\mathcal{F},B)$ 为 $\mathbb{Q}$-因子射影 F-dlt 叶化三元组，$\mathcal{F}$ 为代数可积。令 $A$ 为 $X$ 上的丰沛 $\mathbb{R}$-除子。则 $(X,\mathcal{F},B)$ 满足锥定理、收缩定理及 flip 存在性；特别地，可执行 $(K_{\mathcal{F}}+B)$-极小模型程序。

---

## Passage H — Canonical sheaf and very ample

EN source:
The canonical sheaf $\omega_X$ is ample and base-point-free. Hence the canonical morphism $|K_X| : X \to \mathbb{P}^r$ is defined, where $r = h^0(X,\omega_X)-1 = g-1$. For $n \gg 0$, $\omega_X^{\otimes n}$ is very ample, so we obtain the $n$-canonical embedding $|nK_X| : X \hookrightarrow \mathbb{P}^R$ with $R = (2n-1)(g-1)-1 = l(nK_X)-1$.

Lite: canonical she $\omega_X$ 为 ampl 且 bpfree。于是 can mor $|K_X| : X \to \mathbb{P}^r$ 有定义，其中 $r = h^0(X,\omega_X)-1 = g-1$。对 $n \gg 0$，$\omega_X^{\otimes n}$ 为 v ampl，故得 $n$-can emb $|nK_X| : X \hookrightarrow \mathbb{P}^R$，$R = (2n-1)(g-1)-1 = l(nK_X)-1$。

Default: canonical sheaf $\omega_X$ 为 ample 且 base-point-free。于是 canonical morphism $|K_X| : X \to \mathbb{P}^r$ 有定义，其中 $r = h^0(X,\omega_X)-1 = g-1$。当 $n \gg 0$ 时，$\omega_X^{\otimes n}$ 为 very ample，故得 $n$-canonical embedding $|nK_X| : X \hookrightarrow \mathbb{P}^R$，其中 $R = (2n-1)(g-1)-1 = l(nK_X)-1$。

Full: 典范层 $\omega_X$ 丰沛且无基点，于是典范态射 $|K_X| : X \to \mathbb{P}^r$ 有定义，这里 $r = h^0(X,\omega_X)-1 = g-1$。当 $n \gg 0$ 时，$\omega_X^{\otimes n}$ 为极丰丛，从而得到 $n$-典范嵌入 $|nK_X| : X \hookrightarrow \mathbb{P}^R$，且 $R = (2n-1)(g-1)-1 = l(nK_X)-1$。

---

## Passage J — Main theorem MMP (generalized pairs)

EN source:
Let $(X,B,\Mm)$ be a $\mathbb{Q}$-factorial projective lc generalized pair. Then: the cone theorem, contraction theorem, and the existence of flips hold for $(X,B,\Mm)$. In particular, we can run a $(K_X+B+\Mm_X)$-MMP. If $K_X+B+A+\Mm_X$ is nef for some ample $\mathbb{R}$-divisor $A$, then $K_X+B+A+\Mm_X$ is semi-ample.

Lite: 设 $(X,B,\Mm)$ 为 $\mathbb{Q}$-factorial proj lc g-pair。则 $(X,B,\Mm)$ 满足 cone thm、cont thm，且 flip 存在。特别可运行 $(K_X+B+\Mm_X)$-MMP。若 $K_X+B+A+\Mm_X$ 对某 ampl $\mathbb{R}$-div $A$ 为 nef，则 $K_X+B+A+\Mm_X$ 为 semi-ampl。

Default: 设 $(X,B,\Mm)$ 为 $\mathbb{Q}$-factorial projective lc generalized pair。则 $(X,B,\Mm)$ 满足 cone theorem、contraction theorem 及 flip 存在性；特别地，可运行 $(K_X+B+\Mm_X)$-MMP。若存在 ample $\mathbb{R}$-divisor $A$ 使 $K_X+B+A+\Mm_X$ 为 nef，则 $K_X+B+A+\Mm_X$ 为 semi-ample。

Full: 设 $(X,B,\Mm)$ 为 $\mathbb{Q}$-因子射影 lc 广义对。则 $(X,B,\Mm)$ 满足锥定理、收缩定理及 flip 存在性；特别地，可执行 $(K_X+B+\Mm_X)$-极小模型程序。若存在丰沛 $\mathbb{R}$-除子 $A$ 使 $K_X+B+A+\Mm_X$ 为 nef，则 $K_X+B+A+\Mm_X$ 为半丰沛的。

---

## Annotation for review
# ──────────────────────────────────────────────
# [ ] Lite: abbreviations too aggressive / not aggressive enough? good
# [ ] Default: any term should be translated? any kept too long? good
# [ ] Full: any Chinese term unnatural? any term missing? it is ok
# [ ] Grammar words translated? (设 令 则 亦 乃 故 etc.)
# [ ] LaTeX format correct? ($  $ only, no \()
# [ ] No unicode math symbols?
# [ ] surname+year citations only?
# [ ] No **bold** in output?
# [ ] Tone: learning-oriented, not formal translation
