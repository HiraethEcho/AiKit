# semitrans

分析数学论文、问题时对英文内容做半翻译. 数学术语保留英文原型。
专注领域：基础数学，代数几何方向。

## 通用规则

- LaTeX 仅 `$...$` inline、`$$...$$` display。禁用 `\(...\)`、`\[...\]`
- 无 unicode 数学符号（保持 `.md` ASCII-clean）
- 结构词译中文：定理、引理、命题、定义、证明

## 术语示例
cone theorem
contraction theorem
semi-ample
very ample
ample
projective variety
smooth projective variety
minimal model program
minimal model
divisorial contraction
canonical sheaf
canonical morphism
base-point-free
b-divisor
generalized pair
foliated triple
algebraically integrable
log discrepancy
singularity invariants
birational map
birational geometry
strict transform
effective Iitaka fibration
complement theory
connectedness principle
non-vanishing theorem
non-Q-factorial
small
MMP
flip
flop
nef
klt / dlt / lc / glc
F-dlt
g-pairs
BAB
negativity lemma
Iitaka
$K_X$
$\mathcal{F}$
$B$ / $M$ / $\Mm$
$X_{\min}$
$\mathbb{Q}$-factorial
## 翻译示例
EN: Let $X$ be a smooth projective variety with a pseudo-effective canonical divisor $K_X$. The minimal model program predicts that after a $K_X$-MMP, i.e., a sequence of $K_X$-divisorial contractions and flips, one obtains a minimal model $X_{\min}$ of $X$, such that $X_{\min}$ has $\mathbb{Q}$-factorial terminal singularities and $K_{X_{\min}}$ is nef.
中: 设 $X$ 为具有 pseudo-effective canonical divisor $K_X$ 的 smooth projective variety。minimal model program 予言：经一列 $K_X$-MMP（即一系列 $K_X$-divisorial contractions 与 flips）后，得到 $X$ 的 minimal model $X_{\min}$，此时 $X_{\min}$ 具 $\mathbb{Q}$-factorial terminal singularities 且 $K_{X_{\min}}$ 为 nef。

EN: A flip $X \dashrightarrow X^+$ is a small birational map of $\mathbb{Q}$-factorial varieties, projective over a variety $W$ such that $\rho(X/W) = \rho(X^+/W) = 1$ and both $-(K_X+B)$ and $K_{X^+}+B^+$ are ample over $W$ where $B^+$ is the strict transform of $B$. As a consequence of the negativity lemma, flips improve certain singularity invariants known as log discrepancies.
中: 所谓 flip $X \dashrightarrow X^+$，是指 variety $W$ 上的 projective $\mathbb{Q}$-factorial variety 间的 small birational map，满足 $\rho(X/W) = \rho(X^+/W) = 1$，且 $-(K_X+B)$ 与 $K_{X^+}+B^+$ 均在 $W$ 上为 ample 的，其中 $B^+$ 表示 $B$ 的 strict transform。negativity lemma 的一个直接结果是 flip 改善某些 singularity invariants，称为 log discrepancies。

EN: Generalized foliated quadruples can be considered as a mixture of foliated triples and generalized pairs. It is clear that when $M = 0$ is the trivial b-divisor, a generalized foliated quadruple is just a foliated triple $(X, \mathcal{F}, B)/U$; on the other hand, when $\mathcal{F} = T_X$, a generalized foliated quadruple is a generalized pair $(X, B, M)/U$.
中: generalized foliated quadruple 可视作 foliated triple 与 generalized pair 的混合。当 $M = 0$ 是 trivial b-divisor 时，generalized foliated quadruple 即为 foliated triple $(X, \mathcal{F}, B)/U$；当进一步设 $\mathcal{F} = T_X$ 时，它退化为 generalized pair $(X, B, M)/U$。

EN: The theory of generalized pairs (g-pairs for short) is a central topic in modern birational geometry. Introduced by Birkar and Zhang in the study of effective Iitaka fibrations, this theory is known to be useful in many aspects of birational geometry, such as the proof of the Borisov-Alexeev-Borisov conjecture, the theory of complements, the connectedness principles, non-vanishing theorems, etc.
中: generalized pairs (g-pairs) 理论是现代 birational geometry 的核心课题。Birkar 与 Zhang 在研究 effective Iitaka fibrations 时引入此理论，其在 birational geometry 的多方面都有重要应用，如 Borisov-Alexeev-Borisov 猜想证明、complements 理论、connectedness principles、non-vanishing theorems 等。

EN: Let $(X,\mathcal{F},B)$ be a $\mathbb{Q}$-factorial projective F-dlt foliated triple such that $\mathcal{F}$ is algebraically integrable. Let $A$ be an ample $\mathbb{R}$-divisor on $X$. Then: the cone theorem, contraction theorem, and the existence of flips hold for $(X,\mathcal{F},B)$. In particular, we can run a $(K_{\mathcal{F}}+B)$-MMP.
中: 设 $(X,\mathcal{F},B)$ 为 $\mathbb{Q}$-factorial projective F-dlt foliated triple，$\mathcal{F}$ 为 algebraically integrable。令 $A$ 为 ample $\mathbb{R}$-divisor。此时 $(X,\mathcal{F},B)$ 满足 cone theorem、contraction theorem，且存在 flip。特别地，可运行 $(K_{\mathcal{F}}+B)$-MMP。

EN: The canonical sheaf $\omega_X$ is ample and base-point-free. Hence the canonical morphism $|K_X| : X \to \mathbb{P}^r$ is defined, where $r = h^0(X,\omega_X)-1 = g-1$. For $n \gg 0$, $\omega_X^{\otimes n}$ is very ample, so we obtain the $n$-canonical embedding $|nK_X| : X \hookrightarrow \mathbb{P}^R$ with $R = (2n-1)(g-1)-1 = l(nK_X)-1$.
中: canonical sheaf $\omega_X$ 为 ample 且 base-point-free。于是 canonical morphism $|K_X| : X \to \mathbb{P}^r$ 有定义，其中 $r = h^0(X,\omega_X)-1 = g-1$。当 $n \gg 0$ 时，$\omega_X^{\otimes n}$ 为 very ample，故得 $n$-canonical embedding $|nK_X| : X \hookrightarrow \mathbb{P}^R$，其中 $R = (2n-1)(g-1)-1 = l(nK_X)-1$。

EN: Let $(X,B,\Mm)$ be a $\mathbb{Q}$-factorial projective lc generalized pair. Then: the cone theorem, contraction theorem, and the existence of flips hold for $(X,B,\Mm)$. In particular, we can run a $(K_X+B+\Mm_X)$-MMP. If $K_X+B+A+\Mm_X$ is nef for some ample $\mathbb{R}$-divisor $A$, then $K_X+B+A+\Mm_X$ is semi-ample.
中: 设 $(X,B,\Mm)$ 为 $\mathbb{Q}$-factorial projective lc generalized pair。则 $(X,B,\Mm)$ 满足 cone theorem、contraction theorem 及 flip 存在性；特别地，可运行 $(K_X+B+\Mm_X)$-MMP。若存在 ample $\mathbb{R}$-divisor $A$ 使 $K_X+B+A+\Mm_X$ 为 nef，则 $K_X+B+A+\Mm_X$ 为 semi-ample。
