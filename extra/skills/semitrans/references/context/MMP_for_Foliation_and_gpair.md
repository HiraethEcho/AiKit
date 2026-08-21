model program for algebraically integrable foliations and generalized pairs
Chen, Jingjun Han, Jihao Liu, and Lingyao Xie
[2020]14E30, 37F75
integrable foliations. Generalized pairs. Minimal model program
By systematically introducing and studying the structure of algebraically integrable generalized foliated quadruples, we establish the minimal model program for $ Q$-factorial foliated dlt algebraically integrable foliations and lc generalized pairs by proving their cone theorems, contraction theorems, and the existence of flips. We also provide numerous applications on their birational geometry and resolve a conjecture of Cascini and Spicer.
of Mathematical Sciences, Shanghai Jiao Tong University, 800 Dongchuan RD Shanghai, Minhang District Shanghai 200240, China
@sjtu.edu.cn
Center for Mathematical Sciences, Fudan University, Shanghai, 200438, China
@fudan.edu.cn
of Mathematics, Northwestern University, 2033 Sheridan Road, Evanston, IL 60208, USA
@northwestern.edu
of Mathematics, The University of Utah, Salt Lake City, UT 84112, USA
@math.utah.edu
G. Chen, J. Han, J. Liu, and L. Xie MMP for algebraically integrable foliations and generalized pairs
# Introduction
We work over the field of complex numbers $ C$.
## Main theorems Algebraically integrable foliations and generalized pairs are two structures that play important roles in modern birational geometry, specifically in the minimal model program. For more details on their backgrounds, we refer the reader to Subsections [subsec: mmp aif] and [subsec: mmp gpair]. The primary objective of this paper is to develop the minimal model program for both structures. The main theorems of the paper are as follows:
Let $(X,,B)$ be a $$-factorial projective F-dlt foliated triple such that $$ is algebraically integrable. Let $A$ be an ample $$-divisor on $X$. Then:
- The cone theorem, contraction theorem, and the existence of flips hold for $(X,,B)$. In particular, we can run a $(K_+B)$-MMP.
- If $K_+B+A$ is nef, then $K_+B+A$ is semi-ample[Theorem 1.2]CD23 provided a proof of some special cases of Theorem [thm: main mmp foliation](2) and other results that are similar to some results in this paper. However, the current proofs in [CD23] seem to be incomplete, mainly because of the failure of [Lemma 2.4]CD23 and some gaps of the proof of [Theorem 3.5]CD23. In this paper, we will avoid using any results in [CD23]..
- If $B A 0$, then $(X,,B)$ has a good minimal model or a Mori fiber space.
- If $K_+B+A$ is $$-Cartier, then the canonical ring of $K_+B+A$,
$$R(X,K_+B+A)=_m=0^+^0(X,_X( m(K_+B+A))),$$
is finitely generated.
Let $(X,B,)$ be a $$-factorial projective lc generalized pair. Then:
- The cone theorem, contraction theorem, and the existence of flips hold for $(X,B,)$. In particular, we can run a $(K_X+B+_X)$-MMP.
- If $K_X+B+A+_X$ is nef for some ample $$-divisor $A$, then $K_X+B+A+_X$ is semi-ample.
We refer the reader to Section [sec: statement of main results] for stronger versions of Theorems [thm: main mmp foliation] and [thm: main mmp gpair] and other main results of this paper.
As explained in [CS21, SS22], F-dlt foliated triples play the same role as dlt pairs in the classical minimal model program, making it a natural class of singularities to study in the theory of foliations. Roughly speaking, Theorem [thm: main mmp foliation] is an establishment of the minimal model program for algebraically integrable foliations with ``klt" singularities in any dimension. In fact, when $=T_X$ and $ B=0$, Theorem [thm: main mmp foliation] becomes the classical result of the existence of good minimal models of varieties of general type and the finite generation of the canonical ring [Theorem 1.2]BCHM10. We remark that Theorem [thm: main mmp foliation] does not hold in general without the polarization of the ample $$-divisor $A$ (cf. [Example 5.4]ACSS21).
In parallel, Theorem [thm: main mmp gpair] is a full establishment of the minimal model program for generalized pairs, providing a complete answer to a fundamental question posed by Birkar and Zhang when they first introduced the concept of generalized pairs [Before Lemma 4.4]BZ16 (see [6.1]Bir21 and [3.1, 3.3]HL22 for other variations). Hacon suggested us that Theorem [thm: main mmp gpair] might have essential implications on the cone theorem, contraction theorem, and the existence of flips for K\"ahler varieties in higher dimensions; see Scenario [sce: kahler] for details.
We recall some previous results related to Theorems [thm: main mmp foliation] and [thm: main mmp gpair]:
- [ACSS21] proved the cone theorem part of Theorem [thm: main mmp foliation](1) without the $$-factorial F-dlt condition.
- When $ X=3$, [CS20,CS21] (see also [SS22]) proved Theorem [thm: main mmp foliation](1) when $ X 3$ without the algebraically integrable condition. If we further assume that $=2$, then Theorem [thm: main mmp foliation](3) was implicitly proven in [Proof of Theorem 2.6]SS22.
- When $ X 4$ or assuming the termination of klt flips in dimension $$, [CS23a] proved Theorem [thm: main mmp foliation](1) without the F-dlt condition, but required $(X,B)$ to be klt.
- When $(X,B,)$ satisfies the ``NQC" condition (see Definition [defn: b divisors] for details), [HL21a] proved Theorem [thm: main mmp gpair], and [HL21a,Xie22,CLX23,LX23b] together proved Theorem [thm: main mmp gpair] for NQC generalized pairs without the $$-factorial condition.
## Ideas of the proofs of Theorems [thm: main mmp foliation] and [thm: main mmp gpair] The proofs of Theorems [thm: main mmp foliation] and [thm: main mmp gpair] are crucially relied on a larger framework: the theory of generalized foliated quadruples.
[cf. [Definition 1.2]LLM23]
A generalized foliated quadruple (gfq for short) $(X,,B,)/U$ consists of a normal quasi-projective variety $X$, a foliation $$ on $X$, an $ R$-divisor $B 0$ on $X$, a projective morphism $Xarrow U$, and a nef$/U$ $$-divisor $_X'$ on a high model $X'$ of $X$, such that $K_+B+_X$ is $$-Cartier. Here $_X$ is the image of $_X'$ on $X$.
The notation $$ in Definition [defn: gfq intro] is considered as a $$-divisor on $X$. We refer the reader to Definition [defn: b divisors] for the definition of $$-divisors, and to Definition [defn: gfq] for a more detailed definition of generalized foliated quadruples. It is clear that when $=0$ is the trivial $$-divisor, a generalized foliated quadruple is just a foliated triple $(X,,B)/U$; on the other hand, when $=T_X$, a generalized foliated quadruple is a generalized pair $(X,B,)/U$ ([Definition 1.4]BZ16). Therefore, generalized foliated quadruples can be considered as a mixture of foliated triples and generalized pairs. We refer the reader to Subsection [sec: reason to consider gfq] for a detailed explanation of why this new structure is vital not only for this paper but also for future studies of foliations and generalized pairs.
Under the framework of generalized foliated quadruples, the proofs of Theorems [thm: main mmp foliation] and [thm: main mmp gpair] proceed simultaneously.
The first results to prove are the cone theorems for Theorem [thm: main mmp foliation](1) and Theorem [thm: main mmp gpair](1). As a positive beginning, the cone theorem for projective algebraically integrable foliations is already known [ACSS21]. With some adjustments to the details of the proofs, the same approach used in [ACSS21] also works for algebraically integrable generalized foliated quadruples (Theorem [thm: cone theorem gfq]). In particular, the cone theorem for algebraically integrable generalized foliated quadruples implies the cone theorem for generalized pairs by letting $=T_X$.
Now we move on to prove the rest of Theorem [thm: main mmp foliation](1). We only need to show that each step of a $(K_+B)$-MMP is also a $(K_X+)$-MMP for some lc pair $(X,)$. To do this, we first show that $(X,,B)$ satisfies a property called ``ACSS" and that this property is preserved under each step of the MMP (Lemma [lem: ACSS mmp can run]). The property "ACSS", named in honor of Ambro-Cascini-Shokurov-Spicer, can be viewed as the analogue of the concept of qdlt (cf. [dFKX17]) for algebraically integrable foliations; see Definition [defn: ACSS f-triple] for details. With this, we prove the termination of MMP with scaling for algebraically integrable foliations satisfying the property ``ACSS" and with very exceptional foliated log canonical divisor (Theorem [thm: mmp very exceptional alg int fol]), which implies that F-dlt foliated triples are always ACSS. This implies the rest of Theorem [thm: main mmp foliation](1). Note that the same approach to the proof also works for $$-factorial generalized foliated quadruples with F-dlt singularities.
Our next goal is to establish the rest of Theorem [thm: main mmp gpair]. First, by considering a class of structures larger than the category of generalized pairs (see Lemma [lem: flip reduce special gpair to pair]) and applying some arguments, we can reduce the existence of flips for generalized pairs to the contraction theorem for generalized pairs. The contraction theorem for generalized pairs is an immediate corollary of the base-point-freeness theorem for generalized pairs, so we only need to prove the latter, which is Theorem [thm: main mmp gpair](2).
A crucial observation is that the base-point-freeness theorem for generalized pairs relies only on the subadjunction formula (Theorem [thm: subadj intro]), which in turn, only depends on the fact that the moduli part of the canonical bundle formula for a generalized pair $f: (X,B,)arrow Z$ is nef (Theorem [thm: cbf gpair nonnqc]). A key observation is that the moduli part corresponds to the foliated canonical divisor $K_+B+_X$ (Proposition [prop: weak cbf gfq]), where $$ is the foliation induced by $f$. With this, the canonical bundle formula for generalized pairs follows from the existence of log minimal models for generalized foliated quadruples with numerical dimension zero (Propositions [prop: weak ss num 0 mmp], [prop: projective num 0 mmp]). The latter follows from Theorem [thm: main mmp foliation](1) which we have already established. This concludes the proof of Theorem [thm: main mmp gpair]. It is worth mentioning that some previous literature addresses the canonical bundle formula for generalized pairs. However, these papers only consider generalized pairs with the additional ``NQC" condition (cf. [Fil19,Fil20,JLX22,FS23]) and cannot be applied to our scenario.
Finally, we turn to the proof of Theorem [thm: main mmp foliation](2-4). Although the Bertini-type theorem fails for foliations, by employing the structure of generalized foliated quadruples, we can, roughly speaking, reduce Theorem [thm: main mmp foliation](3) and Theorem [thm: main mmp foliation](4) to Theorem [thm: main mmp foliation](2) (see Lemma [lem: +a keep under mmp] and Theorem [thm: gmm polarized gfq]). The proof of Theorem [thm: main mmp foliation](2) is divided into three steps:
In the first step, we use the already-proven contraction theorem for generalized pairs from Theorem [thm: main mmp foliation](2) to construct a contraction $Xarrow T$, where the general fibers of $Xarrow Z$ are tangent to $$.
In the second step, we apply the canonical bundle formula for generalized foliated quadruples to derive a generalized pair structure polarized with an ample divisor on $T$. This canonical bundle formula (Definition-Theorem [defthm: cbf lctrivial morphism]) can be derived from the canonical bundle formula for lc-trivial fibrations of generalized pairs. The latter can be deduced using our approach via the theory of foliations. It is worth noting that the existing literature on the canonical bundle formula for generalized pairs ([Fil19,Fil20,JLX22,FS23]) cannot handle arbitrary lc-trivial fibrations $f: (X,B,) arrow Z$ as they required that $B 0$ over the generic point of $Z$ or that $$ is $$-semi-ample. Therefore, those works cannot be applied to deduce the canonical bundle formula for generalized foliated quadruples, which is essential for our purposes.
In the last step, we apply the cone theorem for generalized foliated quadruples to show that the generalized foliated log canonical divisor on $T$ is ample. Hence, the foliated log canonical divisor on $X$ is semi-ample, completing the proof of Theorem [thm: main mmp foliation](2). This concludes the proof of Theorem [thm: main mmp foliation].
## Structure of the Paper In Section [sec: statement of main results], we list the main results of this paper and explain the importance of the structure of generalized foliated quadruples. The rest of the paper is divided into four parts. Part [part:prelim] states some preliminary results, Part [part:cone] establishes the cone theorem and the minimal model program for algebraically integrable foliations, Part [part:cbf] establishes the canonical bundle formula and the minimal model program for generalized pairs, and Part [part:gmm] proves the existence of good minimal models.
For the convenience of the reader, we have prepared the following flowchart (Table [tbl: flowchart]) to illustrate the streamlined process involved in the proofs of our main theorems.
[ht]
of the paper
=1,right
$
& *+[F] results on foliations and generalized pairs (Sections [sec: preliminaries], [sec: basic property gpair], [sec: stability gpair], [sec: acss gfq]) &
& *+[F] adjunction formulas for gfqs (Section [sec: adjunction])@->[d]@->[r] & *+[F] and global ACC for gfqs (Section [sec: acc gfq])
& *+[F] theorem for gfqs (Section [sec: cone])@->[d]@->[r]@->[dr]& *+[F] of Mori fiber space for gfqs (Subsection [subsec: eomfs])@->[u]
*+[F] exceptional MMP (Subsection [subsec: very exceptional])@/_8pc/[ddddd] & *+[F] with scaling (Subsection [subsec: eomfs])@->[d]@->[l] & *+[F] [thm: main mmp gpair]
& *+[F]$_=0$ MMP (Subsection [sub: num 0 mmp])@->[d] &
*+[F] of gfqs (Subsection [subsec: stability gfq])@->[r] & *+[F] bundle formula for generalized pairs (Subsection [subsec: cbf gpair])@->[d]@->[dl] &
*+[F] bundle formula for gfqs (Subsection [subsec: cbf gfq], Section [sec: subadj])@/_2pc/[ddr] & *+[F] for generalized pairs (Section [sec: subadj])@->[d] &
& *+[F]-point-freeness and Contraction theorem for generalized pairs (Sections [sec: du bois], [sec: vanishing gpair])@->[r]@/_2pc/[uuuur]@->[d] & *+[F] of flips
for generalized pairs (Section [sec: eof gpair])@->[uuuu]
*+[F]$$-factorial F-dlt $$ACSS (Theorem [thm: fdlt is acss])@->[r] & *+[F] [thm: main mmp foliation]&
& &
$
[part:prelim]. Preliminaries: Sections [sec: preliminaries], [sec: basic property gpair], and [sec: stability gpair]. This part contains preliminary results and definitions that will be utilized throughout the remainder of the paper, with few foliation structures involved. In Section [sec: preliminaries], we introduce some basic definitions, including the concept of generalized foliated quadruples and their singularities. In Section [sec: basic property gpair], we establish basic properties of generalized pairs. Section [sec: stability gpair] is parallel to [Section 2]ACSS21, studying the stability of generalized pairs and introducing the concept of Property $(*)$ for generalized pairs.
[part:cone]. Cone Theorem and the minimal model program for algebraically integrable foliations: Sections [sec: adjunction], [sec: acss gfq], [sec: cone], [sec: mmp gfq], and [sec: acc gfq]. This part focuses on the cone theorem for algebraically integrable generalized foliated quadruples and its applications. In Section [sec: adjunction], we prove a precise adjunction formula for algebraically integrable generalized foliated quadruples. Section [sec: acss gfq] defines ACSS generalized foliated quadruples and studies its fundamental behaviors. Section [sec: cone] proves the cone theorem for algebraically integrable generalized foliated quadruples. In Section [sec: mmp gfq], we prove most results of this paper on the minimal model program for generalized foliated quadruples with $$-factorial F-dlt singularities, excluding the existence of good minimal models. Section [sec: acc gfq] verifies the ACC, the global ACC, and the existence of uniform rational polytopes for algebraically integrable generalized foliated quadruples.
[part:cbf]. Canonical bundle formula and minimal model program for generalized pairs: Sections [sec: cbf], [sec: subadj], [sec: du bois], [sec: vanishing gpair], and [sec: eof gpair]. This part presents the canonical bundle formula and applies it to establish the minimal model program for generalized pairs. In Section [sec: cbf], we state and prove the canonical bundle formula for lc-trivial fibrations of generalized foliated quadruples and, in particular, generalized pairs. Section [sec: subadj] studies lc-trivial morphisms of generalized foliated quadruples and proves the subadjunction formula for generalized pairs. Section [sec: du bois] shows that lc generalized pairs have Du Bois singularities. Section [sec: vanishing gpair] proves the Kodaira vanishing theorem, the Kawamata-Viehweg vanishing theorem, the base-point-freeness theorem, and the contraction theorem for generalized pairs. Section [sec: eof gpair] proves the existence of flips for $$-factorial generalized pairs.
[part:gmm]. Good minimal model, applications, and proofs of the main theorems: Sections [sec: gmm fdlt] and [sec: proof of the main theorems]. In Section [sec: gmm fdlt], we prove the existence of good minimal models for $$-factorial F-dlt generalized foliated quadruples polarized with an ample divisor. Similar arguments imply the base-point-freeness theorem for such quadruples, leading to a special case of the Prokhorov-Shokurov $$-semi-ampleness conjecture. Lastly, in Section [sec: proof of the main theorems], we prove all the main theorems of the paper that are not covered in the previous sections.
. The authors would like to thank Caucher Birkar, Paolo Cascini, Priyankur Chaudhuri, Omprokash Das, Christopher D. Hacon, Chen Jiang, Junpeng Jiao, Jie Liu, Yuchen Liu, Roktim Mascharak, Fanjun Meng, Wenhao Ou, Vyacheslav V. Shokurov, Chenyang Xu, and Qingyuan Xue for fruitful discussions. Part of this work was inspired by discussions that the third author had with Paolo Cascini at the Simons Center at Stony Brook University in May 2023, and at Tsinghua University in August 2023. Portions of this work were completed during visits by the third and fourth authors to Fudan University, and by the last three authors to Tsinghua University in June 2023. The authors extend their gratitude for the warm hospitality received during these visits. The second author is affiliated with LMNS at Fudan University, and has received support from the National Key Research and Development Program of China (Grant No. 2020YFA0713200). The fourth author has been partially supported by NSF research grants no. DMS-1801851 and DMS-1952522, as well as a grant from the Simons Foundation (Award Number: 256202).
# Statement of main results
In this section, we provide the statements of the main results of this paper.
## Minimal model program for algebraically integrable foliations
The theory of foliations holds a significant place in birational geometry. Most notably, it has played a critical role in Miyaoka's proof of several key cases of the abundance conjecture in dimension three [Miy87]. In recent developments, foliations have been used by Bogomolov and McQuillan to analyze projective varieties which admit a non-trivial fibration with rationally connected fibers [BM16]. Furthermore, foliation theory has strong connections with other areas of algebraic geometry, such as the algebraic geometry in characteristic $p>0$ and number theory as highlighted by the Grothendieck-Katz conjecture and the Ekedahl-Shepherd-Barron-Taylor conjecture. Its importance is also highlighted in hyperbolicity theory, where it was essential in McQuillan's proof of a specific case of the Green-Griffiths-Lang conjecture [McQ98].
In recent years, it has been discovered that many structures and results in classical birational geometry can be extended to foliations, especially, within the context of the minimal model program. Instead of examining the structures associated with the canonical divisor of the ambient variety $K_X$, the foliations theory concentrates on the structures connected to the foliated canonical divisor $K_$. This approach offers greater flexibility in practice. Specifically, when $ = T_X$, we find that $K_=K_X$, bringing us back to the classical setting.
The foundational work for the minimal model program for foliations has been established for foliated surfaces (cf. [McQ08,Bru15]) and foliated threefolds (cf. [CS20,Spi20,CS21,SS22]). Moreover, several classic questions from the minimal model programs, such as the ascending chain condition (ACC) conjecture for minimal log discrepancies, the ACC conjecture for lc thresholds, the global ACC, and the index theorems, have been adapted to foliations and verified in dimensions 2 and/or 3, as indicated in [Che22,Che23,LLM23,LMX23a,LMX23b].
Given these developments, it is natural to ask whether the minimal model program for foliations could extend to higher dimensions. Unfortunately, this seems to be a challenging question, with limited information available, even in dimension 4. However, from the perspective of the minimal model program, it seems sufficient to focus on a subset of foliations that have an additional structure: algebraically integrable foliations.
Algebraically integrable foliations are foliations where the general leaves are algebraic varieties; in other words, they are induced by dominant rational maps. These foliations naturally come into play when a fibration structure is established. Notably, Miyaoka's study of the abundance conjecture in dimension $3$ primarily utilized algebraically integrable foliations [Miy87], as opposed to arbitrary ones. This approach has been reflected in recent research into the abundance conjecture for Kähler threefolds [DO23a,DO23b] and threefolds over fields of characteristic $p>3$ with numerical dimension $2$ [Xu23]. In these studies, the algebraic integrability of foliations is guaranteed; indeed, all the foliations addressed in these papers are induced by MRC fibrations, making them automatically algebraically integrable. Given this, algebraically integrable foliations are expected to be crucial in future research of the minimal model program, particularly in questions related to the abundance conjecture.
The first objective of this paper is to develop the minimal model program for algebraically integrable foliations of arbitrary rank with ``mild" singularities in arbitrary dimensions. Here ``mild" singularity is usually referred to as ``F-dlt" (see Definition [defn: fdlt]). As explained in [CS21,SS22], F-dlt foliated triples play the same role as dlt pairs in the classical MMP and is a natural class of singularities to study. Moreover, any terminal foliated singularity is F-dlt.
Recall that a foliated triple $(X,,B)/U$ consists of a normal quasi-projective variety $X$ associated with a projective surjective morphism $Xarrow U$, a foliation $$ on $X$, and an $$-divisor $B 0$ on $X$, such that $K_+B$ is $$-Cartier. The first result of this paper shows that we can run a $(K_+B)$-MMP$/U$ provided that it is $$-factorial F-dlt:
[Minimal model program]
Let $(X,,B)/U$ be a $$-factorial foliated triple. Assume that $$ is algebraically integrable and $(X,,B)$ is F-dlt. Then we may run a $(K_+B)$-MMP$/U$.
We remark that when $ X 3$, Theorem [thm: mmp fdlt] is known when $=2$ ([Corollary 2.3]SS22; [Theorem 1.1]CS21 when $U=\{pt\}$) and when $=1$ and $U=\{pt\}$ ([Theorems 1.1, 2.36, Section 6]CS21), even without the algebraically integrable condition. When assuming the termination of klt flips in dimension $$, [Theorem 1.1]CS23a proves Theorem [thm: mmp fdlt] even without the F-dlt condition, but requires that $(X,B)$ is klt. In particular, when $(X,B)$ is klt and $ X 4$, Theorem [thm: mmp fdlt] can be deduced from [Theorem 1.1]CS23a.
Proceeding further, we demonstrate the termination of MMP with scaling as well as the existence of good minimal models for algebraically integrable foliations polarized with an ample divisor. The polarization of the ample divisor is a natural condition to add, as can be seen in [Theorem 1.2]CS21 and [Theorem 1.3]CS20. It is worth noting that, even within the framework of the classical MMP, the existence of good minimal models in higher dimensions is only known when polarized with an ample divisor ([Theorem C]BCHM10, [Theorem 1.5]HH20), while the general case remains an open conjecture.
[Good minimal model]
Let $(X,,B)/U$ be a $$-factorial foliated triple. Assume that $$ is algebraically integrable, $B A 0$ for some ample$/U$ $$-divisor $A$, and $(X,,B)$ is F-dlt. Then we may run a $(K_+B)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor $H$, and any such MMP terminates
- with a Mori fiber space of $(X,,B)/U$ if $K_+B$ is not pseudo-effective$/U$, and
- with a good minimal model of $(X,,B)/U$ if $K_+B$ is pseudo-effective$/U$.
We also have the following result on the abundance of algebraically integrable foliations polarized with an ample divisor.
[Abundance]
Let $(X,,B)/U$ be a $$-factorial foliated triple and $A$ an ample$/U$ $$-divisor on $X$. Assume that $$ is algebraically integrable and $(X,,B)$ is F-dlt. Then
$$_(X/U,K_+B+A)=_(X/U,K_+B+A).$$
It is important to note that Theorem [thm: +a abundance fdlt] is not a direct consequence of Theorem [thm: +a gmm fdlt]. This is because Bertini type theorems fail for foliations, and it is possible that $(X,,B+H)$ is not lc for any $H |A/U|_ R$ (see [Example 3.4]DLM23).
We also prove a base-point-freeness theorem for algebraically integrable foliations.
[Base-point-freeness]
Let $(X,,B)/U$ be a $$-factorial foliated triple. Assume that $$ is algebraically integrable and $(X,,B)$ is F-dlt. Let $A$ be an ample$/U$ $$-divisor on $X$ such that $K_+B+A$ is nef$/U$. Then:
- $K_+B+A$ is semi-ample$/U$.
- Suppose that there exists a positive integer $m$ such that $m(K_+B+A)$ is Cartier. Then
$$_X(mn(K_+B+A))$$
is globally generated$/U$ for any integer $n 0$.
In the literature, the semi-ampleness of $K_+B+A$ is known when $(X,,B+A)$ is $ Q$-factorial F-dlt, $U=\{pt\}$, and $ X 3$, even without the algebraically integrable condition (see [Theorem 1.3]CS20, [Theorem 1.3]CS21). However, there was no result on the base-point-freeness theorem of foliations in dimensions $ 3$. It is worth mentioning that the base-point-freeness theorem Theorem [thm: bpf fdlt](2) is crucial for us to prove a special case of the Prokhorov-Shokurov's $$-semi-ampleness conjecture later in this paper (Theorem [thm: ps intro]).
An important application of Theorem [thm: +a gmm fdlt] is the existence of Mori fiber spaces for foliated triples, even with, at worst, lc singularities. We note that in this paper, Mori fiber spaces and log minimal models are in the sense of Birkar-Shokurov; that is, we allow the extraction of lc centers. See Definitions [defn: models I] and [defn: models ii] for details.
Let $(X,,B)/U$ be an lc foliated triple. Assume that $$ is algebraically integrable and $K_+B$ is not pseudo-effective$/U$. Then $(X,,B)/U$ has a Mori fiber space.
Another interesting type of foliations is the class of foliations with numerical dimension zero. For example, based on [Theorem 1.4]CS20 and [Theorem 1.7]CS21, [Theorem 1.9]LLM23 has shown the existence of good minimal models for numerical dimension zero foliations in dimension $ 3$. In this paper, we obtain the existence of good minimal models for algebraically integrable foliations with numerical dimension zero:
Let $(X,,B)$ be a projective lc foliated triple. Assume that $$ is algebraically integrable and $_(K_+B)=0$. Then:
- $(X,,B)$ has a good minimal model.
- $_(K_+B)=0$.
- If $(X,,B)$ is $$-factorial dlt, then we may run a $(K_+B)$-MMP with scaling of an ample $$-divisor, and any such MMP terminates with a good minimal model of $(X,,B)$.
Siu [Siu10] has used Eckl’s construction of numerically trivial foliations [Eck04] to sketch a plan to solve the abundance conjecture. One step of Siu's approach, [(4.1)]Siu10, focuses on the abundance conjecture for smooth projective varieties associated with an ``algebraically integrable numerically trivial foliation". Though the concept of ``numerically trivial foliation" in [Siu10], which was defined analytically in [Eck04], seems to differ from the concept of ``foliations whose canonical divisor has numerical dimension zero", these two types of foliations are closely connected. Hence, studying the abundance properties of numerical dimension zero algebraically integrable foliations (potentially with singularities that are worse than lc) on smooth projective varieties becomes intriguing, as it may have implications for the abundance conjecture. With this in mind, we prove the following theorem in this paper:
Let $(X,,B)$ be a projective algebraically integrable f-triple such that $_(K_+B)=0$. Assume that $K_X+B$ is pseudo-effective and $(X,B)$ is lc. Then $_(K_+B)=0$.
Finally, we recall the following conjecture of Cascini and Spicer:
[[Conjecture 4.2]CS23a]
Let $(X,,B)$ be a $$-factorial projective foliated triple, such that $$ is algebraically integrable, $B$ is a $$-divisor, $(X,B)$ is klt, and one of the following cases hold:
- $(X,,B)$ is F-dlt.
- $(X,,B)$ is canonical.
Then there exists a morphism $f: Xarrow Y$ which induces $$.
In this paper, we provide a positive answer to Conjecture [conj: cs23 4.2(1)](1) with weaker assumptions and stronger results:
Let $(X,,B)$ be a $$-factorial foliated triple such that $$ is algebraically integrable and $(X,,B)$ is F-dlt. Then:
- $(X,B)$ is qdlt (cf. Definition [defn: qdlt]). In particular, if $ B=0$, then $(X,B)$ is klt.
- There exists a morphism $f: Xarrow Y$ to a smooth variety which induces $$.
We also prove a weaker form of Conjecture [conj: cs23 4.2(1)](2) without assuming that $(X,B)$ is klt.
Let $(X,,B)$ be a $$-factorial canonical foliated triple such that $$ is algebraically integrable. Then $$ is induced by an almost holomorphic map.
A very recent result [Theorem 1.4]CS23b shows that the algebraic part of a foliation $$ on a projective variety $X$ is induced by an almost holomorphic map, provided that $X$ is $$-factorial klt and $$ is canonical. In particular, [Theorem 1.4]CS23b implies Theorem [thm: canonical almost holomorphic] when $X$ is projective klt and $B=0$.
We would like to mention that the results in this subsection are not expected to work over fields of characteristic $p>0$ due to counterexamples in [Ber23].
## Minimal model program for generalized pairs In the past few years, there has been significant advancement in the minimal model program for NQC generalized pairs. The cone theorem, as well as the $ Q$-factorial cases of the contraction theorem and the proof of the existence of flips, were established in [HL21a]. Later, the existence of flips for (potentially non-$ Q$-factorial) NQC generalized pairs was verified in [LX23a], while the contraction theorem for these pairs was proven in [Xie22]. Additionally, [CLX23] confirmed the Kodaira and the Kawamata-Viehweg vanishing theorems for NQC generalized pairs, offering an alternative proof for the contraction theorem. These developments form the foundation of the minimal model program for NQC generalized pairs, with numerous corollaries and applications already provided in [LT22,TX23].
The structure of NQC generalized pairs has naturally arisen in the study of the canonical bundle formulas, making them a fundamental structure in the study in the minimal model program. For a considerable amount of time, it has been presumed that the realm of NQC generalized pairs would be the most extensive category necessary to establish in the minimal model program. This is because the structure of NQC generalized pairs is maintained under the canonical bundle formula, adjunction formula, and each stage of the minimal model program, thereby eliminating the need to consider the minimal model program for non-NQC generalized pairs or other larger categories.
However, recent studies on the minimal model program for K\"ahler varieties [DH23,DHY23] have emphasized the critical role the structure of non-NQC generalized pairs plays in the minimal model program for K\"ahler varieties. In the case of K\"ahler varieties, the selection of ample divisors is restricted, preventing many procedures, such as the minimal model program with scaling and general hyperplane section cuttings. Nevertheless, the associated K\"ahler class $$ on a K\"ahler variety serves as a substitute for ample divisors. Although $$ cannot be categorized as an $$-divisor, it can be considered as an nef $$-class and is suitable for the nef part of a generalized pair. As explained in [DHY23], it is now possible to formally define ``running MMP with scaling of the nef $$-$(1,1)$-class $$". Given that $$ is only an $$-class and NQC cannot be assured, the study of the structure of non-NQC generalized pairs immediately becomes vital for the minimal model program on K\"ahler vareties.
Although little was known about the minimal model program for non-NQC generalized pairs, we have been able to establish the cone theorem and the contraction theorem for non-NQC generalized pairs, thanks to the cone theorem and the canonical bundle formula for generalized foliated quadruples. With additional effort, we also prove the existence of flips for $$-factorial non-NQC generalized pairs. These results collectively lay the groundwork for the minimal model program for $$-factorial generalized pairs. The detailed theorems are as follows:
[Cone and contraction theorems]
Let $(X,B,)/U$ be a generalized pair and $: Xarrow U$ the associated morphism. Let $\{R_j\}_j$ be the set of $(K_X+B+_X)$-negative extremal rays in $(X/U)$ that are rational. Then:
- $$(X/U)=(X/U)_K_X+B+_X 0+(X/U)_(X,B,)+_j R_j.$$
In particular, any $(K_X+B+_X)$-negative extremal ray in $(X/U)$ is rational.
- Each $R_j$ is spanned by a rational curve $C_j$ such that $(C_j)=\{pt\}$ and
$$0<-(K_X+B+_X) C_j 2 X.$$
- For any ample$/U$ $$-divisor $A$ on $X$,
$$_A:=\{j R_j(X/U)_K_X+B+A+_X<0\}$$
is a finite set. In particular, $\{R_j\}_j$ is countable, and is a discrete subset in $(X/U)_K_X+B+_X<0$. Moreover, we may write
$$(X/U)=(X/U)_K_X+B+A+_X 0+(X/U)_(X,B,)+_j_AR_j.$$
- Let $F$ be a $(K_X+B+_X)$-negative extremal face in $(X/U)$ that relatively ample at infinity (cf. Definition [defn: basics of cone theorem]) with respect to $(X,B,)$. Then $F$ is a rational extremal face, and there exists a contraction$/U$ $_F: Xarrow Z$ of $F$ satisfying the following.
- For any integral curve $C$ on $X$ such that the image of $C$ in $U$ is a closed point, $_F(C)$ is a point if and only if $[C] F$.
- $_Y=(_F)_*_X$. In other words, $_F$ is a contraction.
- For any Cartier divisor $D$ on $Y$ such that $D C=0$ for any curve $C$ contracted by $_F$, there exists a Cartier divisor $D_Y$ on $Y$ such that $D=_F^*D_Y$.
When $$ is NQC$/U$ and $(X,B,)$ is lc, Theorem [thm: cone theorem nonnqc gpair](1-3) was proven in [Theorem 1.3]HL21a and Theorem [thm: cone theorem nonnqc gpair](4) was proven in [Theorem 1.5]Xie22 (see also [Theorem 1.7]CLX23).
[Existence of flips]
Let $(X,B,)/U$ be a $$-factorial lc generalized pair and $f: Xarrow Z$ a $(K_X+B+_X)$-flipping contraction$/U$.
Then the flip $f^+: X^+arrow Z$ of $f$ exists. Moreover, $X^+$ is $$-factorial, and $(X)=(X^+)$.
When $$ is NQC$/U$, Theorem [thm: eof nonnqc] was proven in [Theorem 1.2]HL21a (see also [Theorem 1.2]LX23b). Theorem [thm: cone theorem nonnqc gpair] and Theorem [thm: eof nonnqc] allow us to run the minimal model program for any $$-factorial lc generalized pair:
We may run the minimal model program for $$-factorial lc generalized pairs. More precisely, for any $ Q$-factorial lc generalized pair $(X,B,)/U$, there exists a sequence of $(K_X+B+_X)$-flips and divisorial contractions$/U$. Moreover, any such sequence ends either with a Mori fiber space of $(X,B,)/U$, or a minimal model of $(X,B,)/U$, or an infinite sequence of flips over $U$.
There are several other important results on the structure of generalized lc pairs. The first two are the Kodaira vanishing theorem and the Kawamata-Viehweg vanishing theorem:
[Kodaira vanishing theorem for lc generalized pairs]
Let $(X,B,)$ be a projective lc generalized pair, and let $D$ be a Cartier divisor on $X$ such that $D-(K_X+B+_X)$ is ample. Then $H^i(X,_X(D))=0$ for any positive integer $i$.
[Relative Kawamata-Viehweg vanishing for lc generalized pairs]
Let $(X,B,)/U$ be an lc generalized pair associated with morphism $f: Xarrow U$, and let $D$ be a Cartier divisor on $X$ such that $D-(K_X+B+_X)$ is nef$/U$ and log big$/U$ with respect to $(X,B,)$. Then $R^if_*_X(D)=0$ for any positive integer $i$.
When $$ is NQC$/U$, Theorem [thm: kod vanishing gpair intro] was proven in [Theorem 1.3]CLX23 while Theorem [thm: kv vanishing gpair intro] was proven in [Theorem 1.4]CLX23.
Next, we have the base-point-freeness theorem and the semi-ampleness theorem for lc generalized pairs:
[Base-point-freeness theorem]
Let $(X,B,)/U$ be an lc generalized pair and $D$ a nef$/U$ Cartier divisor on $X$, such that $aD-(K_X+B+_X)$ is ample$/U$ for some positive real number $a$. Then $_X(mD)$ is globally generated over $U$ for any integer $m 0$.
[Semi-ampleness theorem]
Let $(X,B,)/U$ be an lc generalized pair and $D$ a nef$/U$ $ R$-Cartier $$-divisor on $X$, such that $D-(K_X+B+_X)$ is ample$/U$. Then $D$ is semi-ample$/U$.
When $$ is NQC$/U$, Theorem [thm:base-point-freeness intro] was proven in [Theorem 1.4]Xie22, [Theorem 1.5]CLX23 while Theorem [thm: semi-ampleness intro] was proven in [Theorems 1.2]Xie22, [Theorem 1.6]CLX23.
We also prove the canonical bundle formula and the subadjunction formula for generalized pairs. As the canonical bundle formula's statement is very technical and is a special case of Theorem [thm: cbf gfq] below (by setting $=T_X$), we will omit it here and only state the subadjunction formula.
[Subadjunction formula]
Let $(X,B,)/U$ be an lc generalized pair an $V$ an lc center of $(X,B,)$ such that $ V 1$. Let $W$ be the normalization of $V$. Then there exists an lc generalized pair $(W,B_W,^W)/U$ such that
$$K_W+B_W+^W_W_ R(K_X+B+_X)|_W.$$
Moreover, the image of any lc center of $(W,B_W,^W)$ in $X$ is an lc center of $(X,B,)$.
The main part of Theorem [thm: subadj intro] was proven in [Theorem 5.1]HL21b when $$ is NQC$/U$.
Finally, we can show that lc generalized pairs are Du Bois:
Let $(X,B,)$ be an lc generlaized pair. Then any union of lc centers of $(X,B,)$ is Du Bois. In particular, $X$ is Du Bois.
Theorem [thm: glc sings are Du Bois] was proven in [Theorem 1.6]LX23b when $$ is NQC$/X$.
## Generalized foliated quadruples
As explained above, to establish the minimal model program for algebraically integrable foliations and generalized pairs, we need to broaden the category of objects for our study and consider the structure of generalized foliated quadruples $(X,,B,)$, as defined in Definition [defn: gfq intro].
Most of the main theorems of this paper on algebraically integrable foliations can also be extended to the category of algebraically integrable generalized foliated quadruples. Two results related to this structure that are particularly worth mentioning are the cone theorem and the canonical bundle formula. These two results will be essential in other main theorems of the paper, the statements of most of which do not rely on the language of generalized foliated quadruples.
### Cone theorem We establish the cone theorem for algebraically integrable generalized foliated quadruples in full generality.
[Cone theorem for algebraically integrable generalized foliated quadruples]
Let $(X,,B,)/U$ be a generalized foliated quadruple and $: Xarrow U$ the associated morphism. Let $\{R_j\}_j$ be the set of $(K_+B+_X)$-negative extremal rays in $(X/U)$ that are rational. Assume that $$ is algebraically integrable. Then:
- $$(X/U)=(X/U)_K_+B+_X 0+(X/U)_(X,,B,)+_j R_j.$$
Here $(X,,B,)$ is the non-lc locus of $(X,,B,)$ (cf. Definition [defn: gfq singularity]). In particular, any $(K_+B+_X)$-negative extremal ray in $(X/U)$ is rational.
- Each $R_j$ is spanned by a rational curve $C_j$ such that $(C_j)=\{pt\}$, $C_j$ is tangent to $$, and
$$0<-(K_+B+_X) C_j 2 X.$$
- For any ample$/U$ $$-divisor $A$ on $X$,
$$_A:=\{j R_j(X/U)_K_+B+A+_X<0\}$$
is a finite set. In particular, $\{R_j\}_j$ is countable, and is a discrete subset in $(X/U)_K_+B+_X<0$. Moreover, we may write
$$(X/U)=(X/U)_K_+B+A+_X 0+(X/U)_(X,,B,)+_j_AR_j.$$
- Let $F$ be a $(K_X+B+_X)$-negative extremal face in $(X/U)$ that relatively ample at infinity (cf. Definition [defn: basics of cone theorem]) with respect to $(X,,B,)$. Then $F$ is a rational extremal face.
When $=T_X$ and $=0$, Theorem [thm: cone theorem gfq] follows from [Theorem 5.10]Amb03 and [Theorem 4.5.2]Fuj17. However, whenever either $=T_X$ or $=0$, Theorem [thm: cone theorem gfq] becomes new. More precisely, there are two cases that worth to mention:
- When $=T_X$, we get the cone theorem for generalized pairs, Theorem [thm: cone theorem nonnqc gpair], which is new.
- When $U=\{pt\}$ and $=0$, (2) and a large part of (1) (the part without considering he rationality of $R_j$) were proven in [Theorem 3.9]ACSS21, but the rest parts are missing. Therefore, we cannot directly use [Theorem 3.9]ACSS21 to prove Theorem [thm: mmp fdlt] and Theorem [thm: cone theorem gfq] becomes necessary.
We would like to note that the contraction theorem, the existence of flips, and the base-point-freeness theorem are still valid for generalized foliated quadruples that possess nice singularities (e.g. F-dlt). However, since these theorems do not hold the same level of importance in proving our other main theorems as the cone theorem does, we choose to omit them here.
### Canonical bundle formula The canonical bundle formula for foliated triples, as established in [Theorem 1.3]LLM23, plays a crucial role in proving the global ACC for foliated threefolds. However, due to technical challenges, the work presented in [LLM23] could not prove the canonical bundle formula for generalized foliated quadruples $(X,,B,)$ unless the nef part $$ is $$-semi-ample. In this study, we overcome these technical difficulties with innovative approaches, successfully proving the canonical bundle formula for generalized foliated quadruples in a more comprehensive manner.
Let $(X,,B,)/U$ be a sub-generalized foliated quadruple and $f: Xarrow Z$ a contraction$/U$, such that $f: (X,,B,)arrow Z$ is an lc-trivial morphism (see Definition [defn: lc trivial morphism]). Let $B_Z$ and $^Z$ be the discriminant part and the base moduli part of $f: (X,,B,)arrow Z$ (see Definition-Theorem [defthm: cbf lctrivial morphism]). Then $^Z$ is $$-nef$/U$ and
$$K_+B+_X_ Rf^*(K__Z+B_Z+^Z_Z).$$
Moreover, we have the following properties:
- $B_Z$ is uniquely determined and $^Z$ is uniquely determined up to $$-linear equivalence.
- If $B 0$, then $B_Z 0$.
- If $(X,,B,)$ is sub-lc, then $(Z,_Z,B_Z,^Z)$ is sub-lc.
- If $(X,,B,)$ is lc, then $(Z,_Z,B_Z,^Z)$ is lc.
- If $(X,,B,)$ is sub-lc or $f$ has connected fibers, then any lc center of $(Z,_Z,B_Z,^Z)$ is the image of an lc center of $(X,,B,)$ on $Z$.
- If $f$ has connected fibers, then the image of any lc center of $(X,,B,)$ on $Z$ is an lc center of $(Z,_Z,B_Z,^Z)$.
- If $f$ has connected fibers, then for any prime divisor $D$ on $X$,
$$_DB_Z=(D)-\{t (X,,B+tf^*D,) is lc over the generic point of D\}$$
where $(D)=0$ if $D$ is $_Z$-invariant, and $(D)=1$ otherwise (see Definition [defn: special divisors on foliations]).
- The $$-linear equivalence class of $^Z$ only depends on $(X,B,)$ over the generic point of $Z$.
- If $$ is NQC$/U$, then $^Z$ is NQC$/U$.
We want to emphasize that Theorem [thm: cbf gfq] is applicable to any foliation, not just those that are algebraically integrable. Consequently, we anticipate that Theorem [thm: cbf gfq] will play a significant role in future studies, encompassing both algebraically integrable foliations and those that are not necessarily algebraically integrable.
Next, we revisit the history of partial results that have contributed to the main part of Theorem [thm: cbf gfq], i.e. the nefness$/U$ of $^Z$.
- When $=T_X$ and $=0$, the main part of Theorem [thm: cbf gfq] is[Theorem 1.2]JLX22 (or [Theorem 2.23]JLX22 combined with [Lemma 1.1]FG12). For other related references, see [Kod64,Kaw98,Amb05,Kol07,Flo14,FG14].
- When $=T_X$ and $$ is NQC$/U$, previously we only knew the cases where either $B 0$ at the generic point of $Z$ or $$ is $$-semi-ample$/Z$ ([Theorem 2.23]JLX22+[Theorem 4.5]HL21b). We direct the reader to [Fil19,Fil20,FS23] for other related references. It is worth noting that no results were known when $$ is not NQC$/U$.
- When $ T_X$, we only knew the cases where $f$ is a contraction and $$ is NQC$/U$ and $$-semi-ample$/Z$ ([Proposition 6.14]LLM23).
In this paper, we not only prove Theorem [thm: cbf gfq] in full generality but also clarify why [Kol07] was able to address the horizontal negative coefficients, while [Fil19,Fil20,JLX22,FS23] cannot deal with this issue. Further details on this are provided in Remark [rem: lc trivial fibration definition]. Following this discussion, we refine the definition of lc-trivial fibrations and lc-trivial morphisms, which are elaborated in Definition [defn: lc trivial fibration gfq].
Finally, we note that the proof of Theorem [thm: cbf gfq] does not depend on the mixed Hodge structure, as opposed to what is done in [Kol07]. Remark [rem: lc trivial fibration definition] also explains why the mixed Hodge structure cannot be applied to our case. Instead, our approach is based on the structure of algebraically integrable foliations, a method similar to the one used in [Proof of Theorem 1.3]ACSS21. However, the canonical bundle formula in that reference is not complete as the ``BP stable" condition is required. Moreover, [Theorem 1.3]ACSS21 also has the additional requirement that $B 0$ over the generic point of $Z$, a condition we aim to avoid.
## Singularities of algebraically integrable generalized foliated quadruples
The cone theorem and the canonical bundle formula are primarily concerned with understanding the global behavior of algebraically integrable generalized foliated quadruples. However, it is equally important to examine the local behavior, particularly the singularities of these structures. In this paper, we will concentrate on two key aspects that are tied to the singularity structure of generalized foliated quadruples: the precise adjunction formula and the ACC for lc thresholds.
### Adjunction formulas [Proposition 3.2]ACSS21 proves the adjunction formula for algebraically integrable foliations provided that the ambient variety is $$-factorial and that the foliation is induced by a contraction. In this paper, we remove these two technical conditions and prove the adjunction formula for algebraically integrable foliations in full generality:
Let $(X,,B)$ be an foliated triple such that $$ is algebraically integrable. Let $S$ be a prime divisor on $X$, such that $_SB=0$ if $S$ if $$-invariant and $_SB=1$ otherwise. Let $S^$ be the normalization of $S$ and $_S$ the restricted foliation (see Definition [defn: restricted foliation]) of $$ on $S^$. Then
$$K__S+B_S=(K_+B)|_S^$$
for some $$-divisor $B_S 0$. Moreover, if $(X,,B)$ is lc, then $(S^,_S,B_S)$ is lc.
We remark that [Theorem 3.16]CS23b proves the adjunction formula to non-invariant divisors for any foliation with a minor requirement that the boundary has $$-coefficients. In particular, when $B$ has rational coefficients and $_SB=1$, Theorem [thm: fol adj intro] is implied by [Theorem 3.16]CS23b.
Theorem [thm: fol adj intro] can be extended to the category of algebraically integrable generalized foliated quadruples:
Let $(X,,B,)/U$ be a generalized foliated quadruple such that $$ is algebraically integrable. Let $S$ be a prime divisor on $X$, such that $_SB=0$ if $S$ if $$-invariant, and $_SB=1$ otherwise. Let $S^$ be the normalization of $S$, $^S:=|_S^$ (see Definition [defn: restriction b divisor]), and $_S$ the restricted foliation of $$ on $S^$. Then
$$K__S+B_S+^S_S^:=(K_+B+_X)|_S^$$
for some $$-divisor $B_S 0$. Moreover, if $(X,,B,)$ is lc, then $(S^,_S,B_S,^S)$ is lc.
In [Theorem 1.6]DLM23, a precise adjunction formula was introduced for algebraically integrable foliated triples, playing a crucial role in proving the ACC for lc thresholds and the global ACC for algebraically integrable foliated triples. Building upon this concept, we formulate and establish a precise adjunction formula for algebraically integrable generalized foliated quadruples in this paper. We then apply it to prove the ACC for lc thresholds and the global ACC for algebraically integrable generalized foliated quadruples. We have the following theorem:
Let $ [0,+)$ be a set of real numbers. Let $(X,,B,)/U$ be an lc generalized foliated quadruple, $S$ a prime divisor on $X$ with normalization $S^$, such that $_SB=0$ if $S$ is $$-invariant and $_SB=1$ otherwise. Assume that the coefficients of $B$ belong to $$ and $$ is a $$-linear combination of nef$/U$ $$-Cartier $$-divisors. Let
$$K__S+B_S+^S_S^:=(K_+B+_X)|_S^$$
where $_S$ is the restricted foliation of $$ on $S^$ and $^S=|_S^$.
Then the coefficients of $B_S$ belong to $D()$ (see Definition [defn: derived set]). In particular, if $$ is a DCC set, then the coefficients of $B_S$ belong to a DCC set.
We offer a more detailed version of Theorem [thm: dcc adjunction is dcc] in Theorem [thm: precise adj gfq]. Given its highly technical nature, we omit it from the introduction.
### ACC and the global ACC Theorem [thm: dcc adjunction is dcc] leads to the proof of the ACC and the global ACC for algebraically integrable generalized foliated quadruples. These results were proven in [HMX14] for usual pairs ($=T_X$ and $=0$), in [BZ16] for generalized pairs ($=T_X$), and in [DLM23] for foliated triples ($=0$).
[ACC for lc thresholds for algebraically integrable generalized foliated quadruples]
Let $r$ be a positive integer and $ [0,+)$ a DCC set. Then there exists an ACC set $'$ depending only on $r$ and $$ satisfying the following. Let $(X,,B,)/X$ be an lc generalized foliated quadruple, such that
- $$ is algebraically integrable of rank $r$,
- the coefficients of $B$ belong to $$, and
- $$ is a $$-linear combination of nef$/X$ $$-Cartier $$-divisors.
Then the lc threshold
$$(X,,B,;D,):=\{t t 0, (X,,B+tD,+t) is lc\}$$
is contained in $'$.
[Global ACC for algebraically integrable generalized foliated quadruples]
Let $r$ be a positive integer and $ [0,1]$ a DCC set. Then there exists a finite set $_0$ depending only on $r$ and $$ satisfying the following. Let $(X,,B,)$ be a projective lc generalized foliated quadruple such that
- $$ is algebraically integrable of rank $r$,
- the coefficients of $B$ belong to $$,
- $=_j_j$, where each $_j$ and each $_j$ is a nef $$-Cartier $$-divisor,
- $_j0$ if $_j=0$, and
- $K_+B+_X 0$.
Then the coefficients of $B$ belong to $_0$, and $_j_0$ for each $j$.
The proof of Theorem [thm: global acc alg int gfq] is harder than the proof of the global ACC for algebraically integrable foliated triples [Theorem 1.2]DLM23. This is because our proof heavily relies on the existence of Mori fiber spaces (Theorem [thm: eomfs]), unlike the proof in [Theorem 1.2]DLM23.
As a straightforward corollary of Theorem [thm: global acc alg int gfq], we obtain the global ACC for rank one generalized foliated quadruples:
[Global ACC for rank one generalized foliated quadruples]
Let $ [0,1]$ be a DCC set. Then there exists a finite set $_0$ depending only on $$ satisfying the following. Let $(X,,B,)$ be an lc generalized foliated quadruple such that
- $=1$,
- the coefficients of $B$ belong to $$,
- $=_j_j$, where each $_j$ and each $_j$ is a nef $$-Cartier $$-divisor,
- $_j0$ if $_j=0$, and
- $K_+B+_X 0$.
Then the coefficients of $B$ belong to $_0$, and $_j_0$ for each $j$.
When $=0$, Corollary [cor: global acc rank 1 gfq] was proven in [Corollary 1.3]DLM23.
### Uniform rational polytopes As a direct consequence of Theorems [thm: acc lct alg int gfq] and [thm: global acc alg int gfq], we establish the existence of uniform lc rational polytopes for algebraically integrable generalized foliated quadruples. Despite their complex nature, these polytopes are powerful tools in birational geometry. They are notably used in several applications on the ACC conjecture for minimal log discrepancies and the boundedness of complements. These polytopes are essential for the formal definition of KSBA moduli spaces [6.27.3, Theorem 11.49]Kol23, and play a crucial role in proving the global ACC for foliated threefolds [LMX23b]. In this paper, we prove the existence of uniform lc rational polytopes for algebraically integrable generalized foliated quadruples:
Let $r$ be a positive integer, $v_1^0,,v_m^0,u_1^0,,u_n^0$ positive real numbers, $_0:=(v_1^0,,v_m^0)$, and $_0:=(u_1^0,,u_n^0)$. Then there exists an open set $U (_0,_0)$ of the rational envelope of $(_0,_0)$ in $ R^m+n$ depending only on $r$ and $_0$, $_0$ satisfying the following. Let $$(X,,B=_j=1^mv_j^0B_j,=_k=1^nu_k^0_k)/X$$ be an lc generalized foliated quadruple, such that $$ is algebraically integrable, $=r$, $B_j 0$ are distinct Weil divisors, and $_k$ are nef$/X$ $$-Cartier $$-divisors. Then $$(X,,B=_j=1^mv_jB_j,_k=1^nu_k_k)$$ is lc for any $(v_1,,v_m,u_1,,u_n) U$.
## Miscellaneous results on the minimal model program and foliations We also prove several other interesting theorems that can be useful for further applications.
### Analogues of dlt models We establish the existence of $(*)$-models and ACSS models for algebraically integrable generalized foliated quadruples (see Definitions [defn: ACSS f-triple] and [defn: acss model]). As detailed in [ACSS21,CS23a,DLM23], these models play the same role as dlt models in the classic MMP. Moreover, $$-factorial dlt algebraically integrable generalized foliated quadruples always satisfy the property ``ACSS" and the property $(*)$ (see Theorem [thm: fdlt is acss]).
[Existence of ACSS model]
Let $(X,,B,)/U$ be an lc generalized foliated quadruple. Assume that $$ is algebraically integrable. Then $(X,,B,)/U$ has an ACSS model which is also a $(*)$-model.
In particular, there exists a birational morphism $h_Y: Yarrow X$ and a contraction $f_Y: Yarrow Z$ satisfying the following. Let $_Y:=h_Y^-1$ and
$$K__Y+B_Y+_Y=h_Y^*(K_+B+_X),$$
then
- $(Y,B_Y,)$ is $$-factorial qdlt,
- $f_Y$ is equi-dimensional and $_Y$ is induced by $f_Y$, and
- any prime $f$-exceptional divisor is an lc place of $(X,,B,)$.
### Minimal model program for very exceptional divisors When running the relative minimal model program, especially the birational minimal model program, we often encounter the minimal model program for very exceptional divisors [Theorem 1.8]Bir12. In this paper, we establish the minimal model program for algebraically integrable generalized foliated quadruples whose generalized foliated log canonical divisor is very exceptional.
Let $(X,,B,)/U$ be a $$-factorial F-dlt generalized foliated quadruple and $E 0$ and $$-divisor on $X$, such that $E$ is very exceptional$/U$ and
$$K_+B+_X_ R,UE.$$
Then we may run a $(K_+B+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor, and any such MMP terminates with a good minimal model $(X',',B',)/U$ of $(X,,B,)/U$, such that $K_'+B'+_X'_ R,U0$.
Theorem [thm: gfq mmp very exceptional intro] is vital for proving that $$-factorial dlt implies ACSS (Theorem [thm: fdlt is acss]). This is essential for proving Theorem [thm: main mmp foliation].
### A special case of Prokhorov-Shokurov's base-point-freeness conjecture
Prokhorov-Shokurov's base-point-freeness conjecture [Conjecture 7.13]PS09 is a major conjecture in birational geometry. It has been verified when the relative dimension of the fibration is $1$ ([Theorem 8.1]PS09) or $2$ ([Theorem 1.4]ABBDILW23). However, for the relative dimension of the fibration $ 3$, the conjecture is still largely open. Through the application of foliation theory, we prove a special case of the Prokhorov-Shokurov base-point-freeness conjecture:
Let $d$ and $m$ be two positive integers. Then there exists a positive integer $I$ depending only on $d$ and $I$ satisfying the following.
Let $(X,B)$ be a projective klt pair, and $f: Xarrow Z$ a contraction to a smooth variety $Z$. Let $B^h$ and $B^v$ be the horizontal$/Z$ part of $B$ and the vertical$/Z$ part of $B$ respectively, and let $$ be the moduli part of $f: (X,B)arrow Z$. Assume that the following conditions hold.
- (Semi-stability) $(X,B)$ is BP semi-stable$/Z$.
- (Klt-trivial) $K_X+B_ Q,Z0$.
- (Coefficient control) $mB$ is a Weil divisor.
- (Fano type) There exists an ample $$-divisor $H$ such that $B^h H 0$.
- (Snc condition) There exists a reduced divisor $_Z$ on $Z$, such that $B^v=f^-1(_Z)$, $(Z,_Z)$ is log smooth, and for any reduced divisor $H 0$ such that $(Z,+H)$ is log smooth, $(X,B+f^*H)$ is lc.
Then $$ descends to $X$, $I_X$ is Cartier, and $nI_X$ is base-point-free for any integer $n 0$.
While the conditions of Theorem [thm: ps intro] are quite restrictive, mainly because condition (4) is not preserved under birational transformations, there are no requirements on the dimension of the varieties or the relative dimension of $f$. This makes the theorem potentially useful for future applications.
## Why should we care about generalized foliated quadruples?
Before we move on to the main part of the paper, we would like to briefly explain why we need to consider the structure of generalized foliated quadruples and why it is essential for us to prove some main theorems of the paper, even if these theorems' statements do not explicitly mention this structure. To clarify this, we present five scenarios where generalized foliated quadruples play a crucial role. Four out of these five scenarios are unavoidable in the proofs of this paper.
[Canonical bundle formula of foliations]
[Theorem 1.2]LLM23 established the canonical bundle formula for foliations. More precisely, given a projective lc foliated triple $(X,,B)$ and a contraction $f: Xarrow Z$ such that the general fibers of $f$ are tangent to $$ and $K_+B_ R,Z0$, we have
$$K_+B_ Rf^*(K__Z+B_Z+_Z)$$
where $(Z,_Z,B_Z,)$ is a projective lc generalized foliated quadruple. Therefore, if we want to study the behavior of $(X,,B)$, then it is necessary to study the structure of $(Z,_Z,B_Z,)$. When $=T_X$ and $(X,B)$ is klt, the classical approach is to find an $$-divisor
$$0_Z_ RB_Z+_Z$$
such that $(Z,_Z)$ is klt [Theorem 0.2]Amb05 and use the structure of $(Z,_Z)$ instead of $(Z,B_Z,)$. This approach is essential for the proof of the finite generation of the canonical ring ([Proof of Corollary 1.1.2]BCHM10, [FM00]).
However, when $=T_X$, it is generally not possible for us to combine $B_Z$ and $_Z$ and get an lc triple structure $(Z,_Z,_Z_ RB_Z+_Z)$. This is because of the following two reasons:
- ``Klt" is almost an empty condition for foliations when $=T_X$. Actually, unless the foliation is purely transcendental, there are always (infitely many) lc centers of $(X,,B)$ as long as $=T_X$. This will cause trouble when we try to perturb the coefficients of $B_Z+_Z$ and get $_Z$. In fact, even when $=T_X$, if $(X,B)$ is not klt, then we do not know whether there exists such $_Z$ so that $(Z,_Z)$ is lc, and we usually need the $$-semi-ampleness of $$ to show this fact. The $$-semi-ampleness of $$, on the other hand, is the Prokhorov-Shokurov conjecture [Conjecture 7.13]PS09 as mentioned above, which is widely open when $ X- Z 3$. Indeed, the unconfirmed status of the Prokhorov-Shokurov conjecture is one key reason why Birkar-Zhang introduced the concept of generalized pairs in [BZ16].
- Even if $$ is semi-ample, the existence of such $_Z$ is also unknown as Bertini type theorems fail for foliations in general, even for surfaces (cf. [Example 3.4]DLM23). In other words, it is possible that $(Z,_Z,B_Z+G_Z)$ is not lc for any $G_Z |_Z|_ R$.
Therefore, in many situations, we must analyze the structure of generalized foliated quadruples rather than foliated triples. Furthermore, due to (2), the concept of generalized foliated quadruples becomes essential for studying foliations, even in lower dimensions. This is a key reason why [LLM23,LMX23b] rely on the theory of generalized foliated quadruples to establish the global ACC for foliated triples in dimension $3$.
[MMP with scaling]
We recall how we run the minimal model program for with scaling for usual pairs. For simplicity, we only consider the projective case. Given a projective lc pair $(X,B)$ and an $$-divisor $A 0$ on $X$ such that $K_X+B+A$ is nef, we consider the scaling numbers
$$:=\{t t 0, K_X+B+tA is nef\}.$$
If $t=0$ then we are done. Otherwise, we contract a $(K_X+B)$-negative extremal ray $R$ such that $(K_X+B+tA) R=0$, and let $f: (X,B) (X',B')$ be a corresponding divisorial contraction, flip, or Mori fiber space associated to the contraction of $R$. We may replace $(X,B)$ with $(X',B')$ and $A$ with $A'$ and continue this process.
Although we only need $K_X+B+A$ to be nef to run the MMP, in practice, we usually also need the additional condition that $(X,B+A)$ is lc. This is helpful in many situations: since we do not know the termination of the MMP, it is likely for us to consider pairs $(X,B+ A)$ where $$ is related to the scaling numbers $$. In this case, we usually need $(X,B+A)$ to be lc in order to guarantee that $(X,B+ A)$ is lc. For this reason, for the very first step of the MMP, we usually require $A$ to be a general ample $$-divisor, or a general base-point-free big and nef $$-divisor when $(X,B)$ is klt.
Now we consider the minimal model program for foliations. We definitely want to consider the minimal model program with scaling of ample divisors as well. However, as we have explained above, Bertini type theorems fail for foliations in general, even for surfaces (cf. [Example 3.4]DLM23). Therefore, it is possible that for any ample $$-divisor $A 0$ on $X$, $(X,,B+A)$ is not lc. Now the minimal model program of $(X,,B)$ with scaling of $A$ becomes weird: we can still run the minimal model program, but it will become difficult to study the intermediate outputs $(X',B'+ A')$ with $>0$ after each step of the MMP, where $$ is the scaling number. This causes a lot of inconvenience for the minimal model program of foliations.
The structure of generalized foliated quadruples, however, can easily resolve this issue: if we identify $(X,,B)$ with the generalized foliated quadruple $(X,,B,0)$, then instead of running an MMP with scaling of an ample $$-divisor $A$, we can let $:=$ be the nef $$-divisor associated to $A$. Now may run an MMP with scaling of $(0,)$. That is, although we still consider
$$:=\{t t 0, K_+B+tA is nef\},$$
the output of the first step of the MMP $: X X'$ becomes $$(X','=_*,B'=_*B,)$$ which is still an lc generalized foliated quadruple. Therefore, by using the theory of generalized foliated quadruples, we can bypass the failure of Bertini type theorems of foliations straightforwardly.
[Minimal model program on K\"ahler varieties]
It is well-known that foliations, especially algebraically integrable foliations, has a tight connection with the minimal model program for K\"ahler varieties. As we have mentioned above, Das and Ou essentially use the structure of algebraically integrable foliations to prove the abundance conjecture for K\"ahler manifolds in dimension $3$ [DO23a,DO23b]. There is no doubt that foliations are expected to be useful in the study of K\"ahler minimal model program in the future.
On the other hand, generalized pairs is also known to have a tight connection with the minimal model program for K\"ahler varieties [DH23,DHY23]. The key reason is due to the minimal model program with scaling of K\"ahler classes. K\"ahler classes cannot be considered as divisors, but by considering K\"ahler classes as $$-nef classes and move it to the nef part of the generalized pair, we can formally define the minimal model program with scaling of K\"ahler classes.
In summary, the study of K\"ahler varieties seems to be a natural place for foliations and generalized pairs to get mixed together. We therefore can expect the structure of generalized foliated quadruples, particularly the algebraically integrable ones, to play a crucial role in the study of K\"ahler varieties in the future.
[Cone theorem and semi-ampleness theorem]
In [Theorem 3.9]ACSS21, a version of the cone theorem for algebraically integrable foliated triples $(X,,B)$ is proved. When $(X,,B)$ is lc, the main part of the cone theorem, i.e. the formula
$$(X)=(X)_K_+B 0+ R_j$$
was proved in [Theorem 3.9]ACSS21. However, [Theorem 3.9]ACSS21 did not prove the countableness of $R_j$ nor the finiteness of $R_j$ when polarizing $(X,,B)$ with an ample divisor $A$. That is, the formula
$$(X)=(X)_K_+B+A 0+_ R_j$$
is missing. One key reason for this seems to be the issue that $(X,,B+A)$ may no longer be lc, and this is, again, due to the failure of the Bertini type theorems for foliations. However, if we consider $(X,,B, A)$ instead of $(X,,B+A)$, then $(X,,B, A)$ becomes an lc generalized pair and we have immediately have more flexibility.
Similar issues appear when we consider the semi-ampleness theorem for foliations. For usual pairs, the semi-ampleness theorem is usually formulated in the following way:
$$(X,B) lc, A ample, K_X+B+A nef K_X+B+A semi-ample.$$
However, for foliations, the semi-ampleness theorem is usually formulated in the following way: (under suitable conditions)
$$(X,,B+A) lc, B 0, A 0 ample, K_+B+A nef K_+B+A semi-ample.$$
This is again due to the failure of Bertini-type theorems. Nevertheless, with the new concept of generalized foliated quadruples, these arguments can now be strengthened back to: (under suitable conditions)
$$(X,,B) lc, A ample, K_+B+A nef K_+B+A semi-ample.$$
[Canonical bundle formula for generalized pairs]
The final scenario where the structure of generalized foliated quadruples plays a vital role is in obtaining the canonical bundle formula for generalized pairs. To establish this formula for lc-trivial fibrations in cases involving either non-NQC generalized pairs or NQC generalized pairs with potentially negative coefficients, we cannot rely on the structure of mixed Hodge structure (see Remark [rem: lc trivial fibration definition]). Filipazzi's approach [Fil19,Fil20] is also unsuitable due to its requirements for $$-coefficients and its inability to handle negative coefficients. Therefore, the only viable approach to achieve such a canonical bundle formula is by utilizing the theory of foliations as in [ACSS21]. Now, since we are dealing with generalized pairs in this context, the introduction of generalized foliated quadruples becomes necessary. For more details, we refer the reader to the proof of Theorem [thm: cbf gpair nonnqc].
# Basic definitions
Throughout the paper, we will mainly work with normal quasi-projective varieties to ensure consistency with the references. However, most results should also hold for normal varieties that are not necessarily quasi-projective. Similarly, most results in our paper should hold for any algebraically closed field of characteristic zero. We will adopt the standard notations and definitions in [KM98, BCHM10] and use them freely. For foliations, we will generally follow the notations and definitions in [CS20,ACSS21,CS21], but there may be minor differences. For generalized pairs, we will follow the notations and definitions in [HL21a].
## Special notations
In this paper, $ N$ stands for the set of non-negative integers and $ N^+$ stands for the set of positive integers.
In this paper, the notation ``$/$" is always considered as a simplified writing of ``over". For example, ``$/Z$" means ``over $Z$".
Let $Xarrow U$ be a projective morphism from a normal variety to a variety, and let $A$ be a semi-ample$/U$ $$-divisor on $X$. An $$-divisor $H$ on $X$ is said to be general in $|A/U|_ R$ if there exist base-point-free$/U$ divisors $A_1,,A_n$ and real numbers $r_1,,r_n (0,1)$, such that $A=_i=1^nr_iA_i$ and $H=_i=1^nr_iH_i$, where $H_i |A_i/U|$ are general elements. A general ample$/U$ $$-divisor on $X$ is an ample$/U$ $$-divisor $D$ on $X$ such that $D$ is general in $|D/U|_ R$.
Let $$ be a set of real numbers, $X$ a normal variety, and $B$ an $$-divisor on $X$. We write $B$ if the coefficients of $B$ belong to $$.
Let $: Xarrow U$ be a projective morphism between varieties and $D$ an $$-divisor on $X$. We denote by $_(X/Z,D)$ (resp. $_(X/Z,D)$, $(X/Z,D)$) the relative numerical dimension (resp. relative invariant Iitaka dimension, relative Iitaka dimension) of $D$ over $Z$. When $Z=\{pt\}$, we may drop $X/Z$ and use the notation $_(D)$ (resp. $_(D)$, $(D)$) instead. We refer the reader to [Section 2]HH20 for the formal definitions and basic properties of $_(X/Z,D)$, $(X/Z,D)$, and $(X/Z,D)$.
[Log big]
Let $(X,B,)/U$ be a g-pair and $D$ an $$-Cartier $$-divisor $D$ on $X$. We say that $D$ is log big$/U$ with respect to $(X,B,)$ if $D|_V$ is big$/U$ for any lc center $V$ of $(X,B,)$. In particular, $D$ is big$/U$.
[cf. [Definition 5.3]Amb03, [Definition 6.7.2]Fuj11]
Let $(X,)$ be a (not necessarily lc) pair and $: Xarrow U$ a projective morphism. Let $F$ be an extremal face of $(X/U)$.
- A supporting function of $F$ is a $$-nef $$-divisor $H$ such that $F=(X/U) H^$. If $H$ is a $$-divisor, we say that $H$ is a rational supporting function. Since $F$ is an extremal face of $(X/U)$, $F$ always has a supporting function.
- We say that $F$ is rational if $F$ has a rational supporting function.
- For any $$-Cartier $$-divisor $D$ on $X$, we say that $F$ is $D$-negative if $$F(X/U)_D 0=\{0\}.$$
- We say that $F$ is relatively ample at infinity with respect to $(X,)$ if $$F(X/U)_(X,)=\{0\}.$$ Equivalently, $H|_(X,)$ is $|_(X,)$-ample for any supporting function $H$ of $F$.
- We say that $F$ is contractible at infinity with respect to $(X,)$ if $F$ has a rational supporting function $H$ and $H|_(X,)$ is $|_(X,)$-semi-ample.
Let $K$ be a convex cone containing no lines. A ray $R$ of $K$ is called exposed if there is a hyperplane meeting $K$ exactly along $R$. In particular, any exposed ray of $K$ is extremal in $K$. If $K$ does not contain any line, then $K$ is the closure of the subcone of $K$ spanned by exposed rays ([Corollary 18.7.1]Roc97, [Lemma 6.2]Spi20).
Let $: Xarrow U$ be a projective morphism from a normal quasi-projective variety to a variety. By definition, an extremal ray in $(X/U)$ is exposed if and only if it has a supporting function (that is not necessarily rational). Moreover, for any sub-cone $V$ of $(X/U)$, we have
$$(X/U)=+ R_i$$
where $R_i$ are exposed rays that are not contained in $V$.
## Sets
Let $$ be a set. We say that $$ satisfies the descending chain condition (DCC) if any decreasing sequence in $$ stabilizes, and $$ satisfies the ascending chain condition (ACC) if any increasing sequence in $$ stabilizes.
Let $ [0,+)$ be a set. We define
$$_+:=\{0\}\{_i=1^l_i| _i,l N^+\} and D():=\{-1+|_+,m N^+\}.$$
## Foliations In this subsection, we define foliations and some of its related concepts. For preliminaries regarding algebraically integrable foliations, we refer the reader to Subsection [subsec: ai foliation].
[Foliations, cf. [Section 2.1]CS21]
Let $X$ be a normal variety. A foliation on $X$ is a coherent sheaf $ T_X$ such that
- $$ is saturated in $T_X$, i.e. $T_X/$ is torsion free, and
- $$ is closed under the Lie bracket.
The rank of the foliation $$ is the rank of $$ as a sheaf and is denoted by $$. The co-rank of $$ is $ X-$. The canonical divisor of $$ is a divisor $K_$ such that $_X(-K_)()$. We define $N_:=(T_X/)^$ and $N_^*:=N_^$.
If $=0$, then we say that $$ is a foliation by points.
[Singular locus]
Let $X$ be a normal variety and $$ a rank $r$ foliation on $X$. We can associate to $$ a morphism $$: _X^[r] _X(K_)$$ defined by taking the double dual of the $r$-wedge product of the map $^1_X ^*$, induced by the inclusion $ T_X$. This yields a map $$': (_X^[r]_X(-K_))^ _X$$ and we define the singular locus, denoted as $ $, to be the co-support of the image of $'$.
[Pullbacks and pushforwards, cf. [3.1]ACSS21]
Let $X$ be a normal variety, $$ a foliation on $X$, $f: Y X$ a dominant map, and $g: X X'$ a birational map. We denote $f^-1$ the pullback of $$ on $Y$ as constructed in [3.2]Dru21. We also say that $f^-1$ is the induced foliation of $$ on $Y$. If $=0$, then we say $f^-1$ is induced by $f$. In this case, we say $f^-1$ is algebraically integrable.
We define the pushforward of $$ on $X'$ as $(g^-1)^-1$ and denote it by $g_*$.
[Invariant subvarieties, cf. [3.1]ACSS21]
Let $X$ be a normal variety, $$ a foliation on $X$, and $S X$ a subvariety. We say that $S$ is $$-invariant if and only if for any open subset $U X$ and any section $ H^0(U,)$, we have $$(_S U) _S U$$
where $_S U$ is the ideal sheaf of $S U$. Note that if $$ is the foliation induced by a dominant map $f:X Z$, then a divisor $D$ is $$-invariant if and only if $D$ is vertical with respect to $f$.
[Special divisors on foliations, cf. [Definition 2.2]CS21]
Let $X$ be a normal variety and $$ a foliation on $X$. For any prime divisor $C$ on $X$, we define $_(C):=1$ if $C$ is not $$-invariant, and $_(C):=0$ if $C$ is $$-invariant. If $$ is clear from the context, then we may use $(C)$ instead of $_(C)$. For any $$-divisor $D$ on $X$, we define $$D^:=_C C is a component of D_(C)C.$$
Let $E$ be a prime divisor over $X$ and $f: Yarrow X$ a projective birational morphism such that $E$ is on $Y$. We define $_(E):=_f^-1(E)$. It is clear that $_(E)$ is independent of the choice of $f$.
## Polarized foliations In this subsection we introduce the concept of generalized foliated quadruples, which was originally introduced by the third author, Luo, and Meng in their study of the global ACC for foliated threefolds [LLM23]. The category of generalized foliated quadruples is a larger category comparing to generalized pairs, foliated triples, and usual pairs, so we shall not formally define the latter three concepts and only consider them as special generalized foliated quadruples. Since this is a very technical definition and we do not need its full power for some parts of the paper (e.g. we only need the concept of generalized pairs in Sections [sec: basic property gpair] and [sec: stability gpair]), for the reader's convenience, we refer the reader to [KM98,BCHM10] for the definition of pairs and [BZ16,HL21a] for the definition of generalized pairs. We refer the reader to [CS20,CS21] for the definition of foliated pairs $(,B)$; a foliated pair $(,B)$ together with its ambient variety $X$ is a foliated triple $(X,,B)$.
[$$-divisors] Let $X$ be a normal quasi-projective variety. We call $Y$ a birational model over $X$ if there exists a projective birational morphism $Y X$.
Let $X X'$ be a birational map. For any valuation $$ over $X$, we define $_X'$ to be the center of $$ on $X'$. A $$-divisor $$ on $X$ is a formal sum $=_ r_$ where $$ are valuations over $X$ and $r_ R$, such that $_X$ is not a divisor except for finitely many $$. If in addition, $r_$ for every $$, then $$ is called a $$-$$-divisor. The trace of $$ on $X'$ is the $$-divisor
$$_X':=__X' is a divisorr__X'.$$
If $_X'$ is $$-Cartier and $_Y$ is the pullback of $_X'$ on $Y$ for any birational model $Y$ over $X'$, we say that $$ descends to $X'$ and $$ is the closure of $_X'$, and write $=_X'$.
Let $Xarrow U$ be a projective morphism and assume that $$ is a $$-divisor on $X$ such that $$ descends to some birational model $Y$ over $X$. If $_Y$ is nef$/U$ (resp. base-point-free$/U$, semi-ample$/U$), then we say that $$ is nef$/U$ (resp. base-point-free$/U$, semi-ample$/U$). If $_Y$ is a Cartier divisor, then we say that $$ is $$-Cartier. If $_Y$ is a $$-Cartier $$-divisor, then we say that $$ is $$-$$-Cartier. If $$ can be written as an $_ 0$-linear combination of nef$/U$ $$-Cartier $$-divisors, then we say that $$ is NQC$/U$.
Let $Xarrow U$ be a projective morphism and assume that $$ and $'$ are two $$-divisors over $X$. We write $_ R,U'$ (resp. $_ Q,U',_ Q,U'$) if for any birational model $Y$ of $X$, $_Y_ R,U'_Y$ (resp. $_Y_ Q,U'_Y,_Y_ Q,U_Y'$).
We let $0$ be the $$-divisor $0$.
We will use two types of restrictions of $$-divisors in this paper. Let $X$ be a normal variety and $$ a $$-divisor on $X$.
- Let $V$ be a non-empty subset of $X$. We define the restricted $$-divisor of $$ on $V$, which is denoted by $|_V$, in the following way.
For any birational morphism $: W V$, there exists a birational morphism $': Yarrow X$ such that $W Y$ and $'|_W=$. We let $(|_V)_W=(_Y)|_W$. It is easy to see that this definition is independent of the choice of $Y$ and defines a $$-divisor.
- Suppose that $$ descends to a birational model of $X$. Let $S$ be a prime divisor on $X$ and $: S^ S$ the normalization of $S$. The restricted $$-divisor of $$ on $S^$, which is denoted by $|_S^$, is defined in the following way.
Let $f: Yarrow X$ be a log resolution of $(X,S)$ such that $$ descends to $Y$. Let $S_Y:=f^-1_*S$. Then there exists an induced birational morphism $f_S: S_Yarrow S^$ such that $ f_S=f|_S_Y$.
We define $$|_S^:=_Y|_S_Y.$$
It is clear that $|_S^$ is well-defined and is independent of the choice of $Y$.
[Generalized foliated quadruples]
A generalized foliated sub-quadruple (sub-gfq for short) $(X,,B,)/U$ consists of a normal quasi-projective variety $X$, a foliation $$ on $X$, an $$-divisor $B$ on $X$, a projective morphism $Xarrow U$, and a nef$/U$ $$-divisor $$ over $X$, such that $K_+B+_X$ is $ R$-Cartier. If $$ is NQC$/U$, then we say that $(X,,B,)/U$ is NQC. If $B 0$, then we say that $(X,,B,)/U$ is a generalized foliated quadruple (gfq for short). If $U=\{pt\}$, we usually drop $U$ and say that $(X,,B,)$ is projective.
Let $(X,,B,)/U$ be a (sub-)gfq. If $=0$, then we may denote $(X,,B,)/U$ by $(X,,B)/U$ or $(X,,B)$, and say that $(X,,B)$ is a foliated (sub-)triple (f-(sub-)triple for short). If $=T_X$, then we may denote $(X,,B,)/U$ by $(X,B,)/U$, and say that $(X,B,)/U$ is a generalized (sub-)pair (g-(sub-)pair for short). If $=0$ and $=T_X$, then we may denote $(X,,B,)/U$ by $(X,B)/U$ or $(X,B)$, and say that $(X,B)$ is a (sub-)pair.
A (sub-)gfq (resp. f-(sub-)triple, f-(sub-)pair, g-(sub-)pair, (sub-)pair) $(X,,B,)/U$ (resp. $(X,,B)/U$,$(X,B,)/U$, $(X,B)/U$) is called a $ Q$-(sub-)gfq (resp. $ Q$-f-(sub-)triple, $ Q$-g-(sub-)pair, $ Q$-(sub-)pair if $B$ is a $ Q$-divisor and $$ is a $ Q$-$$-divisor.
It is worth mentioning that our definition of generalized foliated quadruples slightly differs from [Definition 1.2]LLM23, as the latter requires $$ to be NQC$/U$ (see Definition [defn: b divisors]), while we only require it to be nef$/U$. This will be crucial for us to use this structure to prove Theorem [thm: main mmp gpair].
In the previous definition, if $U$ is not important, we may also drop $U$. This usually happens when we emphasize the structures of $(X,,B,)$ which are independent of the choice of $U$, such as the singularities of $(X,,B,)$. In addition, if $B=0$, then we may drop $B$.
[Singularities of gfqs]
Let $(X,,B,)$ be a (sub-)gfq. For any prime divisor $E$ over $X$, let $f: Yarrow X$ be a birational morphism such that $E$ is on $Y$, and suppose that
$$K__Y+B_Y+_Y:=f^*(K_+B+_X)$$
where $_Y:=f^-1$. We define $a(E,,B,):=-_EB_Y$ to be the discrepancy of $E$ with respect to $(X,,B,)$. It is clear that $a(E,,B,)$ is independent of the choice of $Y$. If $=0$, then we let $a(E,,B):=a(E,,B,)$. If $=T_X$, then we let $a(E,X,B,):=a(E,,B,)$. If $=0$ and $=T_X$, then we let $a(E,X,B):=a(E,,B,)$.
We say that $(X,,B,)$ is (sub-)lc (resp. (sub-)klt) if $a(E,,B,) -_(E)$ (resp. $>-_(E)$) for any prime divisor $E$ over $X$. We say that $(X,,B,)$ is (sub-)canonical (resp. (sub-)terminal) if $a(E,,B,) 0$ (resp. $>0$) for any prime divisor $E$ that is exceptional over $X$. An lc place of $(X,,B,)$ is a prime divisor $E$ over $X$ such that $a(E,,B,)=-_(E)$. An lc center of $(X,,B,)$ is a subvariety $W$ of $X$, such that either $W$ is the center of an lc place of $(X,,B,)$ on $X$, or $W=X$. A non-trivial lc center of $(X,,B,)$ is an lc center of $(X,,B,)$ that is not $X$. A non-lc place of $(X,,B,)$ is a prime divisor $E$ over $X$ such that $a(E,,B,)<-_(E)$. A non-lc center of $(X,,B,)$ is the center of a non-lc place of $(X,,B,)$ on $X$. The union of all non-lc centers of $(X,,B,)$ is called the non-lc locus of $(X,,B,)$ and is denoted by $(X,,B,)$. The union of all non-lc centers and non-trivial lc centers of $(X,,B,)$ is called the non-klt locus of $(X,,B,)$ and is denoted by $(X,,B,)$.
Let $(X,,B,)$ be a sub-gfq, $D 0$ an $$-divisor on $X$ and $$ a nef$/X$ $$-divisor, such that $D+_X$ is $$-Cartier. The lc threshold (lct for short) of $(D,)$ with respect to $(X,,B,)$ is defined as
$$(X,,B,;D,):=\{+,t (X,,B+tD,+t) is sub-lc\}.$$
If $=0$, then we may drop $$ and denote $(X,,B,;D,)$ by $(X,,B,;D)$.
[Models, I]
Let $(X,,B,)/U$ be an lc gfq, $: X X'$ a birational map over $U$, $E:=(^-1)$ the reduced $^-1$-exceptional divisor, $':=_*$, and $B':=_*B+E^'$.
- $(X',',B',)/U$ is called a log birational model of $(X,,B,)/U$.
- $(X',',B',)/U$ is called a weak lc model of $(X,,B,)/U$ if
- $(X',',B',)/U$ is a log birational model of $(X,,B,)/U$,
- $K_'+B'+_X'$ is nef$/U$, and
- for any prime divisor $D$ on $X$ which is exceptional over $X'$, $$a(D,,B,) a(D,',B',).$$
- $(X',',B',)/U$ is called a semi-good minimal model of $(X,,B,)/U$ if
- $(X',',B,)/U$ is a weak lc model of $(X,,B,)/U$, and
- $K_'+B'+_X'$ is semi-ample$/U$.
- Suppose that there exists a contraction$/U$: $X'arrow Z$. $(X',',B',)arrow Z$ is called a Mori fiber space of $(X,,B,)/U$ if
- $(X',',B',)/U$ is a log birational model of $(X,,B,)/U$,
- $X'$ is $$-factorial,
- $X'arrow Z$ is a $(K_'+B'+_X')$-Mori fiber space$/U$,
- for any prime divisor $D$ on $X$ which is exceptional over $X'$, $$a(D,,B,)<a(D,',B',).$$
We shall not define ``good minimal models" until Definition [defn: models ii].
Let $(X_0,_0,B_0,)/U$ be a gfq. When we say the following
$
(X_0,_0,B_0,)@-->[r]^f_0 & (X_1,_1,B_1,)@-->[r]^\ \ \ \ \ \ \ \ f_1 & @-->[r] & (X_n,_n,B_n,)@-->[r]^\ \ \ \ \ \ \ \ \ f_n &
$
is a (possibly infinite) sequence of steps of a $(K__0+B_0+_X_0)$-MMP$/U$, we mean the following: for any $i$, $f_i: X_i X_i+1$ is a step of a $(K__i+B_i+_X_i)$-MMP$/U$ that is not a Mori fiber space, $_i+1:=(f_i)_*_i$, and $B_i+1:=(f_i)_*B_i$.
[MMP with scaling]
Let $(X,,B,)/U$ be an lc gfq. Let $D 0$ be an $$-divisor on $X$ and $$ a nef$/U$ $$-divisor on $X$ such that $D+_X$ is $$-Cartier and $K_+B+_X+t(D+_X)$ is nef$/U$ for some positive real number $t$. A step of a $(K_+B+_X)$-MMP$/U$ with scaling of $(D,)$ is defined in the following way. Let
$$:=\{s 0 K_+B+sD+_X+s_X is nef/U\}.$$
Assume that the following conditions hold:
- There exists an extremal ray $R$ in $(X/U)$ such that $(K_+B+ D+_X+_X) C=0$ and $(D+_X) C>0$. In particular, $R$ is a $(K_+B+_X)$-negative extremal ray.
- The contraction associated to $R$ exists, and if it is a small contraction, then the corresponding $(K_+B+_X)$-flip exists.
Then for any such $R$, we call the divisorial contraction or the Mori fiber space associated to $R$, or the $(K_+B+_X)$-flip associated to $R$, as a step of a $(K_+B+_X)$-MMP$/U$ with scaling of $(D,)$.
A sequence of steps of a $(K_+B+_X)$-MMP$/U$ with scaling of $(D,)$ is a sequence of steps of a $(K_+B+_X)$-MMP$/U$
$
(X_0,_0,B_0,)@-->[r]^f_0 & (X_1,_1,B_1,)@-->[r]^\ \ \ \ \ \ \ \ f_1 & @-->[r] & (X_n,_n,B_n,)@-->[r]^\ \ \ \ \ \ \ \ \ f_n &
$
where $(X_0,_0,B_0,)=(X,,B,)$, each $f_i$ is a step of a $(K__i+B_i+_X_i)$-MMP$/U$ with scaling of $(D_i,)$, where $D_i$ is the image of $D$ on $X_i$.
$$_i:=\{t,s 0 K__i+B_i+sD_i+_X_i+s_X_i is nef/U\}$$
are called the scaling numbers (of this MMP with scaling of $(D,)$). Note that $D_i+_X_i$ is $$-Cartier for any $i$ by our construction, so $_i$ is well-defined. If this MMP does not terminate, then we call $_iarrow+_i$ the limit of the scaling numbers. By definition, we have $_i_i+1$ for any $i$ (of this MMP with scaling of $(D,)$), so the limit of the scaling numbers is well-defined.
If $=0$, then a (sequence of) step(s) of a $(K_+B+_X)$-MMP$/U$ with scaling of $(D,)$ is called a (sequence of) step(s) of a $(K_+B+_X)$-MMP$/U$ with scaling of $D$.
We remark that Construction [cons: mmp with scaling] does not require the condition that $(X,,B+D,+)$ is lc.
Let $(X,,B,)$ and $(X',',B',')$ be two sub-gfqs
We say that $(X,,B,)$ and $(X',',B',')$ are crepant to each other if $='$, and there exist two birational morphisms $p: Warrow X$ and $q: Warrow X'$ and a foliation $_W$ on $W$, such that $_W=p^-1=q^-1'$, $='$, and
$$p^*(K_+B+_X)=q^*(K_'+B'+'_X').$$
# Basic properties of generalized pairs
In this section, we present several results concerning the structure of generalized pairs. Although most of these results, or their analogous forms, have already been established in existing literature, it is somewhat surprising to note that many fundamental results for non-NQC generalized pairs remain unaddressed, despite the significant progress in the field of generalized pairs in recent years. Additionally, there are relatively few references available on this subject. For clarity, for the reader's convenience, and to provide a solid reference for future work, we will present detailed proofs for all the results in this section
## Dlt modification
First we recall the definition of dlt for generalized pairs.
[Dlt, [Definition 2.3]HL22]
Let $(X,B,)/U$ be an lc g-pair. We say that $(X,B,)$ is dlt if there exists an open subset $V X$ satisfying the following.
- $(V,B|_V)$ is log smooth. In particular, $B|_V$ is an snc Weil $$-divisor.
- $V$ contains the generic point of any lc center of $(X,B,)$.
- The generic point of any lc center of $(X,B,)$ is the generic point of an lc center of $(V,B|_V)$.
If $(X,B,)$ is dlt and $ B$ is normal, then we say that $(X,B,)$ is plt.
The following lemma indicates that the definition of dlt in [Definition 2.3]HL22 is the same as the definition of dlt in [Bir20,FS23].
Let $(X,B,)/U$ be an lc g-pair. Then the following two conditions are equivalent:
- $(X,B,)$ is dlt.
- For any lc center of $(X,B,)$ with generic point $$, over a neighborhood of $$, $(V,B|_V)$ is log smooth and $$ descends to $X$.
Since dlt, the property in (2), and log smooth are local properties, we may work over a neighborhood of a generic point $$ of an lc center of $(X,B,)$ (2)$$ (1) immediately becomes obvious, so we only need to prove (1)$$ (2).
By Definition [defn: dlt], there exists a neighborhood $V$ of $$ such that $(V,B|_V)$ is log smooth and $$ is an lc center of $(V,B|_V)$. Since $(V,B|_V)$ is log smooth, $_X|_V$ is $$-Cartier. We let $^V:=|_V$ be the restricted $$-divisor of $$ on $V$, then $^V$ is nef$/X$ and $^V_V=_X|_V$. Suppose that $h: V'arrow V$ is a resolution of $V$ such that $^V$ descends to $V'$ and there exists a prime divisor $E$ on $V'$ such that $_VE=$ and $E$ is an lc place of $(V,B|_V)$. By the negativity lemma,
$$^V_V'=h^*^V_V-F$$
for some $F 0$, such that either $F=0$ over $$ or $ F= h^-1()$. Since $(X,B,)$ is lc, $(V,B|_V,^V)$ is lc. Thus $F=0$ over $$. Possibly shrinking $V$, we may assume that $$ descends to $V$. The lemma follows.
Lemma [lem: equi def dlt 1] implies the following result:
[Dlt modification, [Theorem 2.9]FS23]
Let $(X,B,)/U$ be a g-pair. Then there exists a birational morphism $f: Yarrow X$ satisfying the following. Let $E_1,,E_n$ be the prime $f$-exceptional divisors and $B_Y:=f^-1_*(B B)+_i=1^nE_i$, then:
- $(Y,B_Y,)$ is $$-factorial dlt.
- $a(E_i,X,B,) 0$ for any $i$.
In particular, if $(X,B,)$ is lc, then $a(E_i,X,B,)=0$ for any $i$, and $$K_Y+B_Y+_Y=f^*(K_X+B+_X).$$
For any such $f$, we call $f$ a dlt modification of $(X,B,)$, and say that $(Y,B_Y,)$ is a dlt model of $(X,B,)$.
We conjecture that dlt has another equivalent definition:
Let $(X,B,)/U$ be an lc g-pair. Then $(X,B,)$ is dlt if and only if there exists a log resolution $f: Yarrow X$ of $(X, B)$ and an open subset $V X$, such that $$ descends to $Y$, $f$ is an isomorphism over $V$, and $V$ contains the generic point of any lc center of $(X,B,)$.
When $(X,B,)/U$ is NQC, Conjecture [conj: dlt has good resolution] was proven in [Theorem 6.1]Has22.
## Perturbation and MMP
Let $(X,B+A,)/U$ be a $$-factorial lc g-pair such that $X$ is klt, $A 0$ is ample$/U$, and $B 0$. Then any $(K_X+B+A+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor terminates with either a semi-good minimal model of $(X,B+A,)/U$ or a Mori fiber space of $(X,B+A,)/U$.
By [Lemma 3.4]HL22, there exists $0_ R,UB+A+_X$ such that $(X,)$ is klt. By [Corollary 1.4.2]BCHM10. any $(K_X+)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor terminates with either a Mori fiber space of $(X,)/U$ or a semi-good minimal model of $(X,)/U$. The lemma follows.
Let $(X,B,)/U$ be a $$-factorial lc g-pair such that $X$ is klt, and $A 0$ an ample$/U$ $$-divisor on $X$. Then we may run a $(K_X+B+_X)$-MMP$/U$ with scaling of $A$. Moreover, let $$(X,B,):=(X_1,B_1,) (X_2,B_2,) (X_i,B_i,)$$
be any $(K_X+B+_X)$-MMP$/U$ with scaling of $A$, and let $_i$ be the $i$-th scaling number of this MMP for each $i$, i.e.
$$_i:=\{t t 0, K_X_i+B_i+tA_i+_X_i is nef/U\},$$
where $A_i$ is the strict transform of $A$ on $X_i$ for each $i$. Then one of the followings holds:
- This MMP terminates after finitely many steps.
- $_iarrow +_i=0$.
Possibly rescaling $A$ we may assume that $K_X+B+A+_X$ is nef$/U$. We first prove that we may run this MMP by induction on $i$. Let $_0:=1$ and suppose that there is already a sequence of steps of a $(K_X+B+_X)$-MMP$/U$ with scaling of $A$
$$(X,B,):=(X_1,B_1,) (X_2,B_2,) (X_k,B_k,)$$
for some $k1$, such that $_i_i+1$ for any $i k-2$. If $K_X_k+B_k+_X_k$ is nef$/U$, then we are done, so we may assume that $K_X_k+B_k+_X_k$ is not nef$/U$. Since nef$/U$ is a closed condition, $_k>0$. By construction, $_k-1_k$.
By [Lemma 3.4]HL22, there exists a klt pair $(X,)$ such that
$$K_X+_ R,UK_X+B+_X+_k2A.$$
Possibly replacing $A$, we may assume that $(X,+(1-_k2)A)$ is lc. Then we have an induced sequence of steps of a $(K_X+)$-MMP$/U$ with scaling of $(1-_k2)A$
$$(X,):=(X_1,_1) (X_2,_2) (X_k,_k),$$
such that $K_X_k+_k$ is not nef. Let $(X_k,_k) (X_k+1,_k+1)$ be the next step of the $(K_X+)$-MMP$/U$ with scaling of $(1-_k2)A$. Then the induced birational map $X_k X_k+1$ is a step of a $(K_X+B+_X)$-MMP$/U$ with scaling of $A$.
We left to prove that if this MMP does not terminate, then $_iarrow+_i=0$. Suppose that $:=_iarrow+_i>0$. Then
is an infinite sequence of steps of a $(K_X+B+2A+_X)$-MMP$/U$, which contradicts Lemma [lem: gklt+ample terminate].
The following result seems to be missed in known literature.
Let $(X,B+A,)/U$ be a $$-factorial NQC lc g-pair such that $A 0$ is ample$/U$ and $B 0$. Then any $(K_X+B+A+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor terminates with either a semi-good minimal model of $(X,B+A,)/U$ or a Mori fiber space of $(X,B+A,)/U$.
By [Lemma A.5]LT22, possibly replacing $A$ with a general element in $|A/U|_ R$, there exists an lc pair $(X,+12A)$ such that $0 _ RB+12A+_X$. By [Theorem 1.5]HH20 and [Theorem 1.9]Bir12, any $(K_X++12A)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor terminates. Thus any $(K_X+B+A+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor terminates. The rest part of the proposition follows from [Theorem 1.3]LX23a and [Lemma 3.9(1)]HL21a.
[cf. [Lemma 2.6(3)]Gon11]
Let $X$ be a normal projective variety and $D$ a movable $$-Cartier $$-divisor on $X$ such that $_(D)=0$. Then $D 0$.
We let $f: Yarrow X$ be a resolution of $X$. Let $P_Y:=P(Y,f^*D)$ and $N_Y:=N(Y,f^*D)$ be the positive and negative part of the Nakayama-Zariski decomposition of $f^*D$ respectively, and let $P:=P(X,D)$ and $N:=N(X,D)$ be the positive and negative part of the Nakayama-Zariski decomposition of $D$ respectively. Since $D$ is movable, by [Lemma 3.7(3)]LX23a, $N=0$. By [Lemma 3.4(3)]LX23a, $f_*N_Y=N$, so $N_Y$ is exceptional$/X$. Since $_(f^*D)=_(D)=0$, by [V 2.7 Proposition(8)]Nak04, $P_Y 0$. Thus $D=f_*D_Y=f_*(P_Y+N_Y) 0.$
Let $(X,B,)$ be a projective $$-factorial lc g-pair such that $_(K_X+B+_X)=0$ and $X$ is klt. Let $A$ be an ample $$-divisor. Then we may run a $(K_X+B+_X)$-MMP with scaling of $A$, and any such MMP terminates with a model $(X',B',)$ of $(X,B,)$ such that $K_X'+B'+_X' 0$. Moreover, if $_(K_X+B+_X)=0$, then $K_X'+B'+_X'_ R0$.
By Lemma [lem: scaling number go to 0], we may run a $(K_X+B+_X)$-MMP with scaling of $A$. Let
$$(X,B,):=(X_1,B_1,) (X_2,B_2,) (X_i,B_i,)$$
be any such MMP with scaling numbers $_i_i+1$. If this MMP does not terminate, then $_iarrow+_i=0$ by Lemma [lem: scaling number go to 0]. There exists a positive integer $m$ such that $X_i X_i+1$ is a flip for any $i m$. We may denote by $_i: X_m X_i$ the induced birational contraction and $A_i$ the strict transform of $A$ on $X_i$ for any $i> m.$ Since $K_X_i+B_i+_iA_i+_X_i$ is nef for each $i$,
$$K_X_m+B_m+_X_m=_iarrow+(_i^-1)_*(K_X_i+B_i+_iA_i+_X_i)$$
is movable. Moreover, since $_(K_X+B+_X)=0$, $_(K_X_m+B_m+_X_m)=0$. By Lemma [lem: movable num 0 is 0], $K_X_m+B_m+_X_m 0$, a contradiction. Thus this MMP terminates with a model $(X',B',)$ such that $K_X'+B'+_X'$ is nef and $_(K_X'+B'+_X')=0$. By Lemma [lem: movable num 0 is 0] again, $K_X'+B'+_X' 0$. Moreover, if $_(K_X+B+_X)=0$, then $_(K_X'+B'+_X')=0$, hence $K_X'+B'+_X'_ R0$.
## Lc centers of generalized pairs
We will discuss the structure of lc centers of lc g-pairs in this section. For NQC generalized pairs, the structure of their lc centers is well-studied in [LX23a] based on the connected principle established in [Bir20,FS23] and the canonical bundle formula [Fil20,HL21b,JLX22,FS23] but little was known for the non-NQC case.
[Adjunction for generalized pairs to divisors, cf. [Definition 4.7]BZ16]
Let $(X,B,)/U$ be a g-(sub-)pair and $S$ a component of $B^=1$. Let $S^$ be the normalization of $S$. The g-(sub-)pair $(S^,B_S,^S)/U$ induced by the adjunction
$$K_S^+B_S+^S_S:=(K_X+B+_X)|_S$$
is given in the following way. Let $f: Yarrow X$ be a log resolution of $(X, B)$ such that $$ descends to $Y$, $S_Y$ the strict transform of $S$ on $Y$, and
$$K_Y+B_Y+_Y:=f^*(K_X+B+_X).$$
We define $^S:=|_S^$ and $B_S_Y:=(B_Y-S_Y)|_S_Y$. We let $f|_S_Y: S_Yarrow S^$ be the induced birational morphism and define $B_S:=(f|_S_Y)_*B_S_Y$.
[cf. [Lemma 3.18(2)]LX23b]
Let $(X,B,)/U$ be a dlt g-pair, $S$ a component of $ B$, and $(S,B_S,^S)/U$ the g-pair induced by the adjunction
$$K_S+B_S+^S_S:=(K_X+B+_X)|_S.$$
Then $(S,B_S,^S)$ is dlt. Moreover:
- Any lc center of $(S,B_S,^S)$ is an lc center of $(X,B,)$.
- Any lc center of $(X,B,)$ that is contained in $S$ is an lc center of $(S,B_S,^S)$.
By [Lemma 2.9]HL22, $(S,B_S,^S)$ is dlt.
(1) Let $f: Xarrow X$ be a log resolution of $(X, B)$ such that $$ descends to $ X$. Let $K_ X+ B+_ X:=f^*(K_X+B+_X)$ and let $ S$ be the strict transform of $S$ on $ X$, then
$f|_ S$ is a log resolution of $(S, B_S)$ such that $^S$ descends to $ S$. We have
$$f|_ S^*(K_S+B_S+^S_S)=K_ S+B_ S+^S_ S:=(K_ X+ B+_ X)|_ S.$$
Let $W_S$ be an lc center of $(S,B_S,^S)$. Then $W_S$ is the image of an lc center $W_ S$ of $( S,B_ S,^S)$ in $S$. Since $( X, B)$ is log smooth and $$ descends to $ X$, $W_ S$ is also an lc center of $( X, B,)$ which is contained in $ S$, so $W:=f(W_ S)$ is an lc center of $(X,B,)$ which is contained in $S$. It is clear that $W_S=W$ under the natural inclusion $Sarrow X$. This implies (1).
(2) Let $W$ be an lc center of $(X,B,)$ that is contained in $S$. Since $(X,B,)$ is dlt, by Lemma [lem: equi def dlt 1], possibly shrinking $X$ to a neighborhood of the generic point of $W$, we may assume that $(X,B)$ is log smooth and $$ descends to $X$. Thus $W$ is an lc center of $(X,B)$, $K_S+B_S=(K_X+B)|_S$, and $^S$ descends to $S$. Since $(X,B)$ is log smooth, $W$ is an lc center of $(S,B_S)$, hence an lc center of $(S,B_S,^S)$. This implies (2).
Let $(X,B,)/U$ be a dlt g-pair and $V$ an lc center of $(X,B,)$ such that $ V 1$. Then we may construct a dlt g-pair $(V,B_V,^V)/U$ on $V$ inductively the following way. If $V=X$ then we let $(V,B_V,^V):=(X,B,)$. Otherwise, let $S$ be a codimension $1$ lc center of $(X,B,)$ such that $V S$. By [Lemma 2.9]HL22, there exists an dlt g-pair $(S,B_S,^S)$ induced by adjunction
$$K_S+B_S+^S_S=(K_X+B+_X)|_S.$$
By Lemma [lem: inversion of adjunction gdlt], $V$ is an lc center of $(S,B_S,^S)$. By repeating this process and applying induction on dimension, we get a dlt g-pair $(V,B_V,^V)/U$ on $V$. $(V,B_V,^V)/U$ is called the dlt g-pair induced by repeatedly applying adjunction to codimension $1$ lc centers:
$$K_V+B_V+^V_V:=(K_X+B+_X)|_V.$$
An lc crepant log structure is of the form $f: (X,B,)arrow Z$, where
- $(X,B,)/Z$ is an lc g-pair,
- $K_X+B+_X_,Z0$, and
- $f$ is a contraction. In particular, $f_*_X=_Z$.
In addition, if
- [(4)] $(X,B,)$ is dlt,
then we say that $f: (X,B,)arrow Z$ is a dlt crepant log structure.
For any irreducible subvariety $W Z$, we say that $W$ is an lc center of an lc crepant log structure $f: (X,B,)arrow Z$, if there exists an lc center $W_X$ of $(X,B,)$ such that $W=f(W_X)$. For any (not necessarily closed) point $z Z$, we say that $ z$ is an lc center of $f: (X,B,)arrow Z$ if $ z$ is an lc center of $f: (X,B,)arrow Z$.
In Section [sec: cbf] below we will introduce the concept of lc-trivial fibrations. We will see that an lc crepant log structure is an lc-trivial fibration $f: (X,B,)arrow Z$ such that $B 0$ (see Definition [defn: lc trivial fibration gfq] below). We will also see that an lc center of an lc crepant log structure $f: (X,B,)arrow Z$ is indeed an lc center of the induced g-pair $(Z,B_Z,^Z)$ via the canonical bundle formula (see Theorem [thm: cbf gpair nonnqc] below).
[Standard $ P^1$-link, cf. [Definition 2.21]FS23]
Let $Xarrow U$ be a projective morphism from a normal quasi-projective variety to a variety. A standard $ P^1$-link$/U$ $f: (X,B,)arrow T$ is an lc g-pair $(X,B,)/U$ with a projective morphism $f: X T$ over $U$ satisfying the following properties.
- $K_X+B+_X_ R,T0$,
- there exists a birational morphism $X'arrow X$ such that $_X'_ R,T0$,
- $ B=D_1+D_2$, where $D_1,D_2$ are prime divisors and $f|_D_i: D_iarrow T$ are isomorphisms,
- $(X,B,)$ is plt, and
- every reduced fiber of $f$ is isomorphic to $ P^1$.
We call $D_1$ and $D_2$ the horizontal sections of $(X,B,)/T$.
[$ P^1$-link, cf. [Definition 2.23]FS23]
Let $(X,B,)/U$ be a dlt g-pair associated with a projective morphism $f: Xarrow U$, such that $K_X+B+_X_ R,Z0$. Let $Z_1$, $Z_2$ be two lc centers of $(X,B,)$. We say that $Z_1$ and $Z_2$ are directly $ P^1$-linked$/U$ if there exists an lc center $W$ of $(X,B,)$ satisfying the following.
- $Z_i W$ for each $i$.
- $f(W)=f(Z_1)=f(Z_2)$.
- Let $(W,B_W,^W)/U$ be the dlt g-pair induced by repeatedly applying adjunction to codimension $1$ lc centers
$$K_W+B_W+^W_W:=(K_X+B+_X)|_W.$$
Then there exists a standard $ P^1$-link$/U$ $h: (W',B_W',^W)arrow T$ such that $(W',B_W',^W)$ is crepant to $(W,B_W,^W)$, and $Z_1|_W'$ and $Z_2|_W'$ are the horizontal sections of $(W',B_W',^W)/T$.
We say that $Z_1$ and $Z_2$ are $ P^1$-linked$/U$ if either $Z_1=Z_2$, or there exists an integer $n 2$ and lc centers $Z_1',,Z_n'$ of $(X,B,)$, such that $Z_1'=Z_1,Z_n'=Z_2$, and $Z'_i$ and $Z'_i+1$ are directly $ P^1$-linked$/U$ for any $1 i n-1$.
The following theorem is important when characterizing the structure of lc centers of g-pairs. We emphasize that, in the following theorem, we do not require $(X,B,)$ to be NQC.
[[Theorem 3.5]Bir20; [Theorem 1.4]FS23 for the $$-coefficient case]
Let $(X,B,)/U$ be a dlt g-pair associated with a projective morphism $f: Xarrow U$, such that $K_X+B+_X_ R,U0$. Let $s U$ be a (not necessarily closed) point such that $f^-1(s)$ is connected (as a $k(s)$-scheme). Let
$$:=\{V V is an lc center of (X,B,), s f(V)\}$$
and $Z,W$ be two elements such that $Z$ is minimal in $$ with respect to the inclusion. Then there exists $Z_W$ such that $Z_W W$, and $Z$ and $Z_W$ are $ P^1$-linked$/U$. In particular, any minimal elements in $$ with respect to inclusion are $ P^1$-linked$/U$ to each other.
1. In this step, we show that the theorem holds over an \'etale neighborhood $(s' U')arrow (s U)$ such that $k(s)=k(s')$. We use induction on $ X$ and on $ U$.
If $f^-1(s) B$ is disconnected, then by [Theorem 3.5]Bir20, after an \'etale base change, there are exactly two non-trivial lc centers of $(X,B,)$ intersecting $f^-1(s)$, and they are $ P^1$-linked with each other. We are done in this case.
If $f^-1(s) B$ is connected, then we let $D_1,,D_r$ be the irreducible components of $ B$. By passing to an \'etale neighborhood of $s S$ without changing $k(s)$, we may assume that each $D_i$ has connected fiber over $s$, and every lc center of $(X,B,)$ intersects $f^-1(s)$ (cf. [Claim 4.38.1]Kol13). Possibly reordering indices, we may assume that $Z D_1$, $W D_r$, and
$$f^-1(s) D_i D_i+1=$$
for any $1 i r-1$. Let $(D_i,B_D_i,^D_i)$ be the g-pair induced by adjunction
$$K_D_i+B_D_i+^D_i_D_i:=(K_X+B+_X)|_D_i$$
for each $i$.
Let $Z_1:=Z$. For any $2 i r$, there exists an lc center $Z_i D_i-1 D_i$ in $$ such that
- $Z_i$ and $Z_i-1$ are $ P^1$-linked$/U$ with each other,
- $Z_i$ is minimal in $$, and
- $Z_i$ is an lc center of $(D_i,B_D_i,^D_i)$ and $(D_i-1,B_D_i-1,^D_i-1)$.
Suppose we have already constructed $Z_i-1$. By Lemma [lem: inversion of adjunction gdlt], $Z_i-1$ and $D_i-1 D_i$ are lc centers of $(D_i-1,B_D_i-1,^D_i-1)$, and $Z_i-1$ is minimal among all lc centers of $(D_i-1,B_D_i-1,^D_i-1)$ which dominate $s$. By induction hypothesis of $ X$ and $ U$, there exists an lc center $Z_i D_i-1 D_i$ that is minimal in among all lc centers of $(D_i-1,B_D_i-1,^D_i-1)$ which dominate $s$, and $Z_i$ and $Z_i-1$ are $ P^1$-linked with each other. By Lemma [lem: inversion of adjunction gdlt], $Z_i$ is an lc center of $(X,B,)$, is minimal in $$, and is an lc center of $(D_i,B_D_i,^D_i)$. The claim follows by induction on $i$.
of Theorem [thm: P1 link for gdlt crepant log structure] continued. By Claim [claim: p1link induction] applied to $i=r$, the theorem holds over an \'etale neighborhood $(s' U')arrow (s U)$ such that $k(s)=k(s')$ under the induction hypothesis of $ X$ and $ U$.
2. We show that the \'etale base change was not necessary and conclude the proof of the theorem. Let
$$X f Uarrow U$$
be the Stein factorization of $f$. Since $f^-1(s)$ is connected, there exists a unique pre-image $ s U$ of $s$. Let $Z_i$ be the minimal elements of $$. Since lc centers commute with \'etale base change, we see that there is a unique irreducible subvariety
$$ s V U$$
such that $ V= f(Z_i)$ for each $i$.
Let $ v$ be the generic point of $ V$. By Step 1 and induction hypothesis, the theorem holds after an \'etale base change
$$: ( v' U')arrow ( v U).$$
Since $ f$ has connected fibers, $$ induces an isomorphism of the fibers
$$: ( f')^-1( v') f^-1( v).$$
Thus $Z_i$ canonically lift to $Z_i' Z_i$ and the $ P^1$-links$/U$ between the $Z_i'$ descend
to $ P^1$-links$/U$ between the $Z_i$.
Let $f: (X,B,)arrow Z$ be an lc crepant log structure and $z Z$ a (not necessarily closed) point. Let $$_z:=\{V V is an lc center of f: (X,B,)arrow Z, z V\}.$$
Then:
- There exists a unique element $W_z$ that is minimal with respect to inclusion.
- $W$ is unibranch ([Definition 1.44]Kol13) at $z$, i.e. the completion $_z$ is irreducible.
- Any intersection of lc centers of $f: (X,B,)arrow Z$ is a union of lc centers.
By Definition-Lemma [deflem: dlt model], possibly replacing $(X,B,)$ with a dlt model, we may assume that $(X,B,)$ is dlt. Since $f$ is a contration, $f^-1(z)$ is connected. For any any element $W_z$ that is minimal with respect to inclusion, there exists an lc center $Z_W$ of $(X,B,)$ that is minimal among all lc centers whose image on $Z$ is equal to $W$ with respect to inclusion. By Theorem [thm: P1 link for gdlt crepant log structure], all such $Z_W$ are $ P^1$-linked$/Z$ to each other, hence their images on $Z$ are the same. This proves (1). (2) follows from (1) by considering every \'etale neighborhood of $z$.
For any lc centers $W_1,W_2$ on $Z$, let $z W_1 W_2$ be any point. By (1), there exists a unique element $W_z$ of $_z$. Then
$$z W_z W_1 W_2,$$
so
$$W_1 W_2=_z W_1 W_2z _z W_1 W_2W_z W_1 W_2.$$
Therefore,
$$W_1 W_2=_z W_1 W_2W_z$$
is a union of lc centers. We get (3).
Let $f: (X,B,) Z$ be a dlt crepant log structure and $Y X$ an lc center. Let
$$
f|_Y: Y_YZ_Y Z
$$
be the Stein factorization of $f|_Y$, and $(Y,B_Y,^Y)/Z$ the dlt g-pair induced by repeatedly applying adjunction to codimension $1$ lc centers
$$K_Y+B_Y+_Y^Y:=(K_X+B+_X)|_Y.$$
Then:
- $f_Y: (Y,B_Y,^Y)arrow Z_Y$ is a dlt crepant log structure.
- For any lc center $W_Y Z_Y$ of $f_Y: (Y,B_Y,^Y)arrow Z_Y$, $(W_Y)$ is an lc center of $f: (X,B,)arrow Z$.
- For any lc center $W Z$ of $f: (X,B,)arrow Z$, every irreducible component of $^-1(W)$ is an lc center of $f_Y: (Y,B_Y,^Y)arrow Z_Y$.
(1) We only need to show that $(Y,B_Y,^Y)$ is dlt, which follows from [Lemma 2.9]HL22.
(2) There exists an lc center $V_Y$ of $(Y,B_Y,^Y)$ such that $f_Y(V_Y)=W_Y$. By Lemma [lem: inversion of adjunction gdlt], $V_Y$ is also an lc center of $(X,B,)$. Thus $(W_Y)=f(V_Y)$ is an lc center of $f: (X,B,)arrow Z$.
(3) Let $z$ be the generic point of $W$. Since the question is \'etale local, possibly replacing $Z$ by an \'etale neighborhood of $z$ and replacing $Y$ with its irreducible components, we may assume that $f^-1(z) Y$ is connnected, and we only need to show that there exists an lc center $V_Y$ of $f_Y: (Y,B_Y,^Y)arrow Z_Y$ such that $f_Y(V_Y)$ is an irreducible component of $^-1(W)$.
Let $V_X$ be a minimal lc center of $(X,B,)$ which dominates $W$, i.e. $V_X$ is minimal in
$$\{V V is an lc center of (X,B,), V dominates W\}$$
with respect to inclusion. Then $f(V_X)=W$. By Theorem [thm: P1 link for gdlt crepant log structure], there exists an lc center $V_Y Y$ of $(X,B,)$ that is $ P^1$-linked$/Z$ to $V_X$. By Lemma [lem: inversion of adjunction gdlt], $V_Y$ is also an lc center of $(Y,B_Y,^Y)$. Thus $f_Y(V_Y) Z_Y$ is an lc center of $f_Y: (Y,B_Y,^Y)arrow Z_Y$. Moreover, since $V_Y$ is $ P^1$-linked$/Z$ to $V_X$, $(f|_Y)(V_Y)=f(V_X)=W$. Thus $f_Y(V_Y)$ is an irreducible component of $^-1(W)$ and we are done.
## Inversion of adjunction In this subsection, we prove the following canonical bundle formula for NQC generalized pairs:
Let $(X,B,)$ be an NQC g-pair and $S$ a component of $B^=1$. Let $S^$ be the normalization of $S$, and let $(S^,B_S,^S)/U$ be the g-pair induced by the adjunction
$$K_S^+B_S+^S_S:=(K_X+B+_X)|_S.$$
Then $(S^,B_S,^S)$ is lc if and only if $(X,B,)$ is lc near $S$.
The if part of the theorem follows from [Definition 4.7]BZ16 so we only need to prove the only if part.
First we prove the case when $(X,B,)$ is a $$-g-pair.
By Definition-Lemma [deflem: dlt model], there exists a birational morphism $f: Yarrow X$ satisfying the following. Let $E$ be the reduced $f$-exceptional divisor and $B_Y:=f^-1_*(B B)+E$, then
- $(Y,B_Y,)$ is $$-factorial dlt,
- $a(F,X,B,) 0$ for any prime $f$-exceptional divisor $F$.
We let
$$K_Y+ B_Y+_Y:=f^*(K_X+B+_X)$$
and let $S_Y$ be the strict transform of $S$ on $Y$. Let $(S_Y,B_S_Y,^S)/U$ and $(S_Y, B_S_Y,^S)/U$ be the g-pairs induced by adjunction
$$K_S_Y+B_S_Y+^S_S_Y=(K_Y+B_Y+_Y)|_S_Y$$
and
$$K_S_Y+ B_S_Y+^S_S_Y=(K_Y+ B_Y+_Y)|_S_Y$$
respectively. We let $Q:= B_Y-B_Y$.
Let $A$ be an ample divisor on $Y$ such that $K_Y+B_Y+_Y+A$ is nef. We may run a $(K_Y+B_Y+_Y)$-MMP$/X$ with scaling of $A$
$$(Y,B_Y,):=(X_0,B_0,) (X_1,B_1,) (X_n,B_n,).$$
Let $S_i,A_i,Q_i, B_i$ be the image of $S_Y,A,Q, B_Y$ on $X_i$ for each $i$, $f_i: X_iarrow X$ the induced birational morphism, and
$$_i:=\{t 0 K_X_i+B_i+tA_i+_X_i is nef/X\}$$
the scaling numbers. Then $K_X_i+ B_i+_X_i=f_i^*(K_X+B+_X)$ and $ B_i=B_i+Q_i$ for any $i$. Let
$$K_S_i+B_S_i+^S_S_i:=(K_X_i+B_i+_X_i)|_S_i$$
and
$$K_S_i+ B_S_i+^S_S_i:=(K_X_i+ B_i+_X_i)|_S_i$$
for any $i$. Then $ B_S_i=B_S_i+Q_i|_S_i$. Moreover, there exists a birational morphism $g_i: S_iarrow S$ such that
$$K_S_i+ B_S_i+^S_S_i=g_i^*(K_S+B_S+^S_S).$$
Thus $(S_i, B_S_i,^S)$ is lc. Since $(Y,B_Y,)$ is dlt, $(X_i,B_i,)$ is dlt. By Lemma [lem: inversion of adjunction gdlt], $(S_i,B_S_i,^S)$ is dlt. By Lemma [lem: inversion of adjunction gdlt], any lc center of $(X_i,B_i,)$ is an lc center of $(S_i,B_S_i,^S)$. Since all components of $Q_i$ are lc centers of $(X_i,B_i,)$ and $(S_i, B_S_i,^S)$ is lc, $ Q_i$ does not intersect $S_i$ for any $i$.
We pick a non-negative integer $m$ in the following way. If the $(K_Y+B_Y+_Y)$-MMP$/X$ terminates, then we let $m$ be the index so that $(X_m,B_m,)/X$ is a log minimal model of $(Y,B_Y,)/X$ for some non-negative integer $m$. If the $(K_Y+B_Y+_Y)$-MMP$/X$ does not terminate, then by Lemma [lem: scaling number go to 0], $_iarrow+_i=0$, so by special termination (cf. [Lemma 2.18]LX23a), we may pick a positive integer $m$, such that $S_i S_i+1$ is an isomorphism in codimension $1$ for any $i m$. We let $I 2$ be any sufficiently divisible positive integer satisfying the following.
- $IQ$ is a Weil divisor.
- $$(f_m)_*_X_m(A_m-IQ_m) (f_m)_*_X_m(A_m)$$
are contained in
$$_f_m( Q) (f_m)_*_X_m(A_m).$$
- If $(X_m,B_m,)/X$ is a log minimal model of $(Y,B_Y,)/X$ and $m 2$, then $_m-1>1I$.
- If the $(K_Y+B_Y+_Y)$-MMP$/X$ does not terminate, then $_m>1I$.
Since $S_i S_i+1$ is an isomorphism in codimension $1$ for any $i m$, for any $j m$, we have
$$(f_j)_*_X_j(A_j-IQ_j)=(f_m)_*_X_m(A_m-IQ_m).$$
Since $ Q_i$ does not intersect $S_i$ for any $i$, we have an induced homomorphism.
$$(f_i)_*_X_i(A_i-IQ_i)arrow(f_m|_S_m)_*_S_m(A_i)=(f_i|_S_i)_*_S_I(A_i)$$
which is not surjective. Therefore,
$$R^1(f_i)_*_X_i(A_i-IQ_i-S_i)=0$$
for any $i m$.
We let $l:=m$ if $(X_m,B_m,)/X$ is a log minimal model of $(Y,B_Y,)/X$, and let $l$ be the unique positive integer such that $_l-1>1I_l$ if the $(K_Y+B_Y+_Y)$-MMP$/X$ does not terminate. Then $l m$,
$$X_0 X_1 X_l$$
is also a sequence of steps of a $(K_X_0+B_0+_X_0+1IA)$-MMP$/X$ with scaling of $A$, and $$K_X_l+B_l+_X_l+1IA_l$$
is nef$/X$. Since $X_0$ is $$-factorial klt, we may pick $$0 _0_ QB_0-S_0+_X_0+1IA$$ such that $(X_0,_0)$ is klt and $(X_0,S_0+_0)$ is plt. We let $_l$ be the image of $_0$ on $X_l$, then $(X_l,S_l+_l)$ is plt, so $(X_l,_l)$ is klt. Then
$$A_l-IQ_l-S_l_ Q,XK_X_l+_l+(I-1)(K_X_l+B_l+_X_l+1IA_l),$$
so by the relative Kawamata-Viehweg vanishing [Theorem 1-2-5]KMM87, $$R^1(f_l)_*_X_l(A_l-IQ_l-S_l)=0,$$
a contradiction. We are done with the case when $(X,B,)$ is a $$-g-pair.
Now we prove the case when $(X,B,)$ is not necessarily a $$-g-pair, hence conclude the proof of the theorem. There exist real numbers $r_1,,r_c$ such that $1,r_1,,r_c$ are linearly independent over $$, $:=(r_1,,r_c) R^c$, and $$-linear functions $s_1,,s_p,t_1,,t_q$, such that
$$B=_i=1^ps_i(1,)B_i,=_i=1^qt_i(1,)_i,$$
where $B_i 0$ are distinct Weil divisors and $_i$ are nef$/X$ $$-Cartier $$-divisors. Let
$$B():=_i=1^ps_i(1,)B_i and ():=_i=1^qt_i(1,)_i,$$
for any $ R^c$.
Since the coefficients of divisors under adjunction are transformed via $$-linear functions, there are $$-linear functions $s'_1,,s'_p',t'_1,,t'_q'$, distinct Weil divisors $B_S_i 0$, and nef$/X$ $$-Cartier $$-divisors $^S_i$,
$$B_S():=_i=1^ps_i(1,)B_S,i, and ^S():=_i=1^qt_i(1,)^S_i,$$
such that
$$K_S^+B_S()+^S()_S^=(K_X+B()+()_X)|_S^$$
for any $ R^c$. Since $$(S^,B_S=B_S(),^S=^S())$$ is lc,
there exists an open neighborhood $U$ of $ R^c$ such that
$$(S^,B_S(),^S())$$
is lc for any $ U$. By the $$-g-pair case,
$$(X,B(),())$$
is lc for any $ U Q$. Thus $$(X,B=B(),=())$$
is lc by continuity of log discrepancies.
We do not need Theorem [thm: inversion of adjunction] in the rest of the paper but we expect it to be useful for future works. We remark that several alternative versions of Theorem [thm: inversion of adjunction] can be found in [Theorems 1.5, 1.6, 6.7]Fil20 but we cannot apply them directly to prove Theorem [thm: inversion of adjunction] because of the following reasons:
- All these theorems require that $(X,B,)$ is a $$-g-pair.
- [Theorems 1.5]Fil20 requires $S$ to be a minimal lc center and $S$ is projective.
- [Theorems 1.6]Fil20 requires that $X$ is projective and $(X,B,)$ is a $$-g-pair. Moreover, the potential g-pair structure constructed on $W^$ [Theorems 1.6]Fil20 is not known to be identical to the g-pair structure constructed in [Theorem 4.5]HL21b.
- [Theorem 6.7]Fil20 requires that $X$ is $$-factorial projective klt.
## Boundedness on the number of components
Let $_01$ be a positive real number, and $b_1,,b_n [_0,1]$ positive real numbers. Let $(X,B=_i=1^nb_iB_i+D,)/X$ be an lc g-pair and $x X$ a point, such that $B_i 0$ is a non-zero $$-Cartier Weil divisor for each $i$, and $D 0$. Suppose that $ x B_i$ for each $i$. Moreover, assume that one of the followings hold:
- $$ is NQC$/X$.
- There exist a klt g-pair $(X,B',')/X$.
- $_0=1$ and each $B_i$ is Cartier.
Then
$$n X- x_0.$$
When $ X=1$ the proposition is trivial, so we may assume that $ X 2$. We may also assume that $n 1$, otherwise there is nothing left to prove.
Let $B_n+1,,B_n+ X$ be general hyperplane sections on $X$ and let $b_i:=1$ when $i n+1$. Possibly replacing $x$ with $ x_i=1^ XH_i$ and $B$ with $_i=1^n+ xb_iB_i+D$, we may assume that $x$ is a closed point.
First we prove the proposition under conditions (1) or (2). Possibly adding general hyperplane sections which passes through $x$, we may assume that $x$ is an lc center of $(X,B,)$. Let $E$ be an lc place of $(X,B,)$ such that $_XE=x$.
There exists a contraction $f: Yarrow X$ of $E$, such that $-E$ is ample$/X$.
If $$ is NQC$/X$, then the claim follows from [Theorem 1.7]LX23b. Otherwise, the claim follows from [Lemma 2.11]Bir20.
of Proposition [prop: bound number of components] continued. By Claim [claim: extract divisor which is ample], there exists a contraction $f: Yarrow X$ of $E$, such that $-E$ is ample$/X$. We let $B_i,Y,D_Y,B_Y$ be the strict transforms of $B_i,D,B$ on $Y$ respectively. Since $x B_i$ for each $i$, $_EB_i>0$ for each $i$, so $B_i,Y$ is ample$/X$ for each $i$. We let $E^$ be the normalization of $E$, $^E:=|_E^$, and let
$$K_E^+B_E+^E_E^=(K_Y+B_Y+E+_Y)|_E^.$$
We let $B_i,E:=(B_i,Y|_E^)$ for each $i$. Then for any component $D_i,j$ of $B_i,E$, we have
$$_D_i,jB_E=_i,j-1+_k=1^nb_km_k,i,j+_i,jn_i,j$$
for some real number $_i,j 0$ and non-negative integers $m_k,i,j$, such that $m_i,i,j=0$. Since $(E,B_E,^E)$ is lc, $_D_i,jB_E 1$, so $$B_E_i=1^nb_iB_i,E.$$
Since $B_i,Y$ is ample$/X$, $B_i,Y|_E^$ is ample, so $B_i,E$ is big. The proposition under conditions (1) or (2) follows from [Proposition 5.1]BZ16.
Now we prove the proposition under condition (3). Let $S$ be the normalization of an irreducible component of $B_1$ such that $x S_1$, and let $(S,B_S,^S)$ be the g-pair induced by the adjunction
$$K_S+B_S+^S_S:=(K_X+B+D+_X)|_S.$$
Since $x B_i$ for each $i$, $B_i|_S=0$ for any $i 2$. Since $B_i$ is Cartier and $(S,B_S,^S)$ is lc, $B_i|_S=(B_i|_S)$ for any $i 2$, and
$$B_S_i=2^nB_i|_S.$$
Since each $B_i|_S$ is Cartier, by induction on $ X$, we have $n X$ and the proposition follows.
# Stability of generalized pairs
In this section, we discuss the stability properties of g-pairs. We will define the concepts of generically lc, Property $(*)$ BP (semi-)stable, and log stable for g-pairs, and then study the basic properties of g-pairs satisfying these properties. This section is parallel to [Section 2]ACSS21.
## Toroidal generalized pairs
[cf. [Definition 2.1]ACSS21]
Let $(X,_X,)/U$ be a g-pair. We say that $(X,_X,)$ is toroidal if $_X$ is a reduced divisor, $$ descends to $X$, and for any closed point $x X$, there exists a toric variety $X_$, a closed point $t X_$, and an isomorphism of complete local algebras
$$_x:_X,x_X_,t$$
such that the ideal of $_X$ maps to the invariant ideal of $X_ T_$, where $T_ X_$ is the maximal torus of $X_$. Any such $(X_, t)$ will be called as a local model of $(X,_X,)$ at $x X$.
Let $(X,_X,)/U$ and $(Z,_Z,^Z)/U$ be toroidal g-pairs and $f: Xarrow Z$ a surjective morphism$/U$. We say that $f: (X,,)arrow (Z,,^Z)$ is toroidal, if for every closed point $x X$, there exist a local model $(X_,t)$ of $(X,_X,)$ at $x$, a local model $(Z_,s)$ of $(Z,_Z,^Z)$ at $z:=f(x)$, and a toric morphism $g: X_ Z_$, so that the diagram of algebras commutes.
$
_X,x@->[r]^ & _X_,t
_Z,z@->[r]^@->[u] & _Z_,s@->[u]
$
Here the vertical maps are the algebra homomorphisms induced by $f$ and $g$ respectively.
[[Definition-Theorem 6.5]LLM23, [Theorem 2.2]ACSS21]
Let $X$ be a normal quasi-projective variety, $Xarrow U$ a projective morphism, $Xarrow Z$ a contraction, $B$ an $$-divisor on $X$, $$ a nef$/U$ $$-divisor on $X$, $D_1,,D_m$ prime divisors over $X$, and $D_Z,1,,D_Z,n$ prime divisors over $Z$. Then there exist a toroidal g-pair $(X',_X',)/U$, a log smooth pair $(Z',_Z')$, and a commutative diagram
$
X'@->[r]^h@->[d]_f'& X@->[d]^f
Z'@->[r]^h_Z & Z
$
satisfying the following.
- $h$ and $h_Z$ are projective birational morphisms.
- $f': (X',_X',)arrow (Z',_Z')$ is a toroidal contraction.
- $(h^-1_*B)(h)$ is contained in $_X'$.
- $X'$ has at most toric quotient singularities.
- $f'$ is equi-dimensional.
- $$ descends to $X'$.
- $X'$ is $$-factorial klt.
- The center of each $D_i$ on $X'$ and the center of each $D_Z,i$ on $Z'$ are divisors.
We call any such $f': (X',_X',)arrow (Z',_Z')$ (associated with $h$ and $h_Z$) which satisfies (1-7) an equi-dimensional model of $f: (X,B,)arrow Z$.
Possibly replacing $X$ and $Z$ with high models, we may assume that $$ descends to $X$, each $D_i$ is a divisor on $X$, and each $D_Z,i$ is a divisor on $Z$. Now the theorem follows from [Theorem 2.2]ACSS21, which in turn follows from [Theorem 2.1 and Proposition 4.4]AK00. We also refer the reader to [Theorem B.6]Hu20 for a more detailed explanation.
In Definition-Theorem [defthm: weak ss reduction], it is important to note that the contraction $Xarrow Z$ may not necessarily be over $U$. This kind of phenomenon will appear throughout the rest of the paper.
## Discrimiant and moduli parts of generalized pairs
[Birationally equivalent morphisms, cf. [Page 4, Paragraph 2]ACSS21]
Let $f: Xarrow Z$ and $f': X'arrow Z'$ be surjective morphisms between normal varieties. We say that $f$ and $f'$ are birationally equivalent if there exist birational maps $h: X X'$ and $h_Z: Z Z'$ such that $f' h=h_Z f$.
[Generically lc, cf. [2.2. Discriminant and Moduli Part]ACSS21]
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction. We say that $(X,B,)$ is generically (sub-)lc$/Z$ if $(X,B,)$ is (sub-)lc over the generic point of $Z$. Note that $f$ may not be a contraction$/U$. We remark that we will not use the notation ``GLC" for ``generically lc" as in [ACSS21] since GLC also stands for ``generalized lc" in many references.
[Crepant generalized pairs, cf. [Definition 2.3]ACSS21]
Let $(X,B,)/U$ and $(X',B',')/U$ be two g-sub-pairs and $f: Xarrow Z$, $f': X'arrow Z'$ two contractions. We say that $(X,B,)$ and $(X',B',')$ are crepant over the generic point of $Z$ if we have the following commutative diagram
$
& W@->[ld]_p@->[dr]^q &
X@.>[rr]^h@->[d]_f& & X'@->[d]^f'
Z@.>[rr]^h_Z & & Z'
$
satisfying the following. Let $$K_W+B_W+_W:=p^*(K_X+B+_X)$$ and $$K_W+B'_W+'_W:=q^*(K_X'+B'+'_X).$$ Then:
- $h$ and $h_Z$ are birational maps. In particular, $f$ and $f'$ are birationally equivalent.
- $$ and $'$ descends to $W$.
- $B_W-B'_W$ and $_W-'_W$ are vertical$/Z$.
[Discrimiant and moduli parts, cf. [Definition 2.3]ACSS21]
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction such that $(X,B,)$ is generically sub-lc$/Z$. In the following, we fix a choice of $K_X$ and a choice of $K_Z$, and suppose that for any birational morphism $g: Xarrow X$ and $g_Z: Zarrow Z$, $K_ X$ and $K_ Z$ are chosen as the Weil divisors such that $g_*K_ X=K_X$ and $(g_Z)_*K_ Z=K_Z$.
Let $f': X'arrow Z'$ be any contraction that is birationally equivalent to $f$ such that the induced birational maps $h: X' X$ and $h_Z: Z' Z$ are morphisms and $Z'$ is $$-factorial. We let
$$K_X'+B'+_X':=h^*(K_X+B+_X).$$
For any prime divisor $D$ on $Z'$, we define
$$b_D(X',B',;f):=1-\{t (X',B'+tf'^*D,) is sub-lc over the generic point of D\}.$$
Since being sub-lc is a property that is preserved under crepant transformations, $b_D(X,B,;f)$ is independent of the choices of $X'$ and $Z'$ and is also independent of $U$.
Since $(X,B,)$ is generically sub-lc$/Z$, $(X',B',)$ is generically sub-lc$/Z$, so we may define
$$B_Z':=_D is a prime divisor on Z'b_D(X,B,;f)D.$$
and $$N_X':=K_X'+B'+_X'-f'^*(K_Z'+B_Z').$$
We call $B_Z'$ and $N_X'$ the discriminant part and trace moduli part of $f': (X',B',)arrow Z'$ respectively, and call $B_Z:=(h_Z)_*B_Z'$ and $N_X:=h_*B$ the discriminant part and trace moduli part of $f: (X,B,)arrow Z$ respectively.
By construction, there exist two $$-divisors $$ on $Z$ and $$ on $X$, such that for any contraction $f'': X''arrow Z''$ that is birationally equivalent to $f$ such that the induced birational maps $h': X'' X'$ and $h_Z': Z'' Z'$ are morphisms and $Z''$ is $$-factorial, $_Z''$ is the discriminant part of $f'': (X'',B'',)arrow Z''$, and $_X''$ is the trace moduli part of $f'': (X'',B'',)arrow Z''$, where
$$K_X''+B''+_X'':=h'^*(K_X'+B'+_X').$$
We call $$ the moduli part of $f: (X,B,)arrow Z$ and $$ the discriminant $$-divisor of $f: (X,B,)arrow Z$. By construction, $$ is uniquely determined and $$ is uniquely determined for any fixed choices of $K_X$ and $K_Z$.
## BP stability of generalized pairs
[BP (semi-)stable, boundary property, cf. [Definition 2.5]ACSS21]
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction, such that $(X,B,)$ is generically sub-lc$/Z$. Let $$ be the discriminant $$-divisor of $f: (X,B,)arrow Z$.
We say that $f: (X,B,)arrow Z$ is BP stable (resp. BP semi-stable) if $K_Z+_Z$ is $$-Cartier, and for any birational morphism $h_Z: Z'arrow Z$,
$$h_Z^*(K_Z+_Z)=(resp. ) K_Z'+_Z'.$$
If $f: (X,B,)arrow Z$ is BP stable (resp. BP semi-stable), then we say that $(X,B,)$ is BP stable (resp. BP semi-stable) over $Z$.
[cf. [Remark 2.6(2)]ACSS21]
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction, such that $f: (X,B,)arrow Z$ is BP stable. Let $B_Z$ and $$ be the discriminant part and the moduli part of $f: (X,B,)arrow Z$ respectively. Then:
- $_X=K_X+B+_X-f^*(K_Z+B_Z).$
- $$ descends to $X$.
For any $f': X'arrow Z'$ that is birationally equivalent to $f$, such that the induced birational maps $h: X' X$ and $h_Z: Z' Z$ are morphisms, we have $K_Z'+B_Z'=h_Z^*(K_Z+B_Z)$. Thus
where $K_X'+B'+_X':=h^*(K_X+B+_X)$, and $B_Z'$ is the discriminant part of $f': (X',B',)arrow Z'$. The lemma immediately follows.
## Property $(*)$ generalized pairs
[cf. [Lemma 2.12]ACSS21]
Let $(X,B,)/U$ be a g-pair and $f: Xarrow Z$ a contraction. Let $d:= X$ and $m:= Z$. Let $z Z$ be a closed point, $D_1,,D_m 0$ Cartier divisors on $Z$, such that $z D_i$ for each $i$ and $(X,B+_i=1^mf^*D_i,)$ is lc over $f^-1(z)$. Then the dimension of any irreducible component of $f^-1(z)$ is $d-m$.
For any irreducible component $G$ of $f^-1(z)$, let $H_1,,H_ G$ be general very ample divisors on $X$, $V:=_i=1^ GH_i$, and $(V,B_V,^V)/U$ the g-pair induced by the adjunction $$K_V+B_V+^V_V:=(K_X+B+_X)|_V.$$ Then $(V,B_V+_i=1^mf^*D_i|_V,^V)$ is lc, $G V$ is a closed point, and $A_i:=f^*D_i|_V$ is Cartier and contains $G V$ for any $i$. By Proposition [prop: bound number of components], $m V=d- G$. Thus $ G d-m$. Therefore, the dimension of any irreducible component of $f^-1(z)$ is $ d-m$. By [Exercise II 3.22 (a)]Har77, the dimension of any irreducible component of $f^-1(z)$ is $ d-m$. The lemma immediately follows.
[Property $(*)$ generalized pairs, cf. [Definition 2.13]ACSS21]
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction. We say that $f: (X,B,)arrow Z$ satisfies Property $(*)$ if there exists a reduced divisor $_Z$ on $Z$ satisfying the following.
- $(Z,_Z)$ is log smooth. In particular, $Z$ is smooth.
- The vertical$/Z$ part $B^v$ of $B$ is equal to $f^-1(_Z)$. In particular, $B^v$ is reduced and $_Z$ is the image of $B^v$ on $Z$.
- For any closed point $z Z$ and any reduced divisor $ _Z$ on $Z$ such that $(Z,)$ is log smooth near $z$, $(X,B+f^*(-_Z),)$ is sub-lc over a neighborhood of $z$.
By (2), $_Z$ is uniquely determined by $f: (X,B,)arrow Z$. We will temporarily call $_Z$ the base divisor associated to $f: (X,B,)arrow Z$. In Lemma [lem: basic property (*) gpair] below, we will show that $_Z$ is actually the discriminant part of $f: (X,B,)arrow Z$.
[cf. [Lemma 2.14]ACSS21]
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction such that $f: (X,B,)arrow Z$ satisfies Property $(*)$. Let $_Z$ be the base divisor associated to $f: (X,B,)arrow Z$. Then:
- $(X,B,)$ is sub-lc.
- $_Z$ is the discriminant part of $f: (X,B,)arrow Z$.
- If $B 0$, then $f$ is equi-dimensional over $Z_Z$.
(1) For any closed point $z Z$, we pick $:=_Z$. By Definition [defn: property *](3), $(X,B,)$ is sub-lc over a neighborhood of $z$. Thus $(X,B,)$ is sub-lc.
(2) Let $B_Z$ be the discriminant part of $f: (X,B,)arrow Z$. Since the vertical part of $B$ coincides with $f^-1(_Z)$, $B_Z_Z$.
Let $P$ be a prime divisor on $Z$ such that $P_Z$, and let $z$ be a general closed point in $P$. Then $(Z,_Z+P)$ is log smooth at $z$. By Definition [defn: property *](3), $(X,B+f^*P,)$
is sub-lc over a neighborhood of $z$. Thus
$$\{t (X,B+tf^*P,) is sub-lc over the generic point of P\}=1,$$
so $P B_Z$. Thus $_Z=_Z B_Z$. Since $(X,B,)$ is sub-lc, $ B_Z B_Z$. This implies (2).
(3) Let $d:= X$ and $m:= Z$. Let $z Z_Z$ be a closed point, and let $_1,,_m$ be general hyperplane sections on $Z$ such that $z _i$ for any $i$. Then $(Z,_Z+_i=1^m_i)$ is log smooth at $z$. By Definition [defn: property *](3), $(X,B+_i=1^m f^*_i,)$ is lc over a neighborhood of $z$. By Lemma [lem: dimension of full lc rank], the dimension of any irreducible component of $f^-1(z)$ is $d-m$. This implies (3).
[cf. [Lemma 2.15]ACSS21]
Let $(X,B,)/U$ be a g-pair and $f: Xarrow Z$ a contraction such that $f: (X,B,)arrow Z$ satisfies Property $(*)$. Let $_Z$ be the discriminant part of $f: (X,B,)arrow Z$, and let $_Z$ be a reduced divisor on $Z$, such that $(Z,)$ is log smooth.
Consider $$ as a reduced subscheme of $Z$. Then for any irreducible stratum $V$ of $$, any irreducible component of $f^-1(V)$ is an lc center of $(X,B+f^-1(-_Z),)$.
Let $k:= Z- V$. Since $(Z,)$ is log smooth, there exist irreducible components $_1,, _k$ of $$ such that $V=_i=1^k _i$. By Definition [defn: property *](3), for any $i$ and any general closed point $z_i$, $(X,B+f^*(-_Z),)$ is sub-lc over a neighborhood of $z$. Thus any irreducible component of $f^-1(_i)$ is an lc center of $(X,B+f^*(-_Z),)$. Therefore, any irreducible component of $f^-1(V)$ is an intersection of lc centers of $(X,B+f^*(-_Z),)$. The lemma follows from Lemma [lem: intersection of lc center gpair].
[cf. [Proposition 2.16]ACSS21]
Let $(X,_X,)/U$ be a toroidal g-pair, $(Z,_Z)$ a log smooth pair, and $f: (X,_X,)arrow (Z,_Z)$ a toroidal morphism. Let $(X,B,)/U$ be a g-sub-pair such that $ B _X$, $(X,B,)$ is generically sub-lc$/Z$, and the vertical$/Z$ part of $B$ is equal to $f^-1(_Z)$. Then $f: (X,B,)arrow Z$ satisfies Property $(*)$.
Since $(X,B,)$ is generically sub-lc$/Z$, $ B _X$, and the vertical$/Z$ part of $B$ is equal to $f^-1(_Z)$, $(X,B,)$ is sub-lc. Since $$ descends to $X$, by [Proposition 2.16]ACSS21, $f: (X,B)arrow Z$ satisfies Property $(*)$. By Definition [defn: property *], $f: (X,B,)arrow Z$ satisfies Property $(*)$.
The following result indicates that we can always get Property $(*)$ g-pairs by taking equi-dimensional models.
[cf. [Proposition 2.17]ACSS21]
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction, such that $(X,B,)$ is generically sub-lc$/Z$. Let $f': (X',_X',)arrow (Z',_Z')$ be an equi-dimensional model of $f: (X,B,)arrow Z$, associated with $h: X'arrow X$ and $h_Z: Z'arrow Z$. Then there exist two $$-divisors $B'$ and $F$ on $X'$ satisfying the following.
- $ B'_X'$ and $ F_X'$.
- $F$ is vertical$/Z'$ and
$$K_X'+B'+_X'=h^*(K_X+B+_X)+F.$$
- $(X',B',)$ and $(X,B,)$ are crepant over the generic point of $Z$.
- If $(X,B,)$ is sub-lc, then $F 0$.
- If $(X,B,)$ is generically sub-lc$/Z$, then $f': (X',B',)arrow Z'$ satisfies Property $(*)$.
Possibly adding components to $_Z'$, we may assume that $_Z'$ coincides with the image of the vertical$/Z'$ part of $_X'$. We let $G:=f^-1(_Z')$ and
$$K_X'+ B'+_X':=h^*(K_X+B+_X),$$
then $G_X'$ and $ B'_X'$. We define $B'$ to be the unique $$-divisor on $X'$ satisfying the following: for any prime divisor $D$ on $X'$,
- if $D$ is not a component of $ B'$ nor $G$, then $_DB'=0$,
- if $D$ is a component of $G$, then $_DB'=1$, and
- if $D$ is a component of $ B'$ but is not a component of $G$, then $_DB'=_D B'$.
Since $G$ is the vertical$/Z'$ part of $_X'$ and
$$ B' G B'_X',$$
the vertical$/Z'$ part of $B'$ is equal to $G=f'^-1(_Z')$.
We define $F:=B'- B'$. We show that $B'$ and $F$ satisfy our requirements.
(1) holds immediately by our construction.
(2) For any component $D$ of $ F$, by construction, $_DF=0$ only if $D$ is a component of $G$. Thus $F$ is vertical$/Z'$.
(3) By (2), $(X',B',)$ and $(X,B,)$ are crepant over the generic point of $Z$.
(4) For any component $D$ of $G$, $_DF=1-_D B'$. Therefore, if $(X,B,)$ is sub-lc, then $_D B' 1$, so $_DF 0$. Thus $F 0$.
(5) Since $(X,B,)$ is sub-lc over the generic point of $Z$, $(X',B',)$ is sub-lc over the generic point of $Z$. By Proposition [prop: weak ss satisfies *], $f': (X',B',)arrow Z'$ satisfies Property $(*)$.
The following proposition shows that Property $(*)$ is preserved under any sequence of steps of an MMP.
[cf. [Proposition 2.18]ACSS21]
Let $(X,B,)/U$ be an lc g-pair and $f: Xarrow Z$ a contraction, such that $f: (X,B,)arrow Z$ satisfies Property $(*)$. Let $: (X,B,) (Y,B_Y,)$ be a sequence of steps of a $(K_X+B+_X)$-MMP$/Z$ and $f_Y: Yarrow Z$ the induced morphism. Assume that $$ is also a sequence of steps of a $(K_X+B+_X)$-MMP$/U$. Then:
- $f_Y: (Y,B_Y,)arrow Z$ satisfies Property $(*)$, and the discriminant part of $f_Y: (Y,B_Y,)arrow Z$ is equal to the discriminant part of $f: (X,B,)arrow Z$.
- For any closed point $z Z$, $^-1$ is an isomorphism near the generic point of any irreducible component of $f_Y^-1(z)$.
- If $f$ is equi-dimensional, then $f_Y$ is equi-dimensional.
Without loss of generality, we may assume that $$ is a step of a $(K_X+B+_X)$-MMP$/Z$.
(1) Let $_Z$ be the discriminant part of $f: (X,B,)arrow Z$. By definition, $(Z,_Z)$ is log smooth.
Since the vertical$/Z$ part of $B$ is equal to $f^-1(_Z)$ and $$ does not extract any divisor, the vertical$/Z$ part of $B_Y$ is equal to $ f^-1(_Z)=f_Y^-1(_Z)$.
For any reduced divisor $_Z$ on $Z$, $(X,B+f^*(-_Z),)/U$ is lc. Since $$ is a step of a $(K_X+B+_X)$-MMP$/Z$, $$ is also a step of a $(K_X+B+f^*(-_Z)+_X)$-MMP$/Z$. Thus
$$(Y,B_Y+_*f^*(-_Z)=B_Y+f_Y^*(-_Z),)$$
is lc.
Therefore, $f_Y: (Y,B_Y,)arrow Z$ satisfies Property $(*)$. By Lemma [lem: basic property (*) gpair](2), $_Z$ is the discriminant part of $f_Y: (Y,B_Y,)arrow Z$.
(2) Possibly shrinking $Z$ to a neighborhood of $z$, there exists a reduced divisor $_Z$ on $Z$, such that $(Z,)$ is log smooth and $z$ is a stratum of $$. By Lemma [lem: lcc property* pullback], any irreducible component of $f_Y^-1(z)$ is an lc center of $(Y,B_Y+f_Y^*(-_Z),)$. By Definition [defn: property *](3), $(X,B+f^*(-_Z),)$ is lc. For any irreducible component $G$ of $f^-1(z)$, let $D_G$ be an lc place of $(Y,B_Y+f_Y^*(-_Z),)$ over the generic point of $G$. Then
$$0 a(D_G,X,B+f^*(-_Z),) a(D_G,Y,B_Y+f_Y^*(-_Z),)=0.$$
Thus
$$a(D_G,X,B+f^*(-_Z),)=a(D_G,Y,B_Y+f_Y^*(-_Z)=0,$$
so $^-1$ is an isomorphism near the generic point of $G$.
(3) It immediately follows from (2).
theorem and MMP for algebraically integrable foliations
# Precise adjunction formula for algebraically integrable foliations
In this section, we will establish a precise adjunction formula for foliations that are induced by a morphism. By saying ``precise", we mean that the adjunction formulas we provide not only preserve the log canonicity of the the generalized foliated quadruple, but also give a nice characterization of the coefficients of the boundary. More precisely, in this section we will prove the following theorem under the additional assumption that $$ is induced by a contraction:
[Precise adjunction formula for generalized foliated quadruples]
Let $m$ an $n$ be two non-negative integers, and $b_1,,b_m,r_1,,r_n$ non-negative real numbers. Let $(X,,B,)/U$ be a generalized foliated quadruple such that $$ is algebraically integrable. Let $S,B_1,,B_m$ be distinct prime divisors on $X$, and let $_1,,_n$ be nef$/U$ $$-Cartier $$-divisors on $X$. Suppose that
$$B=_(S)S+_j=1^mb_jB_j and =_k=1^n r_k_k.$$
Let $S^ S$ the normalization of $S$, $_S$ the restricted foliation of $$ on $S^$ (see Definition [defn: restricted foliation]), and $_k^S:=_k|_S^$ for any $k$. Then there exist prime divisors $T_1,,T_l,C_1,,C_q$ on $S^$, positive integers $w_1,,w_q$, and non-negative integers $\{w_i,j\}_1 i q,1 j m$ and $\{v_i,k\}_1 i q, 1 k n$, such that for any real numbers $b_1',,b_m'$ and $r_1',,r_n'$, we have the following.
Let $B':=_(S)S+_j=1^mb_j'B_j$ and $':=_k=1^nr_k'_k$. Then:
- $$K__S+B'_S+'^S_S^=(K_+B'+'_X)|_S^,$$
where
$$B'_S:=_i=1^lT_i+_i=1^q_i-1+_j=1^mw_i,jb_j'+_k=1^nv_i,kr_k'w_iC_i$$
and
$$'^S:=_k=1^nr_k'_k^S='|_S^.$$
- If $(X,,B',')$ is lc near $S$, then $(S^,_S,B'_S,'^S)$ is lc.
The complete proof of Theorem [thm: precise adj gfq] will be provided in Section [sec: cone] as a consequence of the cone theorem and the existence of ACSS modifications.
## Preliminaries for algebraically integrable foliations
In this subsection, we recall some basic knowledge of the theory of algebraically integrable foliations that will be used in the rest part of the paper.
[Algebraically integrable foliations, cf. [3.1]ACSS21]
Let $X$ be a normal quasi-projective variety and $$ a foliation on $X$. We say that $$ is an algebraically integrable foliation if there exists a dominant map $f: X Y$ to a quasi-projective variety $Y$ such that $=f^-1_Y$, where $_Y$ is a foliation by points. In this case, we say that $$ is induced by $f$.
[Transverse]
Let $X$ be a normal variety, $$ a foliation on $X$, and $V X$ a subvariety. For any point $x V$, we say that $V$ is transverse to $$ at $x$ if $x(X)()(V)$, and for any analytic neighborhood $U$ of $x$, $T_V|_Uarrow T_X|_U$ does not factor through $T_|_U$. We say that $V$ is everywhere transverse to $$ if $V$ is transverse to $$ at $x$ for any $x V$ (in particular, $V$ is smooth and $V$ does not intersect $(X)$ or $()$). We say that $V$ is generically transverse to $$ if $V$ is transverse to $$ at the generic point $_V$ of $V$.
[Tangent, cf. [Section 3.4]ACSS21]
Let $X$ be a normal variety, $$ a foliation on $X$, and $V X$ a subvariety. Suppose that $$ is a foliation induced by a dominant rational map $X Z$. We say that $V$ is tangent to $$ if there exists a birational morphism $: X'arrow X$, an equi-dimensional contraction $f': X'arrow Z$, and a subvariety $V' X'$, such that
- $^-1$ is induced by $f'$, and
- $V'$ is contained in a fiber of $f'$ and $(V')=V$.
[Tangency of general fibers]
Let $X$ be a normal variety, $$ a foliation on $X$, and $f: X Z$ a dominant map. We say that the general fibers of $f$ are tangent to $$ if for any general closed point $x$ on a general fiber $F$ of $f$, the linear subspace $_x T_X,x$ determined by the inclusion $ T_X$ contains $T_F,x$.
[Restricted foliation]
Let $X$ be a normal variety, $$ a foliation on $X$, $S$ a prime divisor on $X$, and $: S^ S$ the normalization of $S$. The restricted foliation of $$ on $S^$ is defined in the following way.
- If $S$ is $$-invariant, then we let $U X$ be the largest open subset which does not contain $()(X)(S)$ and let $S':=S U$. The natural inclusion of sheaves
$$|_S'arrow T_X|_S'$$
factors through $T_S'$ over $U$, which defines a foliation $_S'$ on $S'$. $_S'$ extends to a foliation $_S$ on $S^$ (cf. [Lemma 2.2]CS23b), and we call $_S$ the restricted foliation of $$ on $S^$.
- If $S$ is not $$-invariant, then we let $U X$ be the largest open subset which does not contain $()(X)(S)$ and $S$ is transverse to $$ everywhere in $U$. We let $S':=S U$. Then natural inclusion of sheaves $$|_S'arrow T_X|_S'$$ induces an inclusion of sheaves $|_S' T_S'arrow T_S'$. Since $$ is saturated in $T_X$, $|_S' T_S'$ is saturated in $T_S'$. Since $$ is closed under the Lie bracket, $|_S' T_S'$ is closed under the Lie bracket. Thus $_S':=|_S' T_S'$ is a foliation on $S'$. $_S'$ extends to a foliation $_S$ on $S^$ (cf. [Lemma 2.2]CS23b), and we call $_S$ the restricted foliation of $$ on $S^$.
[Almost holomorphic]
Let $f: X Z$ be a dominant rational map. We say that $f$ is almost holomorphic if there exist non-empty open subsets $U X$ and $V Z$ such that $f|_U: Uarrow V$ is a morphism.
The following several results are useful when applying the canonical bundle formula and adjunction formula for algebraically integrable foliations.
[cf. [Lemma 2.7]DLM23]
Let $f: X' X$ be birational morphism between normal varieties, $$ is a foliation on $X$, and $':=f^-1$ the pullback foliation on $X'$. Then $'$ is algebraically integrable if and only if $$ is algebraically integrable.
Let $X$ be a normal quasi-projective variety, $$ a foliation on $X$, and $f: Xarrow Z$ a contraction. Suppose that the general fibers of $f$ are tangent to $$. Then there exists a foliation $_Z$ on $Z$, such that $=f^-1_Z$.
By Definition-Lemma [defthm: weak ss reduction], there exists an equi-dimensional model $f': (X',_X',)arrow (Z',_Z')$ of $f: Xarrow Z$ associated with $h: X'arrow X$ and $h_Z: Z'arrow Z$. By [Lemma 6.7]AD13, there exists a foliation $_Z'$ on $Z'$ such that $(f')^-1_Z'=h^-1$. We may let $_Z:=(h_Z)_*_Z'$.
Let $f: Xarrow Z$ be a projective surjective morphism from a normal variety to a variety and let $X$ be the Stein factorization of $f$. Let $$ be the foliation on $X$ induced by $f$. Then $$ is also induced by $$.
Let $_Z$ be the foliation by points on $Z$. Then $_Y:=^-1_Z$ is the foliation by points on $Y$. Since
$$=( )^-1_Z=^-1_Y,$$
$$ is induced by $$.
[cf. [Proposition 3.2]DLM23]
Let $$ be an algebraically integrable foliation on a normal variety $X$, $S$ a prime divisor on $X$, and $S^ S$ the normalization of $S$. Let $_S$ be the restricted foliation of $$ on $S^$. Then $_S$ is algebraically integrable and $_S=-_(S)$.
Finally, we recall the following theorem, which was essentially proven in [Theorem 1.1]CP19.
[[Theorem 3.1]LLM23,[Theorem 1.1]CP19]
Let $$ be a foliation on a normal projective variety $X$ such that $K_$ is not pseudo-effective. Then there exists an algebraically integrable foliation $$ such that $0=$.
## Foliated log resolution and adjunction formula
[cf. [ 3.2]ACSS21]
Let $(X,,B,)/U$ be a sub-gfq such that $$ is algebraically integrable. We say that $(X,,B,)$ is foliated log smooth if there exists a contraction $f: Xarrow Z$ satisfying the following.
- $X$ has at most quotient toric singularities.
- $$ is induced by $f$.
- $(X,_X)$ is toroidal for some reduced divisor $_X$ such that $ B_X$. In particular, $(X, B)$ is toroidal, and $X$ is $$-factorial klt.
- There exists a log smooth pair $(Z,_Z)$ such that $$f: (X,_X,)arrow (Z,_Z)$$ is an equi-dimensional toroidal contraction.
- $$ descends to $X$.
We say that $f: (X,_X,)arrow (Z,_Z)$ is associated with $(X,,B,)$, and also say that $f$ is associated with $(X,,B,)$. It is important to remark that $f$ may not be a contraction$/U$. In particular, $$ may not be nef$/Z$.
[cf. [Lemma 3.1]ACSS21]
Let $(X,,B,)$ be a sub-gfq such that $$ is algebraically integrable and $(X,,B,)$ is foliated log smooth. Then $(X,,B^,)$ is lc.
By [Lemma 3.1]ACSS21, $(X,,B^)$ is lc. Since $$ descends to $X$, $(X,,B^,)$ is lc.
Let $X$ be a normal quasi-projective variety, $B$ an $$-divisor on $X$, $$ a nef$/X$ $$-divisor on $X$, and $$ an algebraically integrable foliation on $X$. A foliated log resolution of $(X,,B,)$ is a birational morphism $h: X'arrow X$ such that
$$(X',':=h^-1,B':=h^-1_*B+(h),)$$
is foliated log smooth, where $(h)$ is the reduced $h$-exceptional divisor.
We remark that we do not require $K_+B+_X$ to be $$-Cartier.
Let $X$ be a normal quasi-projective variety, $B$ an $$-divisor on $X$, $$ a nef$/X$ $$-divisor on $X$, and $$ a foliation on $X$ that is induced by a dominant map $f: X Z$. Then:
- If $f$ is a contraction, then for any equi-dimensional model $f': (X',_X',)arrow (Z',_Z')$ of $f: (X,B,)arrow Z$ associated with $h: X'arrow X$ and $h_Z: Z'arrow Z$, $h$ is a foliated log resolution of $(X,,B,)$ and $h^-1$ is induced by $f'$.
- $(X,,B,)$ has a foliated log resolution.
(1) It immediately follows from the definition of equi-dimensional models.
(2) Possibly compacifying $X$ and $Z$ and applying [Lemma 2.2]CS23b, we may assume that $X$ and $Z$ are projective. Let $g: X''arrow X$ be a birational morphism such that $f g: X''arrow Z$ is a morphism, $'':=g^-1''$, and $B'':=g^-1_*B+(g)$, where $(g)$ is the reduced $g$-exceptional divisor. Possibly replacing $(X,,B,)$ with $(X',',B',)$, we may assume that $f$ is a morphism. Since $X$ and $Z$ are projective, $f$ is a projective surjective morphism. By Lemma [lem: stein induce same foliation], we may assume that $f$ is a contraction. (2) follows from (1) and Definition-Theorem [defthm: weak ss reduction].
Next, we prove a simple version adjunction formula for algebraically integrable generalized foliated quadruples. The detailed version of this formula, with specific coefficient control, will be discussed later. In particular, we cannot show that the boundary coefficient after adjunction is non-negative, so we can only get ``sub-lc" instead of ``lc".
Let $(X,,B,)/U$ be an lc gfq such that $$ is algebraically integrable. Let $S$ be a prime divisor on $X$ such that $_SB=_(S)$, $: S^ S$ the normalization of $S$, $^S:=|_S$, $_S$ the restricted foliation of $$ on $S^$, and
$$K__S+B_S+^S_S^:=(K_X+B+_X)|_S^.$$
Then $(S^,_S,B_S,^S)$ is sub-lc.
By Lemma [lem: existence foliated log resolution], there exists a foliated log resolution $h: X'arrow X$ of $(X,,B+S,)$. By Lemma [lem: foliated log smooth imply lc],
$$(X',':=h^-1, B':=(B')^',)$$ is lc. Let
$$K_'+B'+_X':=h^*(K_+B+_X),$$
and let $ B':=B'^ 0$.
Since $(X,,B,)$ is lc,
$$B'^' B' B'.$$
Therefore, $(X',', B',)$ is lc. In particular, $(X',', B')$ is lc.
Let $S':=h^-1_*S$. Then there a birational morphism $h_S: S'arrow S^$ such that $ h_S=h|_S'$. Let $_S'$ be the restricted foliation of $$ on $S'$, then $_S'=h_S^-1_S$. Let
$$K__S'+ B_S':=(K_X'+ B')|_S'$$
and
$$K__S'+B_S'+^S_S':=(K_'+B'+_X')|_S'.$$
By [Proposition 3.2]ACSS21, $(S',_S', B_S')$ is lc. Since $$ descends to $X'$, $^S$ descends to $S'$, so $(S',_S', B_S',^S)$ is lc.
Since $ B' B'$, $ B_S' B_S'$. Thus
$$(S',_S', B_S',^S)$$
is sub-lc. Since
$(S^,_S,B_S,^S)$ is sub-lc and we are done.
Finally, we recall the following definition of F-dlt.
[F-dlt]
Let $(X,,B,)/U$ be an lc gfq such that $$ is algebraically integrable. We say that $(X,,B,)$ is F-dlt if there exists a foliated log resolution $f: Yarrow X$ of $(X,,B,)$ such that $a(D,,B,)>-_(D)$ for any prime $f$-exceptional divisor $D$.
## Cutting foliations by general hyperplane sections By Theorem [thm: not precise adjunction], to prove the precise adjunction formulas, we need to control the coefficients of the boundary divisors on the restricted foliation. We achieve this by cutting the foliations using general hyperplane sections until we reach the surface case. Then, we use the structure of surface singularities to achieve our result. In this subsection, we tackle the first issue: cutting foliations by general hyperplane sections. It is important to note that general hyperplane sections for foliations behave very differently comparing to usual varieties. For example, log canonicity is often not preserved [Example 3.4]ACSS21. On the other hand, we can use the methods introduced in [Section 3.2]DLM23 to resolve this issue.
Let $X$ be a normal quasi-projective variety and $H$ a prime divisor on $X$, such that $H$ is base-point-free and is a general member of $|H|$. Let $$ be a $$-divisor on $X$ such that $$ descends to a birational model $X'$ of $X$ and $^H:=|_H$. Then $^H_H=_X|_H$.
We may assume that the induced birational map $f: X' X$ is a morphism. We let $$V:=f((_X'-f^-1_*_X)),$$
then $ X- V 2$. Since $H$ is general, $ H- (V H) 2$. Therefore, for any prime divisor $D$ on $H$ and identifying $D$ with its image in $X$, we have that $$ descends to $X$ near the generic point of $D$. The lemma follows immediately.
### Cutting by invariant hyperplane sections
First, we show that we can cut foliations by invariant base-point-free linear systems freely.
Let $(X,,B,)/U$ be a sub-gfq and $W$ a proper subvariety of $X$. Suppose that $$ is induced by a morphism $f: Xarrow Z$, $ Z>0$, and $W$ is transverse to $$. Let $H_Z Z$ be a general hyperplane section. Let $H:=f^*H_Z$, $^H:=|_H$, and
$$K__H+B_H+_H^H:=(K_+B+_X)|_H,$$
where $_H$ is the restricted foliation of $$ on $H$. Then:
- $H$ intersects $W$.
- For any component $D$ of $ B$ such that $D$ intersects $H$ and any component $C$ of $D H$, $_CB_H=_DB$.
- If $(X,,B,)$ is (sub-)lc, then $(H,_H,B_H,^H)$ is (sub-)lc.
- $_H$ is induced by $f|_H: Harrow H_Z$.
By Definition-Theorem [defthm: weak ss reduction] and Lemma [lem: existence foliated log resolution], there exists an equi-dimensional model $f': (X',_X',)arrow (Z',_Z')$ of $f: (X,B,)arrow Z$ associated with $h: X'arrow X$ and $h_Z: Z'arrow Z$, such that $h$ is a foliated log resolution of $(X,,B,)$ and $':=h^-1$ is induced by $f'$. We let $H':=h^*H$,
$$K_'+B'+_X':=h^*(K_+B+_X),$$
and
$$K__H'+B_H'+^H_H':=(K_'+B'+_X')|_H'.$$
First we show that $B_H'=B'|_H'$. Let
$$R(f'):=_D D is a prime divisor on Z'(f'^*D-f'^-1(D))$$
be the ramification divisor of $f'$, then
$$R(f')=_D_Z'(f'^*D-f^-1(D)).$$
Since $H'$ and $H_Z'$ are general, by [Proposition 3.2]AK00, $f'|_H':(H',_X'|_H',|_H')arrow (H_Z',_Z'|_H_Z')$ is an equi-dimensional toroidal contraction. Therefore, for any prime divisor $D_Z$ on $H_Z'$, $(f'|_H')^*D=f'^-1(D)$ only if $D_Z$ is a component of $_Z'|_H_Z'$. Therefore,
is the ramification divisor of $f'|_H'$ Thus
$$K_'|_H'=(K_X'/Z'-R(f'))|_H'=K_H'/H_Z'-R(f'|_H')=K__H'.$$
Since $^H_H=_X|_H$, we have $B_H'=B'|_H'$.
(1) Since $W$ is transverse to $$, $W':=h^-1(W)$ is not tangent to $'$. Thus $ g(W') 1$, so $H_Z':=h_Z^*H_Z$ intersects $g(W')$ and $H_Z$ intersects $h_Z(g(W'))=f(W)$. Hence $H$ intersects $W$.
(2) Since $H$ is general, near the generic point $_C$ of $C$, $h$ is an isomorphism. Since $B_H'=B'|_H'$, $B|_H=B_H$ near $_C$. We may write $B= b_iB_i$ where $B_i$ are the irreducible components of $B$, then
$$B_H=B|_H= b_i(B_i H)$$
near $_C$. Since $H$ is general, there exists a unique index $i$ such that $B_i H=0$ at $_C$. Then $B_i H=C$, $B_i=D$, and hence $_CB_H=b_i=_DB$.
(3) By Lemma [lem: foliated log smooth imply lc], $(X',', B':=(B')^ 0,)$ is lc. Let $K__H'+ B_H':=(K_'+ B')|_H'$. By [Proposition 3.2]ACSS21, $(H',_H', B_H')$ is lc. Since $$ descends to $X'$,
$$K__H'+ B_H'+^H_H'=(K_'+B+_X)|_H,$$
and $^H$ descends to $H'$. Thus $(H',_H', B_H',^H)$ is lc. Since $ B' B'$, $ B_H' B_H'$, so $(H',_H',B_H',^H)$ is sub-lc. Since
$$K__H'+B_H'+^H_H'=(h|_H')^*(K__H+B_H+^H_H),$$
$(H,_H,B_H,^H)$ is sub-lc.
If $(X,,B,)$ is lc, then $B 0$. By (2), $B_H 0$. Thus $(H,_H,B_H,^H)$ is lc.
(4) It immediately follows from the definition of restricted foliations and the the condition that $H_Z$ is a general hyperplane section of $Z$.
### Cutting by non-invariant hyperplanes
Next we show that, if we only consider the local property of foliations, then we can cut foliation by non-invariant hyperplane sections.
Let $f: (X,,)arrow (Z,_Z)$ be a toroidal morphism and $z Z$ a closed point. Let $$ be the foliation induced by $f$ and let $B$ be the horizontal$/Z$ part of $$. Let $H$ be a general member of a base-point-free linear system on $X$, such that $H$ dominates $Z$. Then $(X,,B+H,)$ is lc over a neighborhood of $z$.
By [Lemma 3.6]DLM23, $(X,,B+H)$ is lc over a neighborhood of $z$. Since $$ descends to $X$, $(X,,B+H,)$ is lc over a neighborhood of $z$.
Let $(X,,B,)$ be a sub-gfq and $W$ a proper subvariety of $X$. Suppose that $$ is algebraically integrable, $W$ is tangent to $$, and $ W 1$. Let $H X$ be a general hyperplane section. Let $^H:=|_H$ and $$K__H+B_H+^H_H:=(K_+B+H+_X)|_H,$$ where $_H$ is the restricted foliation of $$ on $H$. Then:
- $H$ intersects $W$.
- For any component $D$ of $ B$ such that $D$ intersects $H$ and any component $C$ of $D H$, $_CB_H=_DB$.
- If $(X,,B,)$ is (sub-)lc near $W$, then $(H,_H,B_H,^H)$ is (sub-)lc near $W|_H$.
- If $f$ is induced by a morphism $f: Xarrow Z$, then $_H$ is induced by $f|_H: Harrow Z$.
(1) is obvious.
(2) By [Proposition 3.6]Dru21, $K__H=(K_+H)|_H$, so $B_H+^H_H=B|_H+_X|_H$. We remark that [Proposition 3.6]Dru21 requires that $ 2$, but the same lines of the proof works for the case when $=1$ as well. We may write $B= b_iB_i$ where $B_i$ are the irreducible components of $B$. Since $H$ is general,
$$B_H=B|_H= b_i(B_i H),$$
and there exists a unique index $i$ such that $B_i H=0$ at the generic point of $C$. Then $B_i H=C$, $B_i=D$, and hence $_CB_H=b_i=_DB$.
(3) By Definition-Theorem [defthm: weak ss reduction] and Lemma [lem: existence foliated log resolution], there exists an equi-dimensional model $f': (X',_X',)arrow (Z,_Z)$ of $f: (X,B,)arrow Z$ associated with $h: X'arrow X$ and $h_Z: Z'arrow Z$, such that $h$ is a foliated log resolution of $(X,,B,)$ and $':=h^-1$ is induced by $f'$. We let $$K_'+B'+_X':=h^*(K_+B+_X),$$ $H':=h^*H$, $W':=h^-1(W)$, and $ B':=(B')^ 0$. We let $z$ be the image of $W'$ on $Z'$. Since $(X,,B,)$ is lc, by Lemma [lem: foliated log smooth imply lc], $(X',', B',)$ is lc. Moreover, all components of $ B'$ are horizontal$/Z$. By Lemma [lem: toroidal cut general hyperplane still lc], $(X',', B'+H',)$ is lc over a neighborhood of $z'$. In particular, $(X',', B',)$ is lc near $W'|_H'$. Let
$$K__H'+ B_H':=(K_'+ B')|_H'$$
and
$$K__H'+B_H':=(K_'+B')|_H'.$$
By [Proposition 3.2]ACSS21, $(H',_H', B_H')$ is lc near $W'|_H'$. Since $ B' B'$, $ B_H' B_H'$. Thus $(H',_H',B_H')$ is sub-lc near $W'|_H'$. Since $$ descends to $X'$, $^H$ descends to $H'$, so $(H',_H',B_H',^H)$ is sub-lc near $W'|_H'$. Since $$K__H'+B_H'+^H_H'=h|_H'^*(K__H+B_H+^H_H),$$
$(H,_H,B_H,^H)$ is sub-lc near $W|_H$.
If $(X,,B,)$ is lc, then $B 0$. By (2), $B_H 0$. Thus $(H,_H,B_H,^H)$ is lc near $W|_H$.
(4) It immediately follows from the definition of restricted foliations and the the condition that $H$ is a general hyperplane section of $X$.
## Basic properties of foliated surfaces
In this subsection, we recall some basic properties of foliated surfaces. Moreover, we introduce the concept of surface numerical gfqs and study their basic properties. This is crucial for the proof of adjunction formulas.
Let $X$ be a normal surface, $$ a foliation on $X$, and $x X$ a closed point such that $x(X)$ and $x()$. Let $v$ be a vector field generating $$ near $x$. By [Page 2, Line 17-18]Bru15, $v(x)=0$ and $(Dv)|_x$ has exactly two eigenvalues $_1$ and $_2$.
We say that $x$ is a reduced singularity of $$ if at least one of $_1$ and $_2$ is not $0$ (say, $_2$) and $_1_2 Q^+$. We say that $$ has at most reduced singularities if for any closed point $p X$, $$ is either non-singular at $p$ or $p$ is a reduced singularity of $$.
[Minimal resolution]
Let $X$ be a normal surface, $$ a foliation on $X$, $f: Yarrow X$ a projective birational morphism, and $_Y:=f^-1$.
We say that $f$ is a resolution of $$ if $Y$ is smooth and $_Y$ has at most reduced singularities. By [Sei68] (we refer to [Pages 908--912]Can04 for a detailed explanation), resolution of $$ always exists.
We say that $f$ is the minimal resolution of $$ if for any resolution $g: Warrow X$ of $$, $g$ factors through $f$, i.e. there exists a projective birational morphism $h: Warrow Y$ such that $g=f h$. By definition, the minimal resolution of $$ is unique, and by [Proposition 1.17]Che23, the minimal resolution of $$ exists.
Let $X$ be a normal surface with at most cyclic quotient singularities, $$ a foliation on $X$, and $C$ a reduced curve on $X$ such that no component of $C$ is $$-invariant. For any closed point $x X$, we define $(,C,x)$ in the following way.
- If $x (X)$, then we let $v$ be a vector field generating $$ around $x$, and $f$ a holomorphic function defining $C$ around $x$. We define
$$(,C,x):=__X,x f, v(f).$$
- If $x(X)$, then $x$ is a cyclic quotient singularity of index $r$ for some integer $r 2$. Let $: Xarrow X$ be an index $1$ cover of $X x$, $ x:=^-1(x)$, $ C:=^*C$, and $$ the foliation induced by the sheaf $^*$ near $ x$. Then $ x$ is a smooth point of $ X$, and we define
$$(,C,x):=1r(, C, x).$$
We define
$$(,C):=_x X(,C,x).$$
By [Section 2]Bru02, $(,C)$ is well-defined.
Let $X$ be a normal surface with at most cyclic quotient singularities, $$ a foliation on $X$, and $C$ a reduced curve on $X$ such that all components of $C$ are $$-invariant. For any closed point $x X$, we define $Z(,C,x)$ in the following way.
- If $x (X)$, then we let $$ be a $1$-form generating $$ around $x$, and $f$ a holomorphic function generating $C$ around $x$. Then there are uniquely determined holomorphic functions $g,h$ and a holomorphic $1$-form $$ on $X$ near $x$, such that $g=hdf+f$ and $f,h$ are coprime. We define
$$Z(,C,x):= the vanishing order of |_C at x.$$
By [Chapter 2, Page 15]Bru15, $Z(,C,x)$ is independent of the choice of $$.
- If $x C (X)$, then we define
$Z(,C,x):=0.$
We define $$Z(,C):=_x CZ(,C,x).$$
By [Section 2]Bru02, $Z(,C)$ is well-defined.
[Dual graph]
Let $n$ be a positive integer, and $C=_i=1^nC_i$ be a collection of irreducible curves contained in the non-singular locus of a normal surface $X$. We define the dual graph $(C)$ of $C$ as follows.
- The vertices $v_i=v_i(C_i)$ of $(C)$ correspond to the curves $C_i$.
- For any $i j$, the vertices $v_i$ and $v_j$ are connected by $C_i C_j$ edges.
- Each vertex $v_i$ is labeled by $w(C_i):=-C_i^2$. The integer $w(C_i)$ is called the weight of $C_i$.
For any projective birational morphism $f: Yarrow X$ between surfaces, let $E=_i=1^nE_i$ be the reduced exceptional divisor for some non-negative integer $n$. Suppose that $E$ is not contained in the non-singular locus of $Y$. Then we define $(f):=(E)$.
A surface numerical sub-gfq (surface num-sub-gfq for short) $(X,,B,)/U$ consists of a normal surface $X$, a rank $1$ foliation $$ on $X$, an $$-divisor $B$ on $X$, and a nef$/U$ $$-divisor $$. We say that $(X,,B,)$ is a surface numerical gfq (surface num-gfq for short) if $(X,,B)$ is a surface num-sub-gfq and $B 0$.
Let $(X,,B,)$ be a surface num-sub-gfq. Let $f: Yarrow X$ be a resolution of $X$ with prime $f$-exceptional divisors $E_1,,E_n$ for some non-negative integer $n$. Since $\{(E_i E_j)\}_n n$ is negative definite, the equation
$$
(E_1 E_1) & & (E_1 E_n)
& &
(E_n E_1) & & (E_n E_n)
a_1
a_n
=
-(K__Y+B_Y+_Y) E_1
-(K__Y+B_Y+_Y) E_n
$$
has a unique solution $(a_1,,a_n)$, where $_Y:=f^-1$ and $B_Y:=f^-1_*B$. For any prime divisor $E$ on $Y$, we define
$$a_,f(E,,B,):=-_E(B_Y+_i=1^n a_iE_i).$$
Let $(X,,B,)$ be a sub-gfq such that $ X=2$ and $=1$. Let $f: Yarrow X$ be a resolution of $X$ and $E$ a prime divisor on $Y$. Then $a_,f(E,,B,)=a(E,,B,)$.
If $E$ is not exceptional over $X$, then
$$a_,f(E,,B,)=-_EB=a(E,,B,)$$
and we are done. Thus we may assume that $E$ is exceptional over $X$. Let $E_1,,E_n$ be all the $f$-exceptional prime divisors and let
$$K__Y+_j=1^na_jE_j+B_Y+_Y=f^*(K_+B+_X),$$
where $_Y:=f^-1$ and $B_Y:=f^-1_*B$. Then
$$(K__Y+_j=1^na_jE_j+B_Y+_Y) E_i=0$$
for any $i$. Therefore,
$$a_,f(E_i,,B,)=-a_i=a(E_i,,B,)$$ for any $i$. Since $E=E_j$ for some $j$, $$a_,f(E,,B,)=a(E,,B,)$$ and we are done.
Let $(X,,B,)$ be a surface num-sub-gfq and $f: Yarrow X$, $f': Y'arrow X$ two resolutions of $X$. Let $E$ be a prime divisor over $X$ such that $_YE$ and $_Y'E$ are divisors. Then
$$a_,f(E,,B,)=a_,f'(E,,B,).$$
If $E$ is on $X$ then $$a_,f(E,,B,)=-_EB=a_,f'(E,,B,),$$ so we may assume that $E$ is exceptional over $X$.
Let $g: Warrow Y$ and $g': Warrow Y'$ be a common resolution, and $h: Warrow X$ the induced birational morphism. Possibly replacing $f'$ with $h$, we may assume that there exists a morphism $g: Y'arrow Y$. Let $E_i$ be the prime $f'$-exceptional divisors,
$$B_Y':=f'^-1_*B-_ia_,f'(E_i,,B,)E_i,$$
and $B_Y:=g_*B_Y'$.
Then $(K__Y'+B_Y'+_Y') E_i=0$ for any $E_i$. Since $Y$ is smooth, $K__Y+B_Y+_Y$ is $$-Cartier. By applying the negativity lemma twice, we have
$$K__Y'+B_Y'+_Y'=g^*(K__Y+B_Y+_Y).$$
Thus $(K__Y+B_Y+_Y) g_*E_i=0$ for any $E_i$, so
$$a_,f(E_i,,B,)=-_g_*E_iB_Y=_E_iB_Y'=a_,f'(E_i,,B,)$$
for any $E_i$ such that $g_*E_i=0$. In particular, $a_,f(E,,B,)=a_,f'(E,,B,)$.
Let $(X,,B)$ be a surface num-sub-gfq. We define $a(E,,B,):=a_,f(E,,B,)$ for an arbitrary resolution $f: Yarrow X$ of $X$ such that $E$ is a divisor on $Y$. Lemmas [lem: anum same as a] and [lem: anum not depend on resolution] guarantee that there is no abuse of notations.
Let $(X,,B,)$ be a surface num-gfq. We say that $(X,,B,)$ is num-lc if $a(E,,B,)-_(E)$ for any prime divisor $E$ over $X$.
Let $(X,,B,)$ be a surface num-gfq and $x X$ a closed point. Then for any prime divisor $E$ over $X x$,
$$a(E,,B,) a(E,,B),$$
and
$$a(E,,B,)=a(E,,B)$$
if and only if $$ descends to $X$ over a neighborhood of $x$. In particular, if $(X,,B,)$ is num-lc, then $(X,,B)$ is num-lc.
It follows from [Lemma 3.41]KM98.
Let $(X,,B,)$ be an lc gfq such that $ X=2$ and $=1$. Then $K_$, $_X$, and all components of $B$ are $$-Cartier.
We only need to show that $_X$ and all components of $B$ are $$-Cartier near $x$ for any closed point $x X$. If $$ is num-terminal near $x$, then by [Theorem 3.19]LMX23a, $$ is terminal near $x$, and $X$ is $$-factorial klt near $x$. Therefore, $_X$ and all components of $B$ are $$-Cartier near $x$. If $$ is not num-terminal near $x$, then by Lemma [lem: add component worse sing], $$ descends to $X$ over a neighborhood of $x$, and $(X,,B)$ is num-lc. By [Theorem 3.19]LMX23a, $x B$. In particular, $_X$ and all components of $B$ are $$-Cartier near $x$.
## Adjunction formula for surface generalized foliated quadruples In this subsection we establish the adjunction formula for surface generalized foliated quadruples based on the classification of foliated surface singularities. Depending on whether the foliation itself is terminal, we establish two adjunction formulas.
Let $(X,,B,)$ be an lc gfq such that $ X=2$, $=1$, and $B_j$ are the irreducible components of $B$. Let $C$ be an $$-invariant curve with normalization $: C^ C$. Let $x C$ be a closed point, such that $$ is not terminal near $x$. Then:
- $x B$ and $$ descends to $X$ over a neighborhood of $x$.
- For any closed point $y^-1(x)$, the vanishing order of $K_|_C^$ at $y$ is a non-negative integer.
(1) Since $$ is not terminal near $x$ and $(X,,B,)$ is lc, by Lemma [lem: r cartier b m lc gfq] and [Theorem 3.19]LMX23a, $B=0$ near $x$. By Lemma [lem: add component worse sing], $$ descends to $X$ over a neighborhood of $x$.
(2) By considering a local analytic neighborhood of $x$ and separate $C$ into different analytic irreducible components, we may assume that $y=^-1(x)$. (2) follows from [Theorem 3.19]LMX23a. More precisely, we let $h: Yarrow X$ be the minimal resolution of $$ near $x$ and let $C_Y:=h^-1_*C$, then we only need to show that
$$K_ C-K_C^=h^*K_ C_Y-K_C_Y$$
is a positive integer over a neighborhood of $x$. (2) follows by checking all cases of [Theorem 3.19]LMX23a and apply [Proposition 2.16(3)]CS20 to $C_Y$ for each case.
Let $(X,,B=_j=1^mb_jB_j,)$ be a gfq such that $ X=2$, $=1$, and $B_j$ are the irreducible components of $B$. Let $C$ be an $$-invariant curve with normalization $C^$. Let $x C$ be a closed point such that $$ is terminal near $x$, $I$ the order of the local fundamental group $_1(X x)$, and $^C:=|_C^$. Then there exists a positive integer $I$ and non-negative integers $w_1,,w_m$ satisfying the following.
- $X$ is $$-factorial klt near $x$ and $C$ is non-singular near $x$.
- $:=_x(_X|_C^-^C_C^) 0$.
- For any real numbers $b_1',,b_m'$, the vanishing order of
$$(K_+_j=1^mb_j'B_j+_X)|_C^-^C_C^$$
at $x$ is
$$-1+_j=1^mw_jb_j'I+.$$
Moreover, if $(X,,_j=1^mb_j'B_j,)$ is lc, then $$0 -1+_j=1^mw_jb_j'I+ 1.$$
- Suppose that $=_k=1^mr_k_k$ where each $_k$ is a nef$/X$ $$-Cartier $$-divisor. Let $^C_k:=_k|_C^$ for each $k$. Then there exist non-negative integers $v_1,,v_n$, such that for any real numbers $b_1',,b_m', r_1',,r_n'$, the vanishing order of
$$(K_+_j=1^mb_j'B_j+_k=1^nr_k'_i,X)|_C^-_k=1^nr_k'^C_k,C^$$
at $x$ is
$$-1+_j=1^mw_jb_j'+_k=1^nv_kr_k'I.$$
Moreover, if $(X,,_j=1^mb_j'B_j,_k=1^nr_k'_k)$ is lc, then
$$0-1+_j=1^mw_jb_j'+_k=1^nv_kr_k'I 1.$$
We note that $_X|_C^$ in (2), $$(K_+_j=1^mb_j'B_j+_X)|_C^$$ in (3), and $$(K_+_j=1^mb_j'B_j+_k=1^nr_k'_k,X)|_C^$$ in (4) may not be well-defined, but they are at least well-defined near $x$ so there is no confusion for the statements of the lemma.
(1) It follows from [Theorem 3.19]LMX23a.
Since all statements in the lemma are local near $x$, possibly shrinking $X$ to a neighborhood of $x$, in the following, we may assume that $X$ is $$-factorial klt, $$ is terminal, and $C$ is non-singular. In particular, we will identify $C$ with $C^$ in the following arguments.
(2) Let $h: Yarrow X$ be a birational morphism such that $$ descends to $Y$. Let $C_Y:=h^-1_*C$. Since $$ is nef$/X$ and $_X$ is $$-Cartier, by the negativity lemma, $h^*_X-_Y 0$. Thus
$$=_x((h|_C_Y)_*(h^*_X-_Y)|_C_Y) 0.$$
(3) Since $$ is terminal, by [Theorem 3.2]LMX23b, there exist non-negative integers $w_1,,w_m$, such that the vanishing order of $$(K_+_j=1^mb_j'B_j+_X)|_C-^C_C$$
at $x$ is
$$q:=-1+_j=1^mw_jb_j'I+$$
for any real numbers $b_1',,b_m'$. If $(X,,_j=1^mb_j'B_j,)$ is lc, then $b_j' 0$ for each $j$
and $ 0$ by (2). Thus $q 0$. By Theorem [thm: not precise adjunction], $q 1$. (3) follows.
(5) Since $_k,X$ is an integral divisor for each $k$, $I_x_k,X|_C$ is an integer. We let
$$v_k:=I(_x_k,X|_C-_x_k,C^C),$$
then each $v_k$ is an integer. Possibly replacing $Y$ with a high model, we may assume that $_k$ descends to $Y$ for each $k$. By the negativity lemma, $h^*_k,X-_k,Y 0$. Thus
$$v_k=I_x((h|_C_Y)_*(h^*_k,X-_k,Y)|_C_Y) 0,$$
so each $v_k$ is a non-negative integer. By (4), the vanishing order of
$$(K_+_j=1^mb_j'B_j+_k=1^nr_k'_k,X)|_C-_k=1^nr_k'_k,C^C$$
at $x$ is
$$l:=-1+_j=1^mw_jb_j'+_k=1^nv_kr_k'I$$
for any real numbers $b_1,,b_m',,r_1',,r_n'$.
If $(X,,_j=1^mb_j'B_j,_k=1^nr_k'_k,X)$ is lc, then $b_j' 0$ for each $j$, and $_k=1^nv_kr_k' 0$ by (2). Thus $l 0$. By Theorem [thm: not precise adjunction], $l 1$. (5) follows.
## Precise adjunction formula when the foliation is induced by a morphism
Let $(X,,B,)/U$ be an lc gfq such that $$ is induced by a contraction $Xarrow Z$. Let $S$ be a prime divisor on $X$ such that $_SB=_(S)$, $: S^ S$ the normalization of $S$, $^S:=|_S$, $_S$ the restricted foliation of $$ on $S^$, and
$$K__S+B_S+^S_S^:=(K_X+B+_X)|_S^.$$
Then $(S^,_S,B_S,^S)$ is lc.
By Theorem [thm: not precise adjunction], $(S^,_S,B_S,^S)$ is sub-lc. The rest part of Theorem [thm: adjunction foliation nonnqc] is only about the coefficients of divisors on $S^$, which is a codimension $2$ property on $X$. Since $$ is induced by a contraction $Xarrow Z$, by Propositions [prop: general hyperplane invariant] and [prop: general hyperplane non-invariant], we may cut $X$ by general elements in base-point-free linear systems and assume that $ X=2$.
If $=0$, then since $(X,,B,)$ is lc, $B=0$ and $$ descends to $X$, and the theorem is trivial. If $=2$ then the theorem follows from [Definition 4.7]BZ16. Thus we may assume that $=1$.
Let $_S$ be the restricted foliation of $$ on $S^$. If $S$ is not $$-invariant, then $_S$ is a foliation by points. By Lemma [lem: r cartier b m lc gfq], $K_+S+B$ is $$-Cartier. By [Proposition 3.4]Spi20, there exists an $$-divisor $B_S 0$ on $S^$ such that
$$(K_+S+B)|_S^=K__S+B_S.$$
By Theorem [thm: not precise adjunction], $(S^,_S,B_S)$ is lc, so $B_S=0$. The theorem follows in this case. Thus we may assume that $S$ is $$-invariant.
We only need to check the coefficient near any closed point $y$ on $S^$. Let $x$ be the image of $y$ in $S$. If $$ is terminal at $x$, then the theorem follows from Lemma [lem: surface pia terminal]. If $$ is not terminal at $x$, then the theorem follows from Lemma [lem: surface pia not terminal].
Theorem [thm: precise adj gfq] holds when $$ is induced by a contraction $Xarrow Z$.
When $$ is induced by a contraction $Xarrow Z$, Theorem [thm: precise adj gfq](2) follows from Theorem [thm: precise adj gfq](1) and Theorem [thm: adjunction foliation nonnqc], so we only need to prove Theorem [thm: precise adj gfq](1). Since Theorem [thm: precise adj gfq](1) is only about the coefficients of divisors on $S^$, which is a codimension $2$ property on $X$, by Propositions [prop: general hyperplane invariant] and [prop: general hyperplane non-invariant], we may cut $X$ by general elements in base-point-free linear systems and assume that $ X=2$.
If $=0$, then since $(X,,B,)$ is lc, $B=0$ and $$ descends to $X$, and the theorem is trivial. If $=2$ then the theorem follows from the usual precise adjunction formula for lc g-pairs [Page 306, Line 30]BZ16. Thus we may assume that $=1$.
Let $_S$ be the restricted foliation of $$ on $S^$. If $S$ is not $$-invariant, then $_S$ is a foliation by points. By Lemma [lem: r cartier b m lc gfq], $K_+S+B$ is $$-Cartier. By [Proposition 3.4]Spi20, there exists an $$-divisor $B_S 0$ on $S^$ such that
$$(K_+S)|_S^=K__S+B_S.$$
By Theorem [thm: not precise adjunction], $(S^,_S,B_S)$ is lc, so $B_S=0$. The theorem follows in this case. Thus we may assume that $S$ is $$-invariant.
We only need to check the coefficient near any closed point $y$ on $S^$. Let $x$ be the image of $y$ in $S$. If $$ is terminal at $x$, then the theorem follows from Lemma [lem: surface pia terminal]. If $$ is not terminal at $x$, then the theorem follows from Lemma [lem: surface pia not terminal].
Theorem [thm: precise adjunction when induced], even without the control on the coefficients and with $=0$, is already stronger than [Proposition 3.2]ACSS21 as the latter requires that $X$ is $$-factorial.
The complete versions of Theorem [thm: precise adj gfq] will be proven after we establish the existence of ACSS modifications in Section [sec: cone].
# Property $(*)$ and ACSS generalized foliated quadruples
In this section, we introduce the concepts of Property $(*)$ and ACSS generalized foliated quadruples and study their basic properties.
## Qdlt generalized pairs
[Qdlt]
Let $(X,B,)/U$ be an lc g-pair. We say that $(X,B,)$ is qdlt if there exists an open (possibly empty) subset $V X$ satisfying the following.
- $(V,B|_V)$ is $$-factorial toroidal. In particular, $B|_V$ is a reduced divisor.
- $V$ contains the generic point of any lc center of $(X,B,)$.
- The generic point of any lc center of $(X,B,)$ is the generic point of an lc center of $(V,B|_V)$.
Let $(X,B,)/U$ be a lc g-pair. Then the following conditions are equivalent:
- $(X,B,)$ is qdlt.
- For any lc center of $(X,B,)$ with generic point $$, near $$, $(X,B)$ is $$-factorial toroidal and $$ descends to $X$.
It is clear that (2) implies (1). Thus we only need to prove (1) implies (2).
Let $$ be the generic point of an lc center of $(X,B,)$. Since $(X,B,)$ is qdlt, there exists an open subset $V X$ which satisfies Definition [defn: qdlt]. In particular, $$ is an lc center of $(V,B|_V)$ and $_X|_V$ is $$-Cartier. We let $^V:=|_V$ be the restricted $$-divisor of $$ on $V$, then $^V$ is nef$/V$ and $^V_V=_X|_V$. Suppose that $h: V'arrow V$ is a resolution of $V$ such that $^V$ descends to $V'$, and there exists a prime divisor $E$ on $V'$ such that $_VE=$ and $E$ is an lc place of $(V,B|_V)$. By the negativity lemma,
$$^V_V'=h^*^V_V-F$$
for some $F 0$. Moreover, we have either $F=0$ over $$ or $ F= h^-1()$. Since $(X,B,)$ is lc, $(V,B|_V,^V)$ is lc. Thus $F=0$ over $$. Possibly shrinking $V$, we may assume that $$ descends to $V$. The lemma follows.
Let $(X,B,)$ be an lc g-pair and $x$ a (not necessarily closed) point of $X$ such that $ x$ is an lc center of $(X,B,)$. Let $d:= X- x$. Then the following conditions are equivalent:
- $(X,B,)$ is qdlt near $x$.
- There exist components $D_1,,D_d$ of $ B$, such that
- $K_X$ and each $D_i$ is $$-Cartier near $x$, and
- $x D_i$ for each $i$.
(1)$$(2) follows from the definition of qdlt, which in turn follows from the definition of toroidal pairs.
We prove (2)$$(1). Possibly shrinking $X$ to a neighborhood of $x$, we may assume that $(X,_i=1^dD_i)$ is a pair. Since $B_i=1^dD_i$, $(X,D)$ is lc near $x$. By [Proposition 34]dFKX17, $B=_i=1^dD_i$ near $x$, $(X,B)$ is qdlt near $x$, and $ x$ is an lc center of $(X,B)$. Since $(X,B,)$ is lc, $ x$ is an lc center of $(X,B,)$, and $(X,B,)$ is qdlt near $x$.
Let $(X,B,)$ be a qdlt g-pair and $D 0$ an $$-Cartier $$-divisor on $X$ such that $D\{B\}$. Then there exists a positive real number $$ such that $(X,B+ D,)$ is qdlt.
By the definition, $\{B\}$ does not contain any lc center of $(X,B,)$. Thus $(X,B+ D,)$ is lc for some positive real number $$. Let $:=2$, then $(X,B+ D,)$ is lc, and any lc center of $(X,B+ D,)$ is an lc center of $(X,B,)$. By the definition, $(X,B+ D,)$ is qdlt.
Let $(X,B,)/U$ be an lc g-pair and $: (X,B,) (X',B',)$ a sequence of steps of a $(K_X+B+_X)$-MMP. Suppose that $(X,B,)$ is qdlt. Then $(X',B',)$ is qdlt.
We remark here that $$ may not be an MMP$/U$ so $(X',B',)/U$ may not be a g-pair, but $(X',B',)/X'$ is a g-pair.
Let $S'$ be an lc center of $(X',B',)$ with generic point $_S'$. Let $E$ be an lc place of $(X',B',)$ such that $_X'E=S'$. Since $$ is a sequence of steps of a $(K_X+B+_X)$-MMP,
$$0 a(E,X,B,) a(E,X',B',) 0,$$
so $E$ is an lc place of $(X,B,)$, and $^-1$ is an isomorphism near $_S'$.
Let $S:=_XE$. Then near the generic point of $S$, $(X,B)$ is $$-factorial toroidal and $S$ is an lc center of $(X,B)$. Thus near the generic point of $S'$, $(X',B')$ is $$-factorial toroidal and $S'$ is an lc center of $(X',B')$. By Lemma [lem: qdlt equivalent definition], $(X',B',)$ is qdlt.
## Definition of Property $(*)$ and ACSS generalized foliated quadruples
Let $f: Xarrow Z$ be a projective morphism between normal quasi-projective varieties and $G$ an $$-divisor on $X$. We say that $G$ is super$/Z$ if either $Z$ is a point, or there exist ample Cartier divisors $H_1,,H_2 X+1$ on $Z$ such that $G_i=1^2 X+1f^*H_i.$
[Property $(*)$ gfq]
Let $(X,,B,)/U$ be a sub-gfq. Let $G 0$ be a reduced divisor on $X$ and let $f: Xarrow Z$ be a projective morphism. We say that $(X,,B,;G)/Z$ satisfies Property $(*)$ if the following conditions hold:
- $f: (X,B+G,)arrow Z$ satisfies Property $(*)$ (See Definition [defn: property *]). In particular, $$ is a contraction.
- $$ is induced by $f$.
- $G$ is an $$-invariant divisor.
If $(X,,B,;G)/Z$ satisfies Property $(*)$, then we say that $(X,,B,)$ satisfy Property $(*)$, and say that $f$, $Z$, and $G$ are associated with $(X,,B,)$.
It is clear that property $(*)$ is independent of the choice of $U$. We remark that the choice of $f$ and $G$ may not be unique. We also remark that $f$ may not be a morphism$/U$.
[ACSS gfq, cf. [Definition 4.3]DLM23]
Let $(X,,B,)/U$ be a gfq, $G 0$ a reduced divisor on $X$, and $f: Xarrow Z$ a projective morphism. We say that $(X,,B,;G)/Z$ is weak ACSS if
- $(X,,B,;G)/Z$ satisfies Property $(*)$ and $(X,,B,)$ is lc, and
- $f$ is equi-dimensional.
We say that $(X,,B,;G)/Z$ is ACSS if the following additional conditions are satisfied:
- [(3)] There exist an $$-divisor $D 0$ on $X$ and a nef$/X$ $$-divisor $$ such that
- $\{B\} D$,
- $- $ is nef$/X$ for some $>1$, and
- for any reduced divisor $ f(G)$ such that $(Z,)$ is log smooth, $$(X,B+D+G+f^*(-f(G)),)$$
is qdlt. In particular, $D+_X-_X$ is $$-Cartier,
- [(4)] For any lc center of $(X,,B,)$ with generic point $$, over a neighborhood of $,$
- $$ descends to $X$,
- $$ is the generic point of an lc center of $(X,, B)$, and
- $f: (X,B+G)arrow (Z,f(G))$ is a toroidal morphism, in particular, $(X,B)$ is toroidal and $B= B$.
If $(X,,B,;G)/Z$ is ACSS, then we say that $f$, $Z$, and $G$ are properly associated with $(X,,B,)$. If $(X,,B,;G)/Z$ is ACSS and $G$ is super$/Z$, then we say that $(X,,B,;G)/Z$ is super ACSS.
If $(X,,B,;G)/Z$ is ACSS weak ACSS (resp. ACSS, super ACSS), then we say that $(X,,B,)/Z$ and $(X,,B,)$ are weak ACSS (resp. ACSS, super ACSS).
It is possible that $(X,,B,;G)/Z$ and $(X,,B,;G')/Z$ both satisfy Property $(*)$, but $(X,,B,;G)/Z$ is ACSS while $(X,,B,;G')/Z$ is not. On the other hand, by definition, if $(X,,B,;G)/Z$ and $(X,,B,;G')/Z$ both satisfy Property $(*)$, then $(X,,B,;G)/Z$ is weak ACSS if and only if $(X,,B,;G')/Z$ is weak ACSS.
The key reason why we define the technical concept ``ACSS" is because of the following two reasons, one from the classical minimal model program point of view, and the other from the foliation point of view.
From the classical minimal model program point of view, ACSS foliated triples behave more similar to qdlt pairs than Property $(*)$ foliated triples. In fact, when $=T_X$, ``Property $(*)$" is equivalent to ``lc", while ``ACSS" is equivalent to ``qdlt".
From the foliation point of view, ACSS foliated triples are very close to F-dlt foliated triples. In fact, we will show that $$-factorial F-dlt foliated triples are always ACSS (Theorem [thm: fdlt is acss]). We conjecture that the condition ACSS is equivalent to the condition F-dlt.
Let $(X,,B,)$ be a generalized foliated quadruple. Then $(X,,B,)$ is F-dlt if and only if it is ACSS.
An interesting case of Conjecture [conj: fdlt equivalent to acss] is when $=T_X$ and $=0$, when it says that a pair $(X,B)$ is qdlt if and only there exists a log toroidal modification $f: Yarrow X$ which only extracts divisors $E$ such that $a(E,X,B)>-1$. We cannot find any literature even on this simplified version of the conjecture. In fact, the dlt version of this conjecture, which indicates that different definitions of dlt coincides, is not a trivial result, and is only proven by Szab\'o [Sza94] based on a complicated resolution lemma.
## Basic properties of Property $(*)$ and ACSS generalized foliated quadruples In this subsection, we prove several lemmas that will be very useful when applying to the minimal model program for algebraically integrable foliations.
Let $(X,,B,)/U$ be a gfq and $f: Xarrow Z$ a contraction such that $(X,,B,)/Z$ satisfies Property $(*)$ (resp. is weak ACSS). Then there exists a super$/Z$ divisor $G$ on $X$ such that if $(X,,B,;G)/Z$ satisfies Property $(*)$ (resp. is weak ACSS).
If $(X,,B,)/Z$ satisfies Property $(*)$ (resp. is weak ACSS), then there exists a divisor $G_0 0$ on $X$ such that $(X,,B,;G_0)/Z$ satisfies Property $(*)$ (resp. is weak ACSS). We let $H_1,,H_2 X+1$ be general elements of a very ample linear system on $Z$ and let $$G:=G_0+_i=1^2 X+1f^*H_i.$$
Then $(X,,B,;G)/Z$ satisfies Property $(*)$ (resp. is weak ACSS).
Assume that $(X,,B,)/U$ and $(X,,B',')/U$ are two gfqs such that $B B'$ and $-'$ is nef$/X$, and all components of $B$ are horizontal$/Z$.
Let $f: Xarrow Z$ be a contraction and $G$ a divisor on $X$ such that $(X,,B,;G)/Z$ satisfies Property $(*)$ (resp. is weak ACSS, is ACSS, is super ACSS). Then $(X,,B',';G)/Z$ satisfies Property $(*)$ (resp. is weak ACSS, is ACSS, is super ACSS).
The proof of this lemma is straightforward by checking the definitions. However, for the sake of clarity and to assist the reader, we offer a detailed proof below.
1. Suppose that $(X,,B,;G)/Z$ satisfies Property $(*)$. Since $(X,,B,;G)/Z$ satisfies Property $(*)$, we have the following:
- $f: (X,B+G,)arrow Z$ satisfies Property $(*)$. Let $_Z:=f(G)$. Then we have the following:
- $(Z,_Z)$ is log smooth.
- Since all components of $B$ are horizontal$/Z$, $G=f^-1(_Z)$. Since $B B' 0$, all components of $B'$ are horizontal$/Z$. Thus the vertical$/Z$ part of $B'+G$ is equal to $G$.
- For any closed point $z Z$ and any reduced divisor $_Z$ such that $(Z,)$ is log smooth near $z$, $(X,B+f^*(-_Z),)$ is sub-lc over a neighborhood of $z$. Since $B B'$ and $-'$ is nef$/U$. $(X,B'+f^*(-_Z),')$ is sub-lc over a neighborhood of $z$.
- $$ is induced by $f$.
- $G$ is an $$-invariant divisor.
Therefore, $f: (X,B'+G,')arrow Z$ satisfies Property $(*)$.
2. Suppose that $(X,,B,;G)/Z$ is weak ACSS. Then:
- $(X,,B,;G)/Z$ satisfies Property $(*)$ and $(X,,B,)$ is lc. By Step 1, $(X,,B',';G)/Z$ satisfies Property $(*)$. Since $B B'$ and $-'$ is nef$/U$, $(X,,B',')$ is lc.
- $f$ is equi-dimensional.
Thus $(X,,B',';G)/Z$ is weak ACSS.
3. Suppose that $(X,,B,;G)/Z$ is ACSS. Then:
- $(X,,B,;G)/Z$ is weak ACSS. By Step 2, $(X,,B',';G)/Z$ is weak ACSS.
- There exists an $$-divisor $D 0$ on $X$ and a nef$/X$ $$-divisor $$ satisfying the following. Let $D':=B-B'+D$. Then:
- $\{B\} D$. Since $B B' 0$, $\{B'\} D'$.
- $-$ is nef$/X$ for any $ 1$. Since $-'$ is nef$/U$,
$$-'=(-)+(-')$$
is nef$/X$.
- For any reduced divisor $ f(G)$ such that $(Z,)$ is log smooth,
$$(X,B+D+G+f^*(-f(G)),)=(X,B'+D'+G+f^*(-f(G)),)$$
is qdlt.
- For any lc center $W$ of $(X,,B',')$ with generic point $_W$, since $(X,,B,)$ is lc, $B B'$, and $-'$ is nef$/U$, $W$ is an lc center of $(X,,B,)$. Moreover, over a neighborhood of $_W$, $B=B'$ and $='$. Therefore, over a neighborhood of $_W$, we have the following:
- $$ descends to $X$, so $'$ descends to $X$.
- $W$ is an lc center of $(X,, B)$. Since $B=B'$, $W$ is an lc center of $(X,, B')$.
- $f: (X,B+G)arrow (Z,f(G))$ is a toroidal morphism. Since $B=B'$, $f: (X,B'+G)arrow (Z,f(G))$ is a toroidal morphism.
Thus $(X,,B',';G)/Z$ is ACSS.
4. Suppose that $(X,,B,;G)/Z$ is super ACSS. Then $G$ is super$/Z$. By Step 3, $(X,,B',';G)/Z$ is ACSS. Thus $(X,,B',';G)/Z$ is super ACSS.
Let $(X,,B,)$ be foliated log smooth gfq such that $$ is algebraically integrable, $f: (X,_X,)arrow (Z,_Z)$ a contraction associated to $(X,,B,)$, and $G$ the vertical$/Z$ part of $_X$. Then $(X,,B^,;G)/Z$ is $$-factorial ACSS, and $(X,,B^,;G')/Z$ is $$-factorial super ACSS for some $G' G$.
The proof of this lemma is straightforward by checking the definitions and applying [Proposition 3.2]AK00. However, for the sake of clarity and to assist the reader, we offer a detailed proof below.
First we show that $(X,,B^,;G)/Z$ is $$-factorial ACSS. By assumption, $X$ is $$-factorial. By Lemma [lem: acss smaller coefficient], we only need to show that $(X,,_X-G,;G)/Z$ is ACSS, and we may assume that $B=B^=_X-G$.
By Proposition [prop: weak ss satisfies *], $(X,,B,;G)/Z$ satisfies Property $(*)$. By Lemma [lem: foliated log smooth imply lc], $(X,,B,)$ is lc, so $(X,,B,;G)/Z$ is weak ACSS.
Let $D:=0$ and $:=0$. Then:
- Since $\{B\}=0$, $\{B\} D$.
- Since $$ descends to $X$, $-2$ is nef$/X$.
- For any reduced divisor $ f(G)$, by [Proposition 3.2]AK00,
$$f: (X,B+D+G+f^*(-f(G)),)arrow (Z,)$$
is toroidal.
For any lc center $W$ of $(X,,B,)$ with generic point $_W$, near $_W$, we have the following:
- $$ descends to $X$.
- Since $B= B$ and $$ descends to $X$, $W$ is an lc center of $(X,, B)$.
- Since $f: (X,B+G,)arrow (Z,f(G))$ is a toroidal morphism, $f: (X,B+G)arrow (Z,f(G))$ is a toroidal morphism.
Therefore, $(X,,B,;G)/Z$ is ACSS.
Let $H_1,, H_2 X+1$ be ample Cartier divisors on $Z$. By [Proposition 3.2]AK00, $$f: (X,_X+_i=1^2 X+1f^*H_i,)arrow (Z,_Z+_i=1^2 X+1H_i)$$ is associated with $(X,,B,)$. Thus
$$(X,,B,;G':=G+_i=1^2 X+1f^*H_i)/Z$$
is $$-factorial ACSS. Since $G'$ is super$/Z$, we are done.
Let $(X,,B,)/U$ be a sub-gfq, $D$ an $$-divisor on $X$, and $$ a $$-divisor on $X$ such that $D+_X$ is $$-Cartier and $$ descends to a birational model of $X$. Suppose that $$ is algebraically integrable. Let
$$t:=\{s s 0, +s is nef/U, and (X,,B+sD,+s)/X is sub-lc\}.$$
Then either $t=+$, or
$$t=\{s s 0, +s is nef/U, and (X,,B+sD,+s)/X is sub-lc\}.$$
Moreover, one of the following cases hold:
- $t=+$.
- $t<+$, and $+(t+)$ is not nef$/U$ for any $>0$.
- $t<+$, $+(t+_0)$ is nef$/U$ for some $_0>0$, and there exists a prime divisor $E$ over $X$, such that
$$a(E,X,,B+tD,+t)=-_(E)$$
and
$$a(E,X,,B+sD,+s)<-_(E)$$
for any $s>t$.
In particular, $(X,,B+tD)$ is -lc and $+t$ is nef$/U$ if $t<+$.
We may assume that $t<+$. Since discrepancies of divisors are preserved under crepant pullbacks, by Definition-Theorem [defthm: weak ss reduction] and Lemma [lem: existence foliated log resolution], we may assume that $$ and $$ descend to $X$ and $(X,, B D)$ is foliated log smooth. Then
$$t=\{\{s s 0, _X+s_X is nef/U\},\{s s 0, (X,,B+sD)/X is sub-lc\}\}.$$
Since nef is a closed condition,
$$\{s s 0, _X+s_X is nef/U\}=\{s s 0, _X+s_X is nef/U\} or +.$$
Thus we may assume that
$$t=\{s s 0, (X,,B+sD)/X is sub-lc\}<+$$
and $_X+t_X$ is nef$/U$. By Lemma [lem: foliated log smooth imply lc],
Since there are only finitely many components of $ D$ and $t<+$,
$$t=\{s 0 s l, a(E,X,,B+sD)-_(E) for any prime divisor E D\}.$$
and there exists a component $E$ of $ D$, such that $a(E,X,,B+tD)=-_(E)$ and $_ED>0$. The lemma follows.
Let $(X,,B,)/U$ be a gfq, $f: Xarrow Z$ a contraction, and $G$ a divisor on $X$, such that $(X,,B,;G)/Z$ is ACSS. Let $D$ be an $$-divisor on $X$ and $$ a $$-divisor on $X$ satisfying the following:
- $D$ and $_X$ are $$-Cartier.
- $ D\{B\}$ and $$ descends to a birational model of $X$.
- $+$ is nef$/U$, and $-$ is nef$/U$ for some $>0$.
Then there is a positive real number $$ such that $(X,,B+ D,+;G)/Z$ is ACSS for any $, [0,]$.
Possibly replacing $$ with $\{1,\}$ and then replacing $$ with $$, we may assume that $=1$ and $-$ is nef$/U$.
By assumption, $ D$ does not contain any lc center of $(X,,B,)$, and $$ descends to $X$ near the generic point of any lc center of $(X,,B,)$. Since $-$ is nef$/X$ and $+$ is nef$/X$, near the generic point of any lc center of $(X,,B,)$, $$ is nef$/X$ and $-$ is nef$/X$. Thus $$ descends to $X$ near the generic point of any lc center of $(X,,B,)$.
Since $+$ is nef$/U$, by Lemma [lem: alg int foliation lct achieved], there exists a real number $_0 (0,1)$ such that $(X,,B+_0 D,+_0)$ is lc. Possibly replacing $_0$ with $12_0$, we may assume that $(X,,B+_0 D,+_0)$ and $(X,,B,)$ have the same lc centers.
Since $(X,,B,;G)/Z$ is ACSS, there exists an $$-divisor $D' 0$ on $X$ and a nef$/X$ $$-divisor $'$ on $X$, such that $\{B\} D'$, $'-'$ is nef$/X$ for some $'>1$, and for any $ f(G)$ such that $(Z,)$ is log smooth,
$$(X,B+D'+G+^*(-f(G)),')$$
is qdlt. Possibly replacing $'$, we may assume that $D' ('-1) D'$.
In the following, we show that
$$:=\{_0,'-12\}$$
satisfies our requirements. By Lemma [lem: acss smaller coefficient], we only need to show that $(X,,B+ D,+;G)/Z$ is ACSS.
- (Definition [defn: ACSS f-triple](3.a)) Since
$$ D\{B\} D',$$
we have
$$D'- D 2 D'- D=( D'- D)+ D' D',$$
hence
$$\{B+ D\} D'=(D'- D).$$
- (Definition [defn: ACSS f-triple](3.b)) Let $'':='1+$. Then $''>1$, and
$$'-''(+)='-'+''(-)$$
is nef$/X$.
- (Definition [defn: ACSS f-triple](3.c)) For any reduced divisor $ f(G)$ such that $(Z,)$ is log smooth,
$$(X,B+ D+(D'- D)+f^*(-f(G)),')=(X,B+D'+f^*(-f(G)),')$$
is qdlt. In particular, $(X,B+ D+f^*(-f(G)),+)$ is lc.
- (Definition [defn: ACSS f-triple](1-2)) Since $(X,,B+_0D,+_0)$ is lc, $(X,,B+ D,+ )$ is lc. Since $(X,,B,;G)/Z$ is ACSS, $(Z,_Z:=f(G))$ is log smooth, $G=f^-1(_Z)$, $B$ is horizontal$/Z$, $$ is induced by $f$, $G$ is $$-invariant, and $f$ is equi-dimensional. Since $ D\{B\}$, $B+ D$ is horizontal$/Z$, so the horizontal$/Z$ part of $B+ D+G$ is $G$.
- Definition [defn: ACSS f-triple](4)) Let $W$ be an lc center of $(X,,B+ D,+ )$. Since $(X,,B+_0 D,+_0)$ and $(X,,B,)$ have the same lc centers, $W$ is an lc center of $(X,,B,)$ and an lc center of $(X,,B+ D,+ )$. In particular, $$ descends to $X$ near the generic point of $X$ and $D=0$ near the generic point of $X$. Since $(X,,B,)$ is ACSS, near the generic point $$ of any lc center of $(X,,B+ D,+ )$,
- $+$ descends to $X$,
- $$ is the generic point of an lc center of $(X,, B)=(X,, B+ D)$, and
- $f: (X,B+G)arrow (Z,_Z)$ is a toroidal morphism, so $f: (X,B+ D+G)arrow (Z,_Z)$ is a toroidal morphism.
Finally, we recall the following proposition which shows that the numerical property of the foliated log canonical divisor and the log canonical divisor are related with each other for generalized foliated quadruples satisfying Property $(*)$.
[cf. [Proposition 3.6]ACSS21]
Let $(X,B+G,)$ be a g-sub-pair and $f: Xarrow Z$ an equi-dimensional contraction, such that $f: (X,B+G,)arrow Z$ satisfies Property $(*)$. Assume that $B$ is horizontal$/Z$ and $G$ is vertical$/Z$. Let $$ be the foliation induced by $f$ and let $$ be the moduli part of $f: (X,B+G,)arrow Z$. Then:
- $K_+B+_X _X$.
- $K_+B+_X_ZK_X+B+G+_X.$
In particular, $K_+B+_X$ is $$-Cartier.
Since $f: (X,B+G,)arrow Z$ satisfies Property $(*)$, $Z$ is smooth. Let
$$R:=_D D is a prime divisor on Z(f^*D-f^-1(D)).$$
Since $f$ is equi-dimensional, we have
$$K_=K_X/Z-R.$$
Let $B_Z$ be the discriminant part of $f: (X,B+G,)arrow Z$. By Lemma [lem: basic property (*) gpair], $B_Z$ is reduced. Since $B$ is horizontal$/Z$, $B_Z=f(G)$.
$f^*B_Z=R+G$.
We let $D$ be a prime divisor on $X$ such that $D$ is vertical$/Z$. Since $f$ is equi-dimensional, $D_Z:=f(D)$ is a divisor.
If $D_Z$ is a component of $B_Z$, then $D$ is a component of the vertical$/Z$ part of $B+G$. Since $B$ is horizontal$/Z$, $D$ is a component of $G$. Thus $_DG=1$. Therefore,
If $D_Z$ is not a component of $B_Z$, then $_Df^*B_Z=0$. Since $f(G)=B_Z$, $_DG=0$. Since $B_Z$ is the discriminant part of $f: (X,B+G,)arrow Z$,
$$1=\{t (X,B+G+tf^*D_Z,) is sub-lc over the generic point of D_Z\}.$$
Thus $f^*D_Z$ is a reduced divisor, hence $_DR=0$.
Since $f^*B_Z$ and $R+G$ are both vertical$/Z$, the claim follows.
of Proposition [prop: weak cbf gfq] continued. By Claim [claim: f*B_Z=R+G], $f^*B_Z=R+G$. Thus
(1) immediately follows. Since $Z$ is smooth and $B_Z$ is reduced, $K_Z+B_Z$ is Cartier. Thus
$$_X K_X+B+G+_X-f^*(K_Z+B_Z)_Z K_X+B+G+_X.$$
## $(*)$- models and ACSS models
Let $(X,,B,)/U$ be a gfq such that $$ is algebraically integrable. A $(*)$-modification (resp. $$-factorial $(*)$-modification, ACSS modification, super ACSS modification) of $(X,,B,)$ is a birational morphism $h: X'arrow X$ such that
- $$(X',':=h^-1,B':=h^-1_*(B B)+((h))^',)$$ is weak ACSS (resp. $$-factorial weak ACSS, ACSS, super ACSS),
- $X'$ is klt, and
- for any $h$-exceptional prime divisor $E$,
$$a(E,,B,)-_(E).$$
In particular, if $(X,,B,)$ is lc, then $a(E,,B,)=-_(E)$ for any $h$-exceptional prime divisor $E$.
We say that $(X',',B',)$ is a $(*)$-model (resp. $$-factorial $(*)$-model, ACSS model, super ACSS model) of $(X,,B,)$. Moreover, for any divisor $G$ on $X'$ and contraction $f: X'arrow Z$ such that $(X',',B',;G)/Z$ satisfies Property $(*)$ (resp. satisfies Property $(*)$, is ACSS, is super ACSS), we say that $(X',',B',;G)/Z$ is a $(*)$-model (resp. $$-factorial $(*)$-model, ACSS model, super ACSS model) of $(X,,B,)$. In addition, if
- [(4)] $D G$ for any $h$-exceptional $'$-invariant divisor,
then we say that $h: X'arrow X$ is a proper $(*)$-modification (resp. proper $$-factorial $(*)$-modification, proper ACSS modification, great ACSS modification) of $(X,,B,)$, and say that $(X',',B',)$ is a proper $(*)$-model (resp. $$-factorial proper $(*)$-model, proper ACSS model, great ACSS model) of $(X,,B,)$.
Let $(X_0,_0,B_0,)/U$ be a gfq satisfying Property $(*)$ and is associated with $Xarrow Z$ and $G$. When we say the following
$
(X_0,_0,B_0,;G_0)@-->[r]^f_0 & (X_1,_1,B_1,;G_1)@-->[r]^\ \ \ \ \ \ \ \ \ \ f_1 & @-->[r] & (X_n,_n,B_n,;G_n)@-->[r]^\ \ \ \ \ \ \ \ \ \ f_n &
$
is a (possibly infinite) sequence of steps of a $(K__0+B_0+_X_0)$-MMP$/U$, we mean the following: for any $i$, $f_i: X_i X_i+1$ is a step of a $(K__i+B_i+_X_i)$-MMP$/U$ that is not a Mori fiber space, $_i+1:=(f_i)_*_i$, $B_i+1:=(f_i)_*B_i$, and $G_i+1:=(f_i)_*G_i$.
# Cone theorem and ACSS modifications
In this section we prove the cone theorem (Theorem [thm: cone theorem gfq]) and the existence of ACSS modifications (Theorem [thm: ACSS model]). As an immediate corollary, we will prove the precise adjunction formula (Theorem [thm: precise adj gfq]) in full generality, without assuming that $$ is induced by a contraction.
## Bend and break It is important to notice that we will work under the relative setting, so the following relative bend and break theorem is crucial for our proofs.
[Relative bend and break]
Let $d$ be a positive integer, $: Xarrow U$ a contraction from a normal quasi-projective variety to a variety such that $ X- U=d$, $M,D_1,,D_d$ $$-divisors on $X$ that are nef along general fibers of $$, $B 0$ an $$-divisor on $X$, and $$ a foliation on $X$. Suppose that for any general fiber $F$ of $$,
- $(D_1|_F) (D_2|_F) (D_d|_F)=0$, and
- $-(K_+B)|_F (D_2|_F) (D_d|_F)>0$.
Then for any general closed point $x X$, there exists a rational curve $C_x$ satisfying the following.
- $x C_x$,
- $(C_x)$ is a point, and
- $D_1 C_x=0$ and
$$M C_x 2d|_F (D_2|_F) (D_d|_F)-K_|_F (D_2|_F) (D_d|_F).$$
Since (3) is a closed condition and $M$ is a limit of $$-divisors that are nef along general fibers of $$, we may assume that $M$ is a $$-divisor. Possibly replacing $M$ with a multiple, we may assume that $M$ is a Weil divisor.
We let $X^c$ and $U^c$ be compactifications of $X$ and $U$, such that $X^c$ and $U^c$ are normal projective, $X$ is a non-empty open subset of $X^c$, $U$ is a non-empty open subset of $U^c$, and there exists a contraction $^c: X^carrow U^c$ such that $^C|_X=$. Let $M^c,D^c_1,,D^c_d,B^c$ be the closures of $M,D_1,,D_d,B$ in $X^c$ respectively, and let $^c$ be the natural extension of $$ in $X^c$ [Lemma 2.2]CS23b. Then the general fibers of $^c$ are general fibers of $$, and $M^c,D^c_1,,D^c_d$ are $$-divisors that are nef along general fibers of $$. Since we only care about properties about general fibers of $$ and properties near a general closed point $x X$, we may replace $: Xarrow U$ with $^c: X^carrow U^c$, $M,D_1,,D_d,B$ with $M^c,D^c_1,,D^c_d,B^c$, and $$ with $^c$, and assume that $$ is a projective morphism between normal projective varieties.
Let $x X$ be a general closed point. Then $x$ is contained in a general fiber $F$ of $$. Let $q:= U$. Then there exist general hyperplane sections $H_1,,H_q$ with $A_i:=^*H_i$, such that $F=_i=1^q^*A_i$. Let $V_k:=X_i=1^kA_i$ and $W_k:=U_i=1^kH_i$ for each $0 k q$, then
$$F=V_q V_q-1 V_0=X$$
and
$$z:=W_q W_q-1 W_0=U,$$
where $z$ is a general closed point. We may inductively define $_k$ to be the restricted foliation of $$ on $V_k$ for each $k$, and let $_F:=_q$. We let $M_k:=M|_V_k$, $B_k:=B|_V_k$, $M_F:=M|_F$, and $B_F:=B|_F$. Then it is clear that $M_k|_F=M|_F$, $B_k|_F=B_F$ for each $k$, and $B_V_k 0$ for each $k$. Moreover, since $H_1,,H_q$ are general hyperplane sections, $M_k$ is a Weil divisor for each $k$.
There exists a rational curve $C_x$, such that $x C_x$, $(C_x)$ is a closed point, $D_1 C_x=0$, and
$$M|_F C_x2d|_F (D_2|_F) (D_d|_F)-K__k|_F (D_2|_F) (D_d|_F)$$
for each $k$.
We apply induction on $q-k$. When $q-k=0$, the existence of $C_x$ follows from [Corollary 2.28]Spi20. We will show that this $C_x$ satisfies our requirement for all $q-k$ as well. In the following, we may assume that $q>k$.
We let $_k: V_karrow W_k$ be the restricted contraction of $$ to $V_k$ for each $k$. We consider $W_k+1$ as a divisor on $W_k$ and $V_k+1$ as a divisor on $V_k$. There are two possibilities.
1. $V_k+1$ is $_k$-invariant. In this case, the general fibers of $_k$ are tangent to $_k$, so
$$K_F=K__F=K__k|_F.$$
Thus by the $q-k=0$ case,
$$M|_F C_x2d|_F (D_2|_F) (D_d|_F)-K__F (D_2|_F) (D_d|_F)=2d|_F (D_2|_F) (D_d|_F)-K__k|_F (D_2|_F) (D_d|_F).$$
2. $V_k+1$ is not $_k$-invariant. In this case, by [Proposition 3.6(1)]Dru21, we have
$$(K__k+V_k+1)|_V_k+1 K__k+1+D_k+1$$
for some $$-divisor $D_k+1 0$. We remark that [Proposition 3.6(1)]Dru21 requires that $2 X-1$, but the same lines of the proof works for the case when $=1$ as well, and the $= X$ case is the classical adjunction formula.
Since $H_k+1$ is a general hyperplane section, there exists $H_k+1' H_k+1$ such that $H_k+1'$ does not contain $z$. Thus
$$V_k+1|_F=(H_k+1|_V_k)|_F=H_k+1|_F H'_k+1|_F=0.$$
Since $H_k+2,,H_q$ are general hyperplane sections, $D_k+1|_F 0$. Therefore,
By induction hypothesis,
$$M|_F C_x2d|_F (D_2|_F) (D_d|_F)-K__k+1|_F (D_2|_F) (D_d|_F)=2d|_F (D_2|_F) (D_d|_F)-K__k|_F (D_2|_F) (D_d|_F).$$
of Lemma [thm: relative bb] continued. It immediately follows from Claim [claim: induction bend and break] by letting $k=0$.
## Inductive statements to cone theorem
Similar to [Theorems 3.9, 3.10]ACSS21, the cone theorem for generalized foliated quadruples is closely related to the existence of $(*)$-models for generalized foliated quadruples, and their proofs are done inductively. For applications to the rest of the paper as well as future works, we shall establish a much stronger version of the existence of $(*)$-models: the existence of great ACSS models with controlled extraction of divisors. This kind of model is more technically constructed, but is also more useful in practice.
[Cone theorem for induction, cf. [Theorem 3.9]ACSS21]
Let $d$ be a positive integer. Let $(X,,B,)/U$ be a gfq of dimension $d$ such that $$ is algebraically integrable. Let $\{R_j\}_j$ be the set of all $(K_+B+_X)$-negative extremal rays$/U$ that are not contained in the non-lc locus of $(X,,B,)$. Then
$$(X/U)=(X/U)_K_+B+_X 0+(X/U)_(X,,B,)+_j R_j,$$
and for any $j$, $R_j$ is exposed and is spanned by a rational curve $C_j$, such that $C_j$ is tangent to $$ and $$0<-(K_+B+_X) C_j 2d.$$
[Existence of ACSS models, cf. [Theorem 3.10]ACSS21, [Proposition 4.14]DLM23]
Let $d$ be a positive integer and $s$ a non-negative integer. Let $(X,,B,)/U$ be a gfq of dimension $d$ such that $$ is algebraically integrable, and $E_1,,E_s$ lc places of $(X,,B,)$, such that $(X,,B,)$ is lc near the generic point of $_XE_i$ for each $i$. Then $(X,,B,)$ has a great ACSS model $(Y,_Y,B_Y,)$, such that $E_1,,E_s$ are on $Y$ if $(X,,B,)$ is lc.
In the following, we will prove Theorems [thm: cone theorem induction] and [thm: property * induction] by induction on $d$. We will often use the following useful lemma:
Let $Xarrow U$ be a projective morphism from a normal quasi-projective variety to a variety and $R$ an extremal ray in $(X/U)$. Let $h: Yarrow X$ be a projective morphism such that $R$ is contained in the image of the induced map $: (Y/U)arrow(X/U)$. Then there exists an extremal ray $R_Y$ in $(Y/U)$ such that $(R_Y)=R$.
Since $R$ is contained in the image of $$, there exists a ray $R'$ in $(Y/U)$ such that $(R')=R$. Then there exist extremal rays $R_i'$ in $(S/U)$ such that $R'= a_iR_i'$ for some $a_i>0$. Thus $R= a_i(R_i')$. Since $R$ is extremal$/U$, for each $i$, either $(R_i')=R$ or $(R_i')=0$. Since $R=0$, there exists $j$ such that $(R_j')=0$. We may take $R_Y=R_j'$.
We remark that our proofs of Theorems [thm: cone theorem induction] and [thm: property * induction] generally follows from the same ideas of [Theorems 3.9, 3.10]ACSS21 but the proofs are much lengthier. This is mainly because we work in the relative setting, and include all details of the proofs. For example, we provide detailed statements when proving the exposedness of extremal rays (Propositions [prop: cone finiteness rays] and [prop: * to cone final part]), and provide a detailed statement on why a certain minimal model program can be run (Claim [claim: induction run mmp with scaling]). It is also worth to mention that we need to deal with the $$-factorial case first, and then deal with the non-$$-factorial case due to Claim [claim: induction run mmp with scaling](4).
## Cone theorem to ACSS models
In this subsection, we prove Theorem [thm: property * induction] in dimension $d$ provided that Theorem [thm: cone theorem induction] holds in dimension $ d-1$ and some $$-factorial properties are satisfied.
Let $d$ be a positive integer. Assume that Theorem [thm: cone theorem induction] holds in dimension $ d-1$.
Let $(X,,B,)/U$ be an lc gfq of dimension $d$ satisfying Property $(*)$ associated with $f: Xarrow Z$. Suppose that for any $(K_+B+_X)$-negative extremal ray$/U$ $R$, there exists a prime divisor $E$ on $X$, such that $R$ is contained in the image of $(E/U)arrow(X/U)$ and $_EB=_(E)$. Let $\{R_j\}_j$ be the set of $(K_+B+_X)$-negative extremal rays$/U$. Then:
- $$(X/U)=(X/U)_K_+B+_X 0+_j R_j.$$
- Each $R_j$ is spanned by a rational curve $C_j$, such that $C_j$ is tangent to $$ and $$0 -(K_+B+_X) C_j 2(d-1).$$
- For any curve $C_j'$ such that $[C_j'] R_i$, $C_j'$ is contracted by $f$.
- Assume that $f$ is equi-dimensional, and either $X$ is $$-factorial klt or $$ is NQC$/U$. Let $G$ be any divisor associated with $(X,,B,)/Z$. Then:
- $$ is a countable set.
- For any ample$/U$ $$-divisor $A$ on $X$, there exists a finite set $_A$, such that
$$(X/U)=(X/U)_K_+B+A+_X 0+_j_AR_j.$$
- For any $j$, there exists a contraction $_j: Xarrow X_j'$ of $R_j$, such that
- $_j$ is a contraction$/U$ as well as a contraction$/Z$, and
- if $_j$ is small, then there exists a small contraction $_j^+: X_j^+arrow X_j'$ such that the induced birational map $_j: X X_j^+$ is both a $(K_+B+_X)$-flip$/U$ and a $(K_+B+_X)$-flip$/Z$.
- For any $j$,
$$(K_+B+_X) R_j=(K_X+B+G+_X) R_j.$$
In particular,
- each $R_j$ is a $(K_X+B+G+_X)$-negative extremal ray, and
- $_j$ is a $(K_X+B+G+_X)$-negative extremal contraction, and if $_j$ is small, then $_j$ is a $(K_X+B+G+_X)$-flip.
(1) is obvious.
Pick a $(K_+B+_X)$-negative extremal ray $R$. By our assumption, there exists a prime divisor $E$ on $X$, such that $R$ is contained in the image of $(E/U)arrow(X/U)$ and $_EB=_(E)$. We let $S$ be the normalization of $E$, then there exists a natural surjection
$$(S/U)arrow(E/U).$$
Thus $R$ is contained in the image of
$$: (S/U)arrow(E/U)arrow(X/U).$$
By Lemma [lem: extremal ray under morphism], there exists an extremal ray $R_S$ in $(S/U)$ such that $R=(R_S)$.
Let $_S$ be the restricted foliation of $$ on $S$ which is algebraically integrable by Proposition [prop: a.i preserved adjunction], $^S:=|_S$, and
$$K__S+B_S+^S_S:=(K_+B+_X)|_S.$$
Then $R_S$ is a $(K_+B+_X)|_S$-negative extremal ray. By Theorem [thm: adjunction foliation nonnqc], $(S,_S,B_S,^S)/U$ is an lc gfq. Since we assume Theorem [thm: cone theorem induction] in dimension $ d-1$, $R_S$ is spanned by a rational curve $C$ such that $C$ is tangent to $_S$ and
$$0<-(K__S+B_S+^S_S) C 2(d-1).$$
We identify $C$ with its image in $X$ under the natural inclusion $Sarrow Earrow X$. Then $C$ spans $R$ and
$$0<-(K__S+B_S+^S_S) C=-(K_+B+_X) C 2(d-1).$$
Moreover, by [Lemma 3.3(4)]ACSS21, $C$ is tangent to $$ and is contracted by $f$. This implies (2).
By [Lemma 3.3(3)]ACSS21, $C$ is contained in a fiber of $f$, so $C$ is contracted by $f$. Let $C'$ be an irreducible curve on $X$ such that $[C'] R$. If $f(C')$ is not a closed point, then there exists a general ample divisor $H$ on $Z$ such that $H$ intersects $f(C')$ transversally. Thus $f^*H$ intersects $C'$ transversally, so $f^*H C'>0$. Since $C$ is contracted by $f$, $f^*H C=0$. This is not possible as $C C'$ for some positive rational number $$. Therefore, $f(C')$ is a closed point, so $C'$ is contracted by $f$.
For any curve $C''$ such that $[C''] R$, we let $C''_i$ be the irreducible components of $C''$. Since $R$ is extremal, $[C''_i] R$ for each $i$, so $C''_i$ is contracted by $f$ for each $i$. Thus $C''$ is contracted by $f$, and we get (3).
We left to prove (4). We may assume that $f$ is equi-dimensional from now on. We let $G$ be any divisor associated with $(X,,B,)/Z$. Since $(X,,B,)$ is lc, all components of $B$ are horizontal$/Z$. By Proposition [prop: weak cbf gfq],
$$
K_+B+_X_ R,ZK_X+B+G+_X.
$$
By (3), for any $j$, we have
$$(K_X+B+G+_X) R_j=(K_+B+_X) R_j<0,$$
so $R_j$ is a $(K_X+B+G+_X)$-negative extremal ray$/U$. Moreover, for any ample$/U$ $$-divisor $A$, we have
$$(K_X+B+G+A+_X) R_j=(K_+B+A+_X) R_j<0.$$
By Lemma [lem: basic property (*) gpair], $(X,B+G,)$ is lc. If $$ is NQC$/U$, then by [Theorem 1.3(3)]HL21a,
$$_A:=\{j|(K_+B+A+_X) R_j<0\}$$
is a finite set, hence $$ is a countable set. This implies (4.a) and (4.b). (4.c.i) follows from [Theorem 1.5]Xie22 (see also [Theorem 1.7]CLX23), and (4.c.ii) follows from [Theorem 1.2]LX23b.
If $X$ is $$-factorial klt, then by [Lemma 3.4]HL22, for any ample $$-divisor $A$ on $X$, there exists an $$-divisor $0_A_ RB+G+12A+_X$, such that $(X,_A)$ is klt. Thus
$$_A=\{j|(K_++12A) R_j<0\}$$
is a finite set by the classical cone theorem (cf. [Theorem 4-2-1]KMM87, [Theorem 4.5.2]Fuj17), and $=_n=1^+_1nA$ is a countable set. This implies (4.a) and (4.b). For any $j$, we take an ample $$-divisor $A$ on $X$, such that $R_j$ is also a $(K_X+B+G+A+_X)$-negative extremal ray$/U$. Then $R_j$ is a $(K_X+_A)$-negative extremal ray$/U$, so (4.c.i) follows from the classical contraction theorem (cf. [Theorem 3-2-1]KMM87, [Theorem 4.5.2]Fuj17) and (4.c.ii) follows from the the existence of flips [Corollary 1.4.1]BCHM10.
(4.d) follows immediately from (4.c) and ([equ: f=x+g])
Let $d$ be a positive integer. Assume that Theorem [thm: cone theorem induction] holds in dimension $ d-1$. Let $(X,,B,)/U$ a gfq of dimension $d$ such that $$ is algebraically integrable. Let $E_1,,E_s$ be lc places of $(X,,B,)$ and $T$ a reduced $$-invariant divisor on $X$. Further assume that
- either $X$ is $$-factorial, or
- Theorem [thm: cone theorem induction] holds for $$-factorial varieties in dimension $d$.
Then $(X,,B,)$ has a great ACSS model $(Y,_Y,B_Y,;G_Y)$ such that
- $G_Y$ contains the strict transform of $T$ on $Y$, and
- $E_1,,E_s$ are on $Y$ if $(X,,B,)$ is lc.
By Definition-Theorem [defthm: weak ss reduction] and Lemma [lem: existence foliated log resolution], there exists a foliated log resolution $h: X'arrow X$ of $(X,, B+ T,)$ such that $E_1,,E_s$ are on $X'$. Then there exists a toroidal contraction $f': (X',_X',)arrow (Z,_Z)$ such that $(Z,_Z)$ is log smooth,
$$(h)(h^-1_*B)(h^-1_*T)_X',$$
and $':=h^-1$ is induced by $f'$. We define
$$B':=h^-1_*(B B)+((h))^'.$$
By Lemma [lem: fls imply acss], $(X',',B',;G')/Z$ is $$-factorial super ACSS for some divisor $G'$, such that $G' h^-1_*T$ and any $'$-invariant $h$-exceptional divisor is contained in $G'$.
Let $A$ be an ample $$-divisor on $X$. Then we may run a $(K_'+B'+_X')$-MMP$/X$
$(X_0,_0,B_0,;G_0)@-->[r]^_0 & (X_1,_1,B_1,;G_1)@-->[r]^\ \ \ \ \ \ \ \ \ \ _1 & @-->[r] & (X_n,_n,B_n,;G_n)@-->[r]^\ \ \ \ \ \ \ \ \ \ _n &
$
where $(X_0,_0,B_0,;G_0):=(X',',B',;G')$, so that the following conditions are satisfied for each $i$. Let $A_i$ be the strict transform of $A$ on $X_i$.
- There exists an contraction $f_i: X_iarrow Z$ such that $f_i+1=f_i_i$.
- There exists an contraction $h_i: X_iarrow X$ such that $h_i+1=h_i_i$.
- $(X_i,_i,B_i,;G_i)/Z$ is $$-factorial
super ACSS.
- If $X$ is $$-factorial, then for any $(K__i+B_i+_X_i)$-negative extremal ray$/X$ $R$, there exists a prime divisor $F$ on $X_i$, such that $R$ is contained in the image of $(F/U)arrow(X/U)$ and $_FB_i=__i(F)$.
- For any extremal ray$/X$ $R$ on $X_i$ such that $R$ is either a $(K__i+B_i+_X_i)$-negative extremal ray or a $(K_X_i+B_i+G_i+_X_i)$-negative extremal ray,
- $R$ is an extremal ray$/Z$,
- $$(K__i+B_i+_X_i) R=(K_X_i+B_i+G_i+_X_i) R,$$ and
- $R$ is a $(K__i+B_i+_X_i)$-negative extremal ray if and only if $R$ is a $(K_X_i+B_i+G_i+_X_i)$-negative extremal ray.
- $_i$ is a step of a $(K_X_i+B_i+G_i+_X_i)$-MMP$/X$ with scaling of $A_i$ as well as a $(K__i+B_i+_X_i)$-MMP$/X$ with scaling of $A_i$.
- $_i$ is a step of a $(K__i+B_i+_X_i)$-MMP$/Z$ as well as a step of a $(K_X_i+B_i+G_i+_X_i)$-MMP$/Z$.
Moreover, there exists a positive integer $m$ satisfying the following.
- [(8)] The induced birational map $X_0 X_m$ contracts any $h$-exceptional prime divisor $F$ such that $a(F,,B,)>-_(F)$.
- [(9)] If $(X,,B,)$ is lc, then any divisor $F$ contracted by $X_0 X_m$ satisfies that $a(F,,B,)>-_(F)$.
1. In this step we prove (1-4) for $i=0$. (1) We have $f_0:=f$. (2) We have $h_0:=h$. (3) It follows from our construction. (4) The image of $R$ on $X$ is a closed point, so $R$ is contained in an $h$-exceptional divisor $F$. By our construction, $_FB_0=__0(F)$.
2. In this step we prove that (1-4) for $i=n$ implies (5) for $i=n$.
First we prove (5.a). Assume that $R$ is a $(K__n+B_n+_X_n)$-negative extremal ray$/X$. If $X$ is $$-factorial, then by (4) and Lemma [lem: induction cone 1](2), $R$ is a $(K__n+B_n+_X_n)$-negative extremal ray$/Z$. If Theorem [thm: cone theorem induction] holds for $$-factorial varieties in dimension $d$, then by (3) and Theorem [thm: cone theorem induction], $R$ is a $(K__n+B_n+_X_n)$-negative extremal ray$/Z$.
Now assume that $R$ is a $(K_X_n+B_n+G_n+_X_n)$-negative extremal ray$/X$. Since $G_n$ is super, $G_n_j=1^2d+1f_n^*H_j$ for some ample Cartier divisors $H_j$ on $Z$. Let $L_n:=G_n-_j=1^2d+1f_n^*H_j$. By (3), $(X_n,B_n+G_n,)$ is $$-factorial lc and $X$ is klt, so $(X_n,B_n+L_n,)$ is $$-factorial lc. By the length of extremal rays for lc g-pairs over $$-factorial klt varieties (cf. [Proposition 3.17]HL22), $R$ is spanned by a rational curve $C$ such that
$$0>(K_X_n+B_n+G_n+_X_n) C=(K_X_n+B_n+L_n+_X_n) C+(_j=1^2d+1f_n^*H_j) C -2d.$$
Therefore, $f_n^*H_j C=0$ for each $j$, so $R$ is an extremal ray$/Z$. This implies (5.a).
(5.b) follows from (5.a) and Proposition [prop: weak cbf gfq], and (5.c) follows from (5.b). Thus (5) holds.
4. In this step we prove that (1-5) for $i=n$ and (1-7) for $i n-1$ imply (6) and (7) for $i=n$, and also imply (1)(2) for $i=n+1$.
By induction hypothesis, the induced birational map $X_0 X_n$ is a sequence of steps of a $(K_X_0+B_0+G_0+_X_0)$-MMP$/X$ with scaling of $A$. By Lemma [lem: scaling number go to 0], either this MMP already terminates at $X_n$ and we are done, or we may run the next step of this $(K_X_0+B_0+G_0+_X_0)$-MMP$/X$ with scaling of $A$, which is a step of a $(K_X_n+B_n+G_n+_X_n)$-MMP$/X$ with scaling of $A_n$. (6) and (7) for $i=n$ now follow from (5) for $i=n$. (1) for $i=n+1$ follows from (7) for $i=n$, and (2) for $i=n+1$ follows from (6) for $i=n$.
5. In this step we prove that (1-7) for $i n-1$ and (1)(2) for $i=n$ imply (3) for $i=n$.
By (3)(7) for $i=n-1$, $X_n$ is $$-factorial. By (1) for $i=n$ and (3) for $i=n-1$, $G_n$ is super$/Z$. So we only need to show that $(X_n,_n,B_n,;G_n)/Z$ is ACSS. We check conditions (1-4) of Definition [defn: ACSS f-triple] for $(X_n,_n,B_n,;G_n)/Z$.
Definition [defn: ACSS f-triple](1) for $(X_n,_n,B_n,;G_n)/Z$: By (6) for $i=n-1$ and Proposition [prop: MMP preserves *], $(X_n,B_n+G_n,)/Z$ satisfies Property $(*)$. Since $_n-1$ is induced by $f_n-1$, $_n$ is induced by $f_n$. Since $G_n-1 0$ is $_n-1$-invariant, $G_n 0$ if $_n$-invariant. Thus $(X_n,_n,B_n,;G_n)/Z$ satisfies Property $(*)$. By (3)(7) for $i=n-1$, $(X_n,_n,B_n,)$ is lc, so Definition [defn: ACSS f-triple](1) holds for $(X_n,_n,B_n,;G_n)/Z.$
Definition [defn: ACSS f-triple](2) for $(X_n,_n,B_n,;G_n)/Z$: It immediately follows from (3)(6) for $i=n-1$ and Proposition [prop: MMP preserves *].
Definition [defn: ACSS f-triple](3) for $(X_n,_n,B_n,;G_n)/Z$: By (3) for $i=n-1$, there exist an $$-divisor $D$ and a $$-divisor $$ on $X_n-1$, such that
- $\{B_n-1\} D$,
- $-$ is nef$/X_n-1$ for some $>1$, and
- For any divisor $$ on $Z$ such that $ f_n-1(G_n-1)$ and $(Z,)$ is log smooth,
$$(X_n-1,B_n-1+G_n-1+D+f_n-1^*(-f_n-1(G_n-1)),)$$ is qdlt,
Let $:=-$. By (7) for $i=n-1$, $_n-1$ is also a step of a $$(K__n-1+B_n-1+f_n-1^*(-f_n-1(G_n-1))+_X_n-1)-MMP/Z,$$ hence a step of a
$$(K__n-1+B_n-1+ D+f_n-1^*(-f_n-1(G_n-1))+_X_n-1+_X_n-1)-MMP/Z$$
for some $0< 1$. By (1) for $i=n$, $f_n-1(G_n-1)=f_n(G_n)$, so
$$(X_n-1,B_n-1+G_n-1+ D+f_n-1^*(-f_n(G_n)),+)$$ is qdlt. By Lemma [lem: mmp preserves qdlt], $$(X_n,B_n+(_n-1)_*D+G_n+f_n^*(-f_n(G_n)),+)$$ is qdlt. Since $(_n-1)_*D\{B_n\}$ and $(+)-$ is nef$/X_n$, we verify Definition [defn: ACSS f-triple](3).
Definition [defn: ACSS f-triple](4) for $(X_n,_n,B_n,;G_n)/Z$: For any lc place $S$ of $(X_n,_n,B_n,)$, we have
$$-_(S)=a(S,_n,B_n,) a(S,_n-1,B_n-1,) -_(S).$$
Therefore, $S$ is an lc place of $(X_n-1,_n-1,B_n-1,)$, and $_n-1$ is an isomorphism near the generic point of $_X_n-1S$. Since Definition [defn: ACSS f-triple](4) is a property near the generic point of lc places,
Definition [defn: ACSS f-triple](4) holds for $(X_n,_n,B_n,;G_n)/Z$.
Therefore, $(X_n,_n,B_n,;G_n)/Z$ is $$-factorial super ACSS.
6. In this step we prove (4) for $i=n$ assuming that (1-7) hold for $i=n-1$, hence conclude the proof of (1-7). Since $X$ is $$-factorial, $(h_n)$ is of pure dimension, so there exists a prime $h_n$-exceptional divisor $F$ such that $R$ is contained in $F$. Let $F'$ be the strict transform of $F$ on $X'$, then $F'$ is a prime $h$-exceptional divisor, so
$$_FB_n=_F'B_0=_'(E)=__n(B_n).$$
This implies (4).
By induction, (1-7) hold.
7. In this step we prove (8) and (9) and conclude the proof of the claim.
If this MMP terminates, then we let $m$ be the index such that $(X_m,_m,B_m,;G_m)$ is the last output of this MMP. In particular, $K__m+B_m+_X_m$ is nef$/X$, hence it is movable$/X$. If this MMP does not terminate, then we let $m$ be the index such that $_i$ is a flip for any $i m$. We let $_i: X_m X_i$ be the induced birational map and let
$$_i:=\{t 0 K__i+B_i+_X_i+tA_i is nef/X\}$$
be the scaling numbers for each $i$. By (5),
$$_i=\{t 0 K_X_i+B_i+G_i+_X_i+tA_i is nef/X\}$$
for each $i$. By Lemma [lem: scaling number go to 0], $_iarrow+_i=0$. Therefore,
$$K__m+B_m+_X_m=_iarrow+(_i)^-1_*(K__i+B_i+_X_i+_iA_i)$$
is a movable$/X$.
Since $K__m+B_m+_X_m$ is movable$/X$, for any prime divisor $S$ on $X_m$ any very general curve $C$ on $S$ over $X$, $(K__m+B_m+_X_m) C 0$. Let $F_1,,F_l$ be the $h_m$-exceptional prime divisors and let $a_k:=a(F_k,,B,)+__m(F_k)$ for each $k$, then
Since each $F_k$ is exceptional$/X$, by [Lemma 3.3]Bir12, $a_k 0$ for any $k$. This implies (8). Finally, if $(X,,B,)$ is lc, then
$$K_'+B'+_X'_ R,X_F F()(_(F)+a(F,,X,))F 0,$$
so any divisor contracted by any $(K_'+B'+_X')$-MMP$/X$ is contained in
$$_F F()(_(F)+a(F,,X,))F=_F F(),a(F,,B,)>-_(F)F.$$
We get (9). The proof of the claim is concluded.
of Proposition [prop: cone d-1 imply * dim d part 1] continued.
We let
$
(X_0,_0,B_0,;G_0)@-->[r]^_0 & (X_1,_1,B_1,;G_1)@-->[r]^\ \ \ \ \ \ \ \ \ \ _1 & @-->[r] & (X_n,_n,B_n,;G_n)@-->[r]^\ \ \ \ \ \ \ \ \ \ _n &
$
and $m$ be as in Claim [claim: induction run mmp with scaling]. Then Claim [claim: induction run mmp with scaling](3)(8) guarantee that $(X_m,_m,B_m,;G_m)/Z$ is a super ACSS model of $(X,,B,)$, and (9) guarantees that if $(X,,B,)$ is lc then $E_1,,E_s$ are on $X_m$. Thus $(X_m,_m,B_m,;G_m)/Z$ is a super ACSS model of $(X,,B,)$ such that $E_1,,E_s$ are on $X_m$ if $(X,,B,)$ is lc. Since any $'$-invariant exceptional$/X$ prime divisor is contained in $G'$, any $_m$-invariant exceptional$/X$ prime divisor is contained in $G_m$. Therefore, $(X_m,_m,B_m,;G_m)/Z$ is a great ACSS model of $(X,,B,)$. Finally, since the strict transform of $T$ on $X'$ is contained in $G'$, the strict transform of $T$ on $X_m$ is contained in $G_m$. The proposition follows by taking
$$(Y,_Y,B_Y,;G_Y):=(X_m,_m,B_m,;G_m).$$
Let $d$ be a positive integer. Assume that Theorem [thm: cone theorem induction] holds in dimension $ d-1$. Then:
- Theorem [thm: property * induction] holds for $$-factorial varieties in dimension $d$.
- If Theorem [thm: cone theorem induction] holds for $$-factorial varieties in dimension $d$, then Theorem [thm: property * induction] holds in dimension $d$.
Notations and conditions as in Theorem [thm: property * induction]. Further assume that either $X$ is $$-factorial, or Theorem [thm: cone theorem induction] holds for $$-factorial varieties in dimension $d$.
By Proposition [prop: cone d-1 imply * dim d part 2], $(X,,B,)$ has a great ACSS model $(Y',_Y',B_Y',;G_Y')/Z$. We let $g: Y'arrow X$ be the induced birational morphism and let
$$F:=(K__Y'+B_Y'+_Y'-g^*(K_+B+_X)).$$
Consider $F$ as a reduced subscheme of $Y'$. Then for any irreducible closed subvariety $V X$ such that $V f(F)$, $V$ is a non-lc center of $(X,,B,)$. Therefore, the generic point of $_XE_i$ is not contained in $f(F)$ for each $i$, so $E_1,,E_s$ are also lc places of $(Y',_Y',B_Y',)$. Since $(Y',_Y',B_Y',)$ is lc, by Proposition [prop: cone d-1 imply * dim d part 2] again, $(Y',_Y',B_Y',)$ has a great ACSS model $(Y,_Y,B_Y,;G_Y)$ such that $E_1,,E_s$ are on $Y$, and $G_Y$ contains the strict transform of $G_Y'$ on $Y$. Therefore, $G_Y$ contains all $_Y$-exceptional prime divisors. Since
$$g^*(K_+B+_X) K__Y'+B_Y'+_Y',$$
the induced birational morphism $Yarrow X$ is a great ACSS modification $(X,,B,)$.
## ACSS models to cone theorem
In this subsection, we prove Theorem [thm: cone theorem induction] in dimension $d$ provided that Theorem [thm: property * induction] holds in dimension $ d$ and some $$-factorial properties are satisfied.
The following lemma is well-known to experts. For the reader's convenience, we conclude a proof here.
Let $Xarrow U$ be a projective morphism from a normal quasi-projective variety to a variety. Let $D$ be an $$-Cartier $$-divisor on $X$ and $R$ a $D$-negative exposed ray in $(X/U)$. Then there exists an ample$/U$ $$-divisor $A$ on $X$ such that $H:=D+A$ is the supporting function of $R$.
Let $H_R$ be a supporting function of $R$, whose existence follows from the assumption that $R$ is exposed. Then $H_R R=0$ and $H_R R'>0$ for any $R'=R$ in $(X/U)$. Let
$$C:=\{D N^1(X/U) D z 0 for any z(X/U)_D0\}.$$
Then $C$ is the dual cone of $(X/U)_D 0$ and is generated by nef$/U$ divisors and $D$. Since $H_R$ is positive on $(X/U)_D 0\{0\}$, $H_R$ is contained in the interior of $C$. Thus there exists an ample$/U$ $$-divisor $ A$ such that $H_R- A=L+pD$ in $N^1(X/U)$, where $L$ is a nef$/U$ $$-divisor and $p$ is a non-negative real number. Let $A':= A+L$, then $A'$ is ample$/U$. We may let $H:=1pH_R=1p A'+D$ and $A:=1p A'$.
Let $d$ be a positive integer. Assume that Theorem [thm: cone theorem induction] holds in dimension $ d-1$ and Theorem [thm: property * induction] holds for $$-factorial varieties in dimension $d$.
Let $(X,,B,)/U$ be a gfq of dimension $d$ such that $$ is algebraically integrable. Let $R$ be a $(K_+B+_X)$-negative exposed ray$/U$ that is not contained in $(X/U)_(X,,B,)$. Assume that
- either $X$ is $$-factorial, or
- Theorem [thm: property * induction] holds in dimension $d$.
Then $R$ is spanned by a rational curve $C_j$, such that $C_j$ is tangent to $$ and $$0<-(K_+B+_X) C_j 2d.$$
By Lemma [lem: supporting function are +A], there exists an ample$/U$ $$-divisor $A$ on $X$ such that
$$H_R:=K_+B+A+_X$$
is the supporting function$/U$ of $R$. In particular, $H_R$ is nef, $H_R R=0$, and $H_R R'>0$ for any $R'(X/U) R$. In particular, $H_R_U 0$.
1. In this step we deal with the case when $H_R$ is not big$/U$.
Let $: Xarrow U$ be the induced projective morphism and $Xarrow U'arrow U$ the Stein factorization of $$. Since $$ is nef$/U$, $$ is nef$/U'$. Possibly replacing $U$ by $U'$, we may assume that $$ is a contraction.
Let $F$ be a general fiber of $$. Then $H_F:=H_R|_F$ is nef, not big, and is not numerically trivial. Let $q:= F$ and $A_F:=A|_F$, then there exists an integer $1 k q-1$ such that
$$H_F^k A_F^q-k>H_F^k+1 A_F^q-k-1=0.$$
Let $D_i:=H_R$ for any $1 i k+1$, and let $D_i:=A$ for any $k+2 i q$. Then
$$(D_1|_F) (D_2|_F) (D_q|_F)=H_F^k+1 A_F^q-k-1=0$$
and
$$-(K_+B)|_F (D_2|_F) (D_q|_F)=(A_F-H_F) H_F^k A_F^q-k-1=H_F^k A_F^q-k>0.$$
Let $M:=H_R+A=K_+B+2A+_X$. Then $M$ is ample$/U$. By Theorem [thm: relative bb], for any general closed point $x X$, there exists a rational curve $C_x$ such that $x C_x$, $(C_x)$ is a closed point, $0=D_1 C_x=H_R C_x,$ and
Let $^F:=|_F$ and $B_F:=B|_F$. Since $F$ is a general fiber of $$, $B_F 0$ and $^F$ is nef. Thus $^F_F$ is pseudo-effective and $(B+_X)|_F H_F^k A_F^q-k-1 0.$ Therefore
$$0<-(K_+B+_X) C_x 2d.$$
2. In this step we deal with the case when $H_R$ is not big$/U$. Let $F$ be the Stein factorization of a general fiber of the $$ and let $q:= F$. Then $H_F:=H_R|_F$ is nef, not big, and is not numerically trivial. Let $A_F:=A|_F$, then there exists an integer $1 k q-1$ such that
$$H_F^k A_F^q-k>0$$
and
$$H_F^k+1 A_F^q-k-1=0.$$
(Note that $k$ is defined as the numerical dimension of $H_F$ in some references, but since different definitions of numerical dimensions do not coincide, we do not use this notation.)
Let $D_i:=H_R$ for any $1 i k+1$, and let $D_i:=A$ for any $k+2 i q$. Then
$$(D_1|_F) (D_2|_F) (D_q|_F)=H_F^k+1 A_F^q-k-1=0$$
and
$$-(K_+B)|_F (D_2|_F) (D_q|_F)=(A_F-H_F) H_F^k A_F^q-k-1=H_F^k A_F^q-k>0.$$
We let $M:=H_R+A=K_+B+2A+_X$. Since $H_R$ is nef$/U$ and $A$ is ample$/U$, $M$ is ample$/U$. By Theorem [thm: relative bb], for any general closed point $x X$, there exists a rational curve $C_x$ such that $x C_x$, $(C_x)$ is a closed point, $$0=D_1 C_x=H_R C_x,$$
and
Let $^F:=|_F$ and $B_F:=B|_F$. Since $F$ is a general fiber of $$, $B_F 0$ and $^F$ is nef. Thus $^F_F$ is pseudo-effective, so
$$(B+_X)|_F H_F^k A_F^q-k-1 0.$$
Therefore,
$$0<-(K_+B+_X) C_x 2d.$$
3. From now on we may assume that $H_R$ is big$/U$. In this step we construct a set $$ of tuples $(W,)$ and show that it contains a minimal element. Since $H_R$ is big$/U$,
$$H_R_ R,UA'+P$$
for some ample$/U$ $$-divisor $A'$ and $$-divisor $P 0$. In particular, $P$ is $$-Cartier and $P R<0$. Let $S$ be the normalization of $ P$, then $R$ is contained in the image of $(S/U)arrow(X/U)$ induced by the natural inclusion
$$Sarrow Parrow X.$$
We let $$ be he set of all $(W,)$, such that
- $$ is a non-negative real number,
- $W$ is an lc center of $(X,,B+ P,)$ with normalization $W^$ and
- $R$ is contained in the image of $(W^/U)arrow(X/U)$ induced by the natural inclusion
$$W^ Warrow X.$$
By construction, there exists a component $L$ of $S$ such that $(L,1)$. Thus $=$.
In the rest of this step, we show that there exists $(W_0,_0)$ that is minimal in the following way: for any $(W,)$, one of the following cases hold.
- $_0<$.
- $_0=$ and $W_0 W$.
- $(W,)=(W_0,_0)$.
By Lemma [lem: existence foliated log resolution], there exists a foliated log resolution $h: X'arrow X$ of $(X,, B P,)$. Then there exists a toroidal morphism $f': (X',_X)arrow (Z,_Z)$ such that $h^-1_*( B P)(h)$ is contained in $_X$. By Lemma [lem: foliated log smooth imply lc], for any $(W,)$, either $W$ is the image of a stratum of $(X',)$ on $X$, or $=0$. Therefore, the set
is a finite, so we may let
$$_0:=\{ there exists (W,)\}.$$
Now by noetherian property, there exists $(W_0,_0)$ such that $W_0 W$ for any $(W,_0)$.
4. In this step we construct an $$-divisor $ B$ on $X$ and a $$-factorial ACSS model $(Y,_Y, B_Y,)$ of $(X,,B,)$, so that $R$ is the image of a $(K__Y+ B_Y+_Y)$-negative extremal ray$/U$ in $X$.
Let $ B:=B+_0P$ and let $E$ be an lc place of $(X,, B,)$ such that $_XE=W_0$. By our assumption, there exists an ACSS model $(Y,_Y, B_Y,;G)$ of $(X,, B,)$ such that $E$ is on $Y$ with induced birational morphism $g: Yarrow X$. We have
$$K__Y+ B_Y+_Y+F=g^*(K_+ B+_X)$$
for some $F 0$. Let $V:=g( F)$, then $V(X,, B,)$ is a reduced subscheme of $X$.
By Lemma [lem: extremal ray under morphism], there exists an extremal ray $R_Y$ in $Y$ such that $g(R_Y)=R$. Then there exist $C_Y,i NE(Y/U)$ such that $R_Y=[_iarrow+ C_Y,i]$. We let $C_i:=g(C_Y,i)$, then $R=[_iarrow+ C_i]$. By the projection formula,
$$ (K__Y+ B_Y+F+_Y) C_Y,i= (K_+ B+_X) C_i,$$
so
$$(K__Y+ B_Y+F+_Y) R_Y=(K_+ B+_X) R<0.$$
Thus $R_Y$ is a $(K__Y+ B_Y+F+_Y)$-negative extremal ray.
If $F R_Y<0$, then $R_Y$ is contained in the image of $( F/U)arrow(Y/U)$. Then $R=g(R_Y)$ is contained in the image of $(V/U)arrow(X/U)$. Thus there exists an irreducible component $V_0$ of $V$ such that $R$ is contained in the image of $(V_0/U)arrow(X/U)$. Since $R$ is not contained in $(X/U)_(X,,B,)$, $V_0$ is not an lc center of $(X,,B,)$. Since $V_0 V=f(F)(X,, B,)$ and $ B=B+_0P$, there exists a real number $0<_1<_0$ such that $V_0$ is an lc center of $(X,,B+_1P,)$. This contradicts the minimality of $(W_0,_0)$ as $(V_0,_1)$ and $_1<_0$. Therefore, $F R_Y 0$, so $R_Y$ is a $(K__Y+ B_Y+_Y)$-negative extremal ray.
5. In this step we prove the proposition under the additional condition that $X$ is $$-factorial.
Assume that $X$ is $$-factorial. By [Lemma 3.6.2]BCHM10, $(f)$ is a divisor, so $g^-1(W_0)$ is a divisor. Since $R$ is contained in the image of $(W/U)arrow(X/U)$ and $g(R_Y)=R$, there exists a divisor $E_0$ on $Y$ such that $R_Y$ is contained in the image of $(E_0/U)arrow(Y/U)$. Since $g$ is an ACSS modification of $(X,, B,)$, $E_0$ is an lc place of $(X,, B,)$ and an lc place of $(Y,_Y, B_Y,)$.
Let $T$ be the normalization of $E_0$, $_T:=_Y|_T$ be the restricted foliation, $^T:=|_T$, and
$$K__T+ B_T+^T_T:=(K__Y+ B_Y+_Y)|_T.$$
Since $R_Y$ is contained in the image of $(E_0/U)arrow(Y/U)$, $R_Y$ is contained in the image of
$$: (T/U)arrow (E_0/U)arrow(Y/U).$$
By Lemma [lem: extremal ray under morphism], there exists any extremal ray $R_T(T/U)$ such that $( R)=R_Y$. Then $R_T$ is a $(K__T+B_T+^T_T)$-negative extremal ray$/U$. By Theorem [thm: adjunction foliation nonnqc] and Theorem [thm: cone theorem induction] in dimension $ d-1$, $R_T$ is spanned by a rational curve $C_T$, such that $C_T$ is tangent to $_T$ and
$$0<-(K__T+ B_T+^T_T) C_T 2(d-1).$$
Let $C_Y$ be the image of $C_T$ in $Y$, then $C_Y$ spans $R_Y$,
$$0<-(K__T+ B_T+^T_T) C_T=-(K__Y+ B_Y+_Y) C_Y 2(d-1),$$
and by [Lemma 3.3(4)]ACSS21, $C_Y$ is tangent to $_Y$. Let $C:=g(C_Y)$, then $C$ is tangent to $$. By Step 4, $F C_Y 0$, so
$$2d -(K__Y+ B_Y+_Y) C_Y -(K__Y+ B_Y+F+_Y) C_Y=-(K_+B+_X) C>0.$$
We are done for the case when $X$ is $$-factorial.
6. In this step we conclude the proof of the theorem. Since $Y$ is $$-factorial and $R_Y$ is a $(K__Y+ B_Y+_Y)$-negative extremal ray, by the $$-factorial case proved in Step 5, $R_Y$ is spanned by a rational curve $C_Y$ that is tangent to $_Y$ and
$$0<-(K__Y+ B_Y+_Y) C_Y 2d.$$
Let $C:=g(C_Y)$, then $C$ is tangent to $$. Since $F C_Y 0$,
$$2d -(K__Y+ B_Y+_Y) C_Y -(K__Y+ B_Y+F+_Y) C_Y=-(K_+B+_X) C>0.$$
This concludes the proof of the proposition.
Let $d$ be a positive integer. Assume that Theorem [thm: cone theorem induction] holds in dimension $ d-1$ and Theorem [thm: property * induction] holds for $$-factorial varieties in dimension $d$.
Let $(X,,B,)/U$ be a gfq of dimension $d$ such that $$ is algebraically integrable, and let $A$ be an ample$/U$ $$-divisor on $X$. Assume that
- either $X$ is $$-factorial, or
- Theorem [thm: property * induction] holds in dimension $d$.
Then there are finitely many $(K_+B+A+_X)$-negative extremal rays$/U$ that are not contained in $(X/U)_(X,,B,)$.
Let $d:= X$ and let $:=K_+B+_X$, $:=(X/U)$, and let $A_1,,A_-1$ be ample$/U$ Cartier divisors on $X$, such that $,A_1,,A_-1$ form a basis of $N^1_ R(X/U)$. Let $0< 1$ be a rational number such that $A-_i=1^-1A_i$ is ample$/U$. Then we only need to show that there are finitely many $(K_+B+_i=1^-1A_i+_X)$-negative extremal rays$/U$ that are not contained in $(X/U)_(X,,B,)$. Possibly replacing $A$, we may assume that $A=_i=1^-1A_i$.
Suppose that the proposition does not hold. Then there exist an infinite set $$ and an infinite set $\{R_j\}_j$ of $(K_+B+A+_X)$-negative extremal rays$/U$ that are not contained in $(X/U)_(X,,B,)$. By Definition-Lemma [deflem: exposed ray], possibly replacing $$ with a smaller infinite subset, we may assume that each $R_j$ is a $(K_+B+A+_X)$-negative exposed ray$/U$. By Proposition [prop: * to cone], for any $j$, there exists a rational curve $C_j$ on $X$ that is tangent to $$ and $R_j=[C_j]$, such that
$$-2d C_j<0.$$
For each $j$, by Lemma [lem: supporting function are +A], there exists an ample$/U$ $$-divisor $L_j$ and a nef$/U$ $$-divisor $H_j$, such that
$$H_j=L_j+(K_+B+A+_X)=L_j+_i=1^-1A_i+$$
and $H_j$ is the supporting function of $R_j$. We have
$$0=H_j C_j=L_j C_j+_i=1^-1A_i C_j+ C_j-2d+_i=1^-1A_i C_j.$$
Therefore, $A_i C_j2d$ for any $i,j$. Since $A_i C_j N^+$, there are finitely many possibilities of $A_i C_j$. Possibly replacing $$ with an infinite subset, we may assume that $A_i C_j=A_i C_j'$ for any $i$ and any $j,j'$.
We may write $=_i=1^c r_iD_i$ such that $r_1,,r_c$ are linearly independent over $$ and $D_i$ are Weil divisors. By [Lemma 5.3]HLS19, each $D_i$ is a $$-Cartier divisor. Thus there exist real numbers $a_i,k$ and $b_i$, such that
$$D_i_U_k=1^-1a_i,kA_k+b_i$$
for each $i$.
We let $_1,,_c$ be real numbers such that $_i=1^cb_i_i>-1$ and
$$r_i':=_i+r_i Q.$$
Let $':=_i=1^cr_i'D_i$. Then
$$'=+_i=1^c_iD_i=(_k=1^-1(_i=1^c_ia_i,k)A_k)+(1+_i=1^c_ib_i).$$
Since $_i=1^cb_i_i>-1$, $'$ and $A_1,,A_-1$ form a basis of $N^1_(X/U)$. Moreover,
$$' C_j=(_i=1^c_k=1^_ia_i,k(A_k C_j))+(1+_i=1^c_ib_i)( C_j).$$
By our assumptions,
$$:=_i=1^c_k=1^_ia_i,k(A_k C_j)$$
and
$$:=1+_i=1^c_ib_i>0$$
are constants which do not depend on $j$, and $ C_j [-2d,0)$. Therefore,
$$' C_j [-2d+,)$$
for any $j$.
Since $r_i' Q$ for any $i$, $'$ is a $$-Cartier $$-divisor. Let $I$ be the Cartier index of $'$, then
$$' C_j [-2d+,) 1I Z$$
for any $j$. Therefore, there are only finitely many possibilities of $' C_j$. Possibly replacing $$ with an infinite subset, we may assume that $' C_j=' C_j'$ for any $j,j'$. Since $',A_1,,A_-1$ form a basis of $N^1_(X/U)$, $C_j_U C_j'$, which is not possible as $R_j$ and $R_j'$ are different rays in $(X/U)$.
Let $d$ be a positive integer. Assume that Theorem [thm: cone theorem induction] holds in dimension $ d-1$ and Theorem [thm: property * induction] holds for $$-factorial varieties in dimension $d$. Then:
- Theorem [thm: cone theorem induction] holds for $$-factorial varieties in dimension $d$.
- If Theorem [thm: property * induction] holds in dimension $d$, then Theorem [thm: cone theorem induction] holds in dimension $d$.
First we show that $(X/U)=V$, where
$$V:=(X/U)_K_+B+_X 0+(X/U)_(X,,B,)+_j_j.$$
By Definition-Lemma [deflem: exposed ray], $(X/U)=$. Suppose that $V=$, then there exists an extremal ray $R$ in $(X/U)$ such that $R V$. Since $(X/U)_K_+B+_X 0$ and $(X/U)_(X,,B,)$ are closed, $R (X/U)_K_+B+_X 0$ and $R (X/U)_(X,,B,)$, so $R$ is a $(K_+B+_X)$-negative extremal ray $R$ that is not contained in $(X/U)_(X,,B,)$. Thus $R=R_j$ for some $j$, a contradiction. Therefore, $(X/U)=V$.
Next we show that any each $R_j$ is exposed. For any fixed $j$, There exists an ample$/U$ $$-divisor $A$ such that $R_j$ is a $(K_+B+A+_X)$-negative extremal ray$/U$. Suppose that $R_j$ is not exposed. By Definition-Lemma [deflem: exposed ray], $R_j=_iarrow+_j,i$ for some exposed rays $R_j,i(X/U)$. Since $(K_+B+A+_X) R_j<0$, possibly passing to a subsequence, we have $(K_+B+A+_X) R_j,i<0$ for any $i$. By Proposition [prop: cone finiteness rays], there are only finitely many $(K_+B+A+_X)$-negative extremal rays that are not contained in $(X/U)_(X,,B,)$, for any $i 0$, $R_j,i$ is contained in $(X/U)_(X,,B,)$. Since $(X/U)_(X,,B,)$ is a closed sub-cone of $(X/U)$, $R_j$ is contained in $(X/U)_(X,,B,)$, a contradiction.
By Proposition [prop: * to cone], for any $j$, $R_j$ is spanned by a rational curve $C_j$ such that $C_j$ is tangent to $$ and
$$0<-(K_+B+_X) C_j 2d.$$
## Proofs of Theorems [thm: ACSS model], [thm: precise adj gfq], [thm: dcc adjunction is dcc], and [thm: lc adjunction foliation nonnqc]
[Proofs of Theorems [thm: cone theorem induction] and [thm: property * induction]]
Theorems [thm: cone theorem induction] and [thm: property * induction] hold when $d=1$ trivially. Therefore, we may assume that $d 2$ and Theorems [thm: cone theorem induction] and [thm: property * induction] hold in dimension $ d-1$.
By Proposition [prop: cone d-1 imply * dim d part 2](1), Theorem [thm: property * induction] holds for $$-factorial varieties in dimension $d$. By Proposition [prop: * to cone final part](1), Theorem [thm: cone theorem induction] holds for $$-factorial varieties in dimension $d$. By Proposition [prop: cone d-1 imply * dim d part 2](2), Theorem [thm: property * induction] holds in dimension $d$. By Proposition [prop: * to cone final part](2), Theorem [thm: cone theorem induction] holds in dimension $d$.
By induction on $d$, Theorems [thm: cone theorem induction] and [thm: property * induction] hold.
[Proof of Theorem [thm: ACSS model]]
It is a special case of Theorem [thm: property * induction].
[Proof of Theorem [thm: lc adjunction foliation nonnqc]]
By Theorem [thm: ACSS model], there exists a $$-factorial ACSS model $(X',',B',)$ of $(X,,B,)$ with induced birational morphism $h: X'arrow X$ and associated with $f: X'arrow Z$. Since $(X,,B,)$ is lc,
$$K_'+B'+_X'=f^*(K_+B+_X).$$
Let $S'$ be the normalization of $h^-1_*S$, $_S'$ the restricted foliation of $$ on $S'$, and $^S:=|_S^$. Then there exists an induced birational morphism $h_S: S'arrow S^$. Let
$$K__S'+B_S'+^S_S':=(K_'+B'+_X')|_S',$$
then by Theorem [thm: adjunction foliation nonnqc], $(S',_S',B_S',^S)$ is lc. Since
$$K__S'+B_S'+^S_S'=h_S^*(K__S+B_S+^S_S^),$$
$(S^,_S,B_S,^S)$ is lc.
[Proof of Theorem [thm: precise adj gfq]]
By Theorem [thm: ACSS model], there exists a $$-factorial ACSS model $(X',',B',)$ of $(X,,B,)$ with induced birational morphism $h: X'arrow X$ and associated with $f: X'arrow Z$. Let $S'$ be the normalization of $h^-1_*S$ and $E:=((h))^_Y$. Then there exists an induced birational morphism $h_S: S'arrow S^$.
We let $_S'$ be the restricted foliation of $'$ on $S'$. By Theorem [thm: precise adjunction when induced], there exist prime divisors $C_1',,C_q',T_1',,T_l'$ on $S'$, positive integers $w_1,,w_q$, and non-negative integers $\{w_i,j\}_1 i q,1 j m$ and $\{v_i,k\}_1 i q, 1 k n$ satisfying the following. For any real numbers $b_1',,b_m'$ and $r_1',,r_n'$,
Let
$$K__S+B'_S+'^S_S^:=(K_+_j=1^mb_j'B_j+_k=1^nr_k'_k,X')|_S^,$$
then
$$K__S'+B'_S'+'^S_S'=(f_S)_*(K__S+B'_S+'^S_S^).$$
Theorem [thm: precise adj gfq](1) follows. Theorem [thm: precise adj gfq](2) follows from Theorem [thm: lc adjunction foliation nonnqc].
[Proof of Theorem [thm: dcc adjunction is dcc]]
It is an immediate corollary of Theorem [thm: precise adj gfq].
## Proof of Theorem [thm: cone theorem gfq]
Finally, we prove the full version of the cone theorem for generalized foliated quadruples, Theorem [thm: cone theorem gfq].
Let $(X,,B,)/U$ be a gfq such that $$ is algebraically integrable. Assume that $R$ is a $(K_+B+_X)$-negative extremal ray in $(X/U)$ that is not contained in $(X/U)_(X,,B,)$. Then $R$ is a rational extremal ray in $(X/U)$.
By Lemma [lem: supporting function are +A], there exists an ample$/U$ $$-divisor $A$ such that $H_R:=K_+B+A+_X$ is a supporting function of $R$. We let $ (0,1)$ be a rational number such that $R$ is a $(K_+B+ A+_X)$-negative extremal ray$/U$ that is not contained in $(X/U)_(X,,B,)$. Let $$ be the set of all $(K_+B+ A+_X)$-negative extremal ray$/U$. By Proposition [prop: cone finiteness rays], $$ is a finite set, and we may write $=\{R,R_1,,R_l\}$ for some non-negative integer $l$. Then
$$V:=(X/U)_K_+B+ A+_X 0+(X/U)_(X,,B,)+_i=1^lR_i$$
is a closed sub-cone of $(X/U)$ and $R V$. Let $C$ be the dual cone of $V$ in $N^1(X/U)$, then since $H_R R'>0$ for any $R' V$, $H_R$ is contained in the interior of $C$. Therefore, there exists a real number $ (0,1)$ such that $H_R- A$ is contained in the interior of $C$. In particular, $(H_R- A) R'>0$ for any $R' V$.
We write $H_R=_i=1^cr_iD_i$, where $r_1,,r_c$ are real numbers that are linearly independent over $$ and $D_i$ are Weil divisors. By [Lemma 5.3]HLS19, each $D_i$ is a $$-Cartier $$-divisor. Moreover, by Theorem [thm: cone theorem induction], $R$ is spanned by a rational curve $L$. Since $H_R L=0$, $D_i L=0$ for each $i$.
There exist rational numbers $r_1',,r_c'$ such that $_i=1^c(r_i'-r_i)D_i+ A$ is ample$/U$. We let $H_R':=_i=1^cr_i'D_i$. Then $H_R' R=0$. For any extremal ray $R'(X/U)$ such that $R'=R$, $R' V$. Thus
$$H_R' R'=H_R R'+_i=1^c(r_i'-r_i)D_i R'=(H_R- A) R'+(_i=1^c(r_i'-r_i)D_i+ A) R'>0.$$
Thus $H_R'$ is a supporting function of $R$. Since $H_R'$ is a $$-divisor, it is a rational supporting function of $R$, so $R$ is a rational extremal ray in $(X/U)$.
[Proof of Theorem [thm: cone theorem gfq]]
Theorem [thm: cone theorem gfq](1) follows from Lemma [lem: gfq extremal ray rational] and Theorem [thm: cone theorem induction]. Theorem [thm: cone theorem gfq](2) follows from Theorem [thm: cone theorem induction]. Theorem [thm: cone theorem gfq](3) follows from Proposition [prop: cone finiteness rays] and that $=_n=1^+_1nA$ for any ample$/U$ $$-divisor $A$. We left to prove (4).
For any $(K_+B+_X)$-negative extremal face $F$ in $(X/U)$ that is relatively ample at infinity with respect to $(X,,B,)$, $F$ is also a $(K_+B+_X+A)$-negative extremal face for some ample$/U$ $$-divisor $A$ on $X$. Let $V:=F^ N^1(X/U)$. By (1), $F$ is spanned by a subset of $\{R_j\}_j_A$ and $R_j$ is rational, so $V$ is defined over $$. We let
$$W_F:=(X/U)_K_X+B+_X+A 0+(X/U)_(X,,B,)+_j j_A,R_j FR_j.$$
Then $W_F$ is a closed cone, $(X/U)=W_F+F$, and $W_F F=\{0\}$. The supporting functions of $F$ are the elements in $V$ that are positive on $W_F\{0\}$, which is a non-empty open subset of $V$, and hence contains a rational element $H$. In particular, $F=H^ (X/U)$, hence $F$ is rational, and we get (4). This concludes the proof of Theorem [thm: cone theorem gfq].
# Minimal model program for ACSS generalized foliated quadruples
With the establishment of the cone theorem, we are ready to study the minimal model program for algebraically integrable generalized foliated quadruples. Unfortunately for us, we cannot prove the contraction theorem and the cone theorem for the time being due to technical reasons. However, we are able to run some special types of the minimal model program for foliations.
## Models With the definition of ACSS singularities, we are able to define the concept of log minimal models and good minimal models for algebraically integrable foliations.
[Models, II]
Let $(X,,B,)/U$ be an lc gfq and $(X',',B',)/U$ a log birational model of $(X,,B,)/U$. We say that $(X',',B',)/U$ is a log minimal model of $(X,,B,)/U$ if
- $(X',',B',)/U$ is a weak lc model of $(X,,B)/U$,
- $(X',',B',)$ is $$-factorial ACSS, and
- for any prime divisor $D$ on $X$ which is exceptional over $X'$,
$$a(D,,B,)<a(D,',B',).$$
We say that $(X',',B',)/U$ is a good minimal model of $(X,,B,)/U$ if $(X',',B',)/U$ is a log minimal model of $(X,,B,)/U$ and a semi-good minimal model of $(X,,B,)/U$.
It is important to note that, the concept of ``log minimal model" or ``good minimal model" defined in Definition [defn: models ii] does not coincide with the concept of ``log minimal model" or ``good minimal model" when $=T_X$ in the classical setting ([Definition 2.1]Bir12, [Definition 3.2]HL21a). This is because ``ACSS" is equivalent to ``qdlt" when $=T_X$, while the classical definition of log minimal models requires the (generalized) pair to be ``dlt". This difference will not cause trouble, mainly because the existence of log (resp. good) minimal models is equivalent to the existence of weak lc (resp. semi-good) minimal models, at least for NQC generalized pairs (cf. [Theorem 2.7]TX23).
The following lemma is straightforward but also convenient for us to apply in some scenarios.
Let $(X,,B,)/U$ be an lc gfq and $(X',',B',)$ a $$-factorial ACSS model of $(X,,B,)$. Then $(X',',B',)/X$ is a good minimal model of $(X,,B,)/X$.
It immediately follows from the definitions.
Let $(X,,B,)/U$ be an lc gfq, $ 0$ an $$-divisor on $X$, and $$ a nef$/U$ $$-divisor on $X$. Assume that $$ is induced by a contraction $f: Xarrow Z$ and
$$K_+B+_X_ R,ZK_X++_X.$$
Then the followings hold.
- Any $(K_+B+_X)$-negative extremal ray$/U$ $R$ is a $(K_X++_X)$-negative extremal ray$/Z$, and $(K_+B+_X) R=(K_X++_X) R.$
- Any step of a $(K_+B+_X)$-MMP$/U$ is a step of a $(K_X++_X)$-MMP$/Z$. Moreover, assume that $(X,,)$ is lc and either $X$ is $$-factorial klt or $$ is NQC$/U$, then we may run a step of a $(K_+B+_X)$-MMP$/U$.
- Assume that $(X,,B,;G)/Z$ is weak ACSS for some divisor $G$, $=B+G$, and $=$. For any sequence of steps $$: (X,,B,;G) (X',',B',;G')$$
of a $(K_+B+_X)$-MMP$/U$, we have the following.
- $(X',',B',;G')/Z$ is weak ACSS.
- If $(X,,B,;G)/Z$ is ACSS, then $(X',',B',;G')/Z$ is ACSS.
- If $G$ is super$/Z$, then $G'$ is super$/Z$.
- If $X$ is $$-factorial klt, then $X'$ is $$-factorial klt.
- If $X$ is $$-factorial and $$ is NQC$/U$, then $X'$ is $$-factorial.
- If $X$ is $$-factorial and $(X,,B,;G)/Z$ is (super) ACSS, then $X'$ is $$-factorial and $(X',',B',;G')/Z$ is (super) ACSS.
- Any sequence of steps of a $(K_+B+_X)$-MMP$/U$ is a sequence of steps of a $(K_X++_X)$-MMP$/Z$.
(1) By Theorem [thm: cone theorem gfq], any $(K_+B+_X)$-negative extremal ray$/U$ is tangent to $$, hence is an extremal ray$/Z$. We get (1).
(2) By (1), any $(K_+B+_X)$-negative extremal ray$/U$ $R$ is a $(K_X++_X)$-negative extremal ray$/U$. If $X$ is $$-factorial klt, then by [Lemma 3.4]HL22 and the cone theorem, contraction theorem, and the existence of flips for usual klt pairs, we get a step of a $(K_X++_X)$-MMP$/U$ associated to $R$, which is also a step of a $(K_+B+_X)$-MMP$/U$ associated to $R$. If $$ is NQC$/U$, then by the cone theorem ([Theorem 1.3]HL21a, Theorem [thm: cone theorem gfq]), the contraction theorem ([Theorem 1.5]Xie22, [Theorem 1.7]CLX23), and the existence of flips ([Theorem 1.2]LX23b), we get a step of a $(K_X++_X)$-MMP$/U$ associated to $R$, which is also a step of a $(K_+B+_X)$-MMP$/U$ associated to $R$. Moreover, by (1), $R$ is a negative extremal ray$/Z$, so this step of the MMP is also a step of an MMP$/Z$.
(3) Without loss of generality, we may assume that $$ is a single step of a $(K_+B+_X)$-MMP$/U$. By Proposition [prop: MMP preserves *], we get (3.a). (3.c) is obvious because $G'=_*G$.
If $(X,,B,;G)/Z$ is ACSS, then there exist an $$-divisor $D 0$ on $X$ and a nef$/X$ $$-divisor $'$, such that $\{B\} D$, $'-$ is nef$/X$ for some $>1$, and for any reduced divisor $$ on $Z$ such that $ f(G)$ and $(Z,)$ is log smooth, $$(X,B+D+G+f^*(-f(G)),')$$ is qdlt. Let $:='-$, then $$(X,B+ D+G+f^*(-f(G)),+)$$ is qdlt for any $0 1$, and
$$+-(1+(-1))=('-)$$
is nef$/X$. By (2), $$ is a step of a $(K_X+B+G+_X)$-MMP$/Z$, hence a step of a
$$(K_X+B+ D+G+f^*(-f(G))+_X+_X)-MMP/Z$$
for any $0< 1$.
Thereforem
$$(K_X'+B'+_*D+G'+f'^*(-f(G)),_X+)$$
is qdlt, where $f': X'arrow Z$ is the induced contraction. Moreover, for any lc place $E$ of $(X',',B',)$, since $$-_(E) a(E,,B,) a(E,',B',) -_'(E)=-_(E),$$
$E$ is also an lc place of $(X,,B,)$ and $$ is an isomorphism near the generic point of $_XE$. By (3.a) $(X',',B',;G')/Z$ is ACSS. This implies (3.b).
Assume that $X$ is $$-factorial. By (2), $$ is a step of a $(K_X+B+G+_X)$-MMP$/U$, hence a step of a $(K_X+B+G+_X+A)$-MMP$/U$ for some ample$/U$ $$-divisor $A$. If $X$ is klt, then by [Lemma 3.4]HL22, there exists a klt pair $(X,)$ such that $0_ RB+G+_X+A$, so $$ is a step of a $(K_X+)$-MMP, and (3.d) follows from [Corollaries 3.17, 3.18]KM98. If $$ is NQC$/U$, then by [Corollary 5.20, Theorem 6.3]HL21a, $X'$ is $$-factorial, and we get (3.e). Since $$-factorial qdlt implies that the ambient variety is klt, (3.f)
follows from (3.b), (3.c) and (3.d).
(4) Since the birational transforms of $(X,,B,)$ are lc under any sequence of steps of a $(K_+B+_X)$-MMP, (4) follows from (2).
## MMP with super divisors
Let $(X,,B,)/U$ be an lc gfq, $(X,,)/U$ an lc g-pair, and $f: Xarrow Z$ a contraction, such that $$ is induced by $f$, $$ is super$/Z$, and
$$K_+B+_X_ R,ZK_X++_X.$$
Then the followings hold.
- Any $(K_X++_X)$-negative extremal ray$/U$ $R$ is a $(K_+B+_X)$-negative extremal ray$/Z$ and $(K_+B+_X) R=(K_X++_X) R.$
- A step of a $(K_X++_X)$-MMP$/U$ is a step of a $(K_+B+_X)$-MMP$/Z$.
- Any sequence of steps of a $(K_X++_X)$-MMP$/U$ is a sequence of steps of a $(K_+B+_X)$-MMP$/Z$.
- Let $D 0$ be an $$-divisor on $X$ and $'$ a nef$/U$ $$-divisor on $X$ such that $D+'_X$ is $$-Cartier. Then any sequence of steps of a $(K_X++_X)$-MMP$/U$ with scaling of $(D,')$ is a sequence of steps of a $(K_+B+_X)$-MMP$/U$ with scaling of $(D,')$, and any sequence of steps of a $(K_+B+_X)$-MMP$/U$ with scaling of $(D,')$ is a sequence of steps of a $(K_X++_X)$-MMP$/U$ with scaling of $(D,')$.
(1) Let $d:= X$. Since $$ is super, $_i=1^2d+1f^*H_i$ for some ample Cartier divisors $H_i$ on $Z$. Let $L:=-_i=1^2d+1f^*H_i$, then $(X,L,)$ is lc and $R$ is a $(K_X+L+_X)$-negative extremal ray. By Theorem [thm: cone theorem nonnqc gpair] (applied to $(X,T_X,L,)/U$), there exists a rational curve $C$ on $X$ such that $C$ spans $R$ and $$-2d (K_X+L+_X) C<0.$$ Therefore,
$$0>(K_X++_X) C=(K_X+L+_X) C+(_i=1^2d+1f^*H_i C) -2d+(_i=1^2d+1f^*H_i C).$$
Thus $f(C)$ is a point, so $R$ is an extremal ray$/Z$. (1) follows from our assumption.
(2) immediately follows from (1). By (2), the birational transforms of $(X,,B,)$ and $(X,,)$ are lc after any sequences of steps of a $(K_X++_X)$-MMP, and (3) follows from (2). (4) follows from (1), (3) and Lemma [lem: ACSS mmp can run](1).
Let $(X,,B,)/U$ be an lc gfq and $(X,,)/U$ an lc g-pair such that $$ is induced by a contraction $X Z$ and
$$K_+B+_X_,ZK_X++_X.$$
Then the followings hold.
- $K_+B+_X$ is nef$/Z$ if and only if $K_X++_X$ is nef$/Z$.
- If $K_X++_X$ is either nef$/Z$ or nef$/U$, then $K_+B+_X$ is nef$/U$.
- If $$ is super$/Z$ and $K_+B+_X$ is either nef$/Z$ or nef$/U$, then $K_X++_X$ is nef$/U$.
(1) is obvious. (2) follows from Lemma [lem: ACSS mmp can run](1). (3) follows from Lemma [lem: super mmp with scaling](1).
## MMP with scaling and existence of Mori fiber spaces
In the subsequent discussions, it is important to differentiate between ``one specific MMP that adheres to certain properties" and ``all MMPs that adhere to certain properties." For instance, some argument apply to ``all MMPs with scaling of an ample divisor," whereas some only apply to ``a specific MMP with scaling of an ample divisor." Given this nuance, we will regard ``MMPs" as entities, and typically represent them using symbols like $$ or similar notations.
Let $(X,,B,)/U$ be an lc gfq and $f: Xarrow Z$ a contraction, such that
$$K_+B+_X_ R,ZK_X++_X$$
for some lc g-pair $(X,,)/U$. Assume that either $X$ is $$-factorial klt or $$ is NQC$/U$. Then for any ample$/U$ $$-divisor $A$, we can run a $(K_+B+_X)$-MMP$/U$ with scaling of $A$.
Moreover, there exists a $(K_+B+_X)$-MMP$/U$ with scaling of $A$, say $_0$, satisfying the following. Let $=_0$ if $X$ is not $$-factorial, and let $$ be any $(K_+B+_X)$-MMP$/U$ with scaling of $A$ if $X$ is $$-factorial. Then the followings hold.
- Suppose that there exists an lc gfq $(X,,)/U$ and an ample$/U$ $$-divisor $H$, such that either $X$ is $$-factorial klt or $$ is NQC$/U$, and $+_X_ R,U+_X+H$. Then $$ terminates at a model $(X',',B',)/U$ of $(X,,B,)/U$, such that
- either there exists a $(K_'+B'+_X')$-Mori fiber space$/U$ which is also a $(K_'+B'+_X')$-Mori fiber space$/Z$, or
- $$K_'+B'+_X'_ R,ZD$$
for some semi-ample$/U$ $$-divisor $D$.
- Either $$ terminates, or the limit of the scaling numbers of $$ is $0$.
We first construct $_0$. Possibly replacing $$, we may assume that $$ is super$/Z$. By Lemma [lem: scaling number go to 0] and [Lemma 2.17]TX23, we may run a $(K_X++_X)$-MMP$/U$ with scaling of $A$. By Lemmas [lem: super mmp with scaling] and [lem: equivalence over bases], this MMP is also a $(K_+B+_X)$-MMP$/U$ with scaling of $A$. This shows the existence of $_0$.
Suppose that $X$ is not $$-factorial. Then $$ is NQC$/U$. By [Theorem A, Theorem F, Lemma 4.3]TX23, there is a choice of $_0$ satisfying the following.
- Either $_0$ terminates, or the limit of the scaling numbers of $_0$ is $0$.
- Suppose that there exists an lc gfq $(X,,)/U$ and an ample$/U$ $$-divisor $H$, such that either $X$ is $$-factorial klt or $$ is NQC$/U$, and $+_X_ R,U+_X+H$. Then $$ terminates at
- either a semi-good minimal model $(X',',)/U$ of $(X,,)/U$, or
- a Mori fiber space $(X',',)arrow T$ of $(X,,)/U$. Moreover, by Lemmas [lem: super mmp with scaling] and [lem: equivalence over bases], $X'arrow T$ is a contraction$/Z$.
This implies the proposition when $X$ is not $$-factorial. In the following, we may assume that $X$ is $$-factorial.
We prove (1). Possibly replacing $H$ with a general element in $|H/U|_ R$, $$ with $+H$, and $$ with $ N$, we may assume that $ H 0$. The super$/Z$ property of $$ is lost here, but we may replace $$ again and re-assume that $$ is super$/Z$. By Lemma [lem: super mmp with scaling](4), any $(K_+B+_X)$-MMP$/U$ with scaling of $A$ is a $(K_X++_X)$-MMP$/U$ with scaling of $A$. By Lemma [lem: gklt+ample terminate] and Proposition [prop: qfact nqc any scaling terminate], $$ terminates. Let $(X',',B',)/U$ be the output of $$ and let $'$ be the image of $$ on $X'$. Then $'$ is super$/Z$. By Lemma [lem: gklt+ample terminate] and Proposition [prop: qfact nqc any scaling terminate],
- either $K_X'+'+_X'$ is semi-ample$/U$ and we get (1.b), or
- there exists a $(K_X'+'+_X')$-Mori fiber space $X'arrow T$ over $U$. By Lemma [lem: super mmp with scaling](1), $X'arrow T$ is a $(K_'+'+_X')$-Mori fiber space$/Z$ and we get (1.a).
We prove (2). Suppose that $$ does not terminate and $$ is the limit of the scaling numbers of $$. Then $$ is an infinite sequence of steps of a $(K_+B+2A+_X)$-MMP$/U$. Since $(X,,B,)$ is lc, $(X,,B,+12 A)$ is lc, and
$$K_+B+2 A_X+_X=K_+B+12A+_X_ R,ZK_X++12A+_X.$$
(2) follows from (1).
Let $(X,,B,)/U$ be a weak ACSS gfq.
Assume that
- either $X$ is $$-factorial klt or $$ is NQC$/U$, and
- $K_+B+_X$ is not pseudo-effective$/U$.
Then there exists $_0$, a $(K_+B+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor $A$, which satisfies the following. Let $:=_0$ if $X$ is not $$-factorial, and let $$ be any $(K_+B+_X)$-MMP$/U$ with scaling of $A$ if $X$ is $$-factorial. Then $$ terminates with a Mori fiber space of $(X,,B,)/U$.
Let $(X_0,_0,B_0,):=(X,,B,)$. By Proposition [prop: run mmp with scaling gfq], we may suppose that $$ is an MMP with scaling of $A$
$
(X_0,_0,B_0,)@-->[r] & (X_1,_1,B_1,)@-->[r] & @-->[r] & (X_n,_n,B_n,)@-->[r] &
$
such that either this MMP terminates, or $_iarrow+_i=0$, where
$$_i:=\{t 0 K__i+B_i+tA_i+_X_i is nef/U\}$$
are the scaling numbers and $A_i$ is the strict transform of $A$ on $X_i$.
First we assume that $$ does not terminate.
Let $0< 1$ be a real number such that $K_+B+ A+_X$ is not pseudo-effective$/U$. Since $_iarrow+_i=0$, there exists an integer $m$ such that $_m<$. Thus $K__m+B_m+_mA_m+_X_m$ is nef$/U$ but $K__m+B_m+ A_m+_X_m$ is not pseudo-effective$/U$, which is not possible. Thus $$ terminates.
Suppose that $$ terminates at $(X_m,_m,B_m,)$ for some $m 0$. Since $K_+B+_X$ is not pseudo-effective$/U$, $K__m+B_m+_X_m$ is not pseudo-effective$/U$. Thus $K__m+B_m+_X_m$ is not nef$/U$, so there exists a $(K__m+B_m+_X_m)$-Mori fiber space$/U$. The proposition follows.
Let $(X,,B,)/U$ be an lc gfq. Assume that $$ is algebraically integerable and $K_+B+_X$ is not pseudo-effective$/U$. Then:
- $(X,,B,)/U$ has a Mori fiber space.
- Suppose that $(X,,B,)$ is weak ACSS, and either $X$ is $$-factorial klt or $$ is NQC$/U$. Then:
- We may run a $(K_+B+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor, which terminates with a Mori fiber space$/U$.
- If $X$ is $$-factorial, then any $(K_+B+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor terminates with a Mori fiber space$/U$.
(2) follows from Proposition [prop: run mmp get mfs] so we only need to show (1).
By Theorem [thm: ACSS model], $(X,,B,)$ has a $$-factorial ACSS model $(Y,_Y,B_Y,)$. Let $g: Yarrow X$ be the induced birational morphism, then $g$ only extracts divisors $E$ such that $-_(E)=a(E,,B,)$, and
$$K__Y+B_Y+_Y=g^*(K_+B+_X)$$
is not pseudo-effective$/U$. By Proposition [prop: run mmp get mfs], we may run a $(K__Y+B_Y+_Y)$-MMP$/U$ which terminates with a Mori fiber space $(Y',_Y',B_Y',)arrow T$ of $(Y,_Y,B_Y,)$. Then $(Y',_Y',B_Y',)arrow T$ is a Mori fiber space of $(X,,B,)/U$.
## MMP for very exceptional divisors
Let $(X,,B,)/U$ be a weak ACSS gfq. Let $E_1,E_2 0$ be two $$-divisors on $X$ such that $E_1 E_2=0$, $E_1$ is very exceptional$/U$, and
$$K_+B+_X_ R,U(resp. _U,_ Q,U) E_1-E_2.$$
Assume that either $X$ is $$-factorial klt or $$ is NQC$/U$. Let $A$ be an ample$/U$ $$-divisor. Then:
- We may run a $(K_+B+_X)$-MMP$/U$ with scaling of $A$.
- Let $$ be the $(K_+B+_X)$-MMP$/U$ constructed in (1) if $X$ is not $$-factorial, and let $$ be any $(K_+B+_X)$-MMP$/U$ with scaling of $A$ if $X$ is $$-factorial. Then:
- Either $$ terminates with a Mori fiber space, or $$ contracts $E_1$ after finitely many steps.
- Suppose that $E_2=0$. Then:
- $$ terminates with a weak lc model $(X',',B',)/U$ of $(X,,B,)/U$. In particular,
$K_'+B'+_X'_ R,U(resp. _U,_ Q,U) 0.$
- The divisors contracted by the induced birational map $X X'$ are exactly $ E_1$.
- If $(X,,B,)$ is $$-factorial ACSS, then $(X',',B',)/U$ is a good minimal model of $(X,,B,)/U$.
(1) is a direct corollary of Proposition [prop: run mmp with scaling gfq]. Moreover, by Proposition [prop: run mmp with scaling gfq], we may suppose that $$ is an MMP$/U$ with scaling of $A$
$
(X_0,_0,B_0,)@-->[r] & (X_1,_1,B_1,)@-->[r] & @-->[r] & (X_n,_n,B_n,)@-->[r] &
$
such that either this MMP terminates, or $_iarrow+_i=0$, where
$$_i:=\{t 0 K__i+B_i+tA_i+_X_i is nef/U\}$$
are the scaling numbers and $A_i$ is the strict transform of $A$ on $X_i$.
(2.a) We let $m$ be the integer satisfying the following: if $$ terminates, then $(X_m,_m,B_m,)$ is the output of $$. If we already get a $(K__m+B_m+_X_m)$-Mori fiber space$/U$ then we are done, so we may assume that $K__m+B_m+_X_m$ is nef$/U$. In particular, $K__m+B_m+_X_m$ is movable$/U$.
Otherwise, we let $m$ be a positive integer such that $f_i$ is small for any $i m$. Let $_i: X_m X_i$ be the induced birational maps. Since $K__i+B_i+_iA_i+_X_i$ is nef$/U$ for any $i$,
$$K__m+B_m+_X_m=_iarrow+(_i^-1)_*(K__i+B_i+_iA_i+_X_i)$$
is movable$/U$.
Since $K__m+B_m+_X_m$ is movable$/U$, for any prime divisor $S$ on $X_m$ and any very general curve $C$ on $S$ over $U$, $(K__m+B_m+_X_m) C 0$. Let $E_1,m$ and $E_2,m$ be the images of $E_1$ and $E_2$ on $X_m$ respectively. Then $E_1,m$ is very exceptional$/U$ and
$$K__m+B_m+_X_m_ R,U(resp. _U,_ Q,U) E_1,m-E_2,m.$$
By [Lemma 3.3]Bir12, $E_1,m=0$. This implies (2.a).
(2.b) Now we assume that $E_2=0$. Then $K_+B+_X_U E_1 0$, so $$ does not terminate with a Mori fiber space. By (2.a), $$ contracts $E_1$ and achieves a log birational model $(X',',B',)/U$ of $(X,,B,)$ after finitely many steps. Since the image of $E_1$ on $X'$ is $0$,
$$K__m+B_m+_X_m_ R,U(resp. _U,_ Q,U) 0.$$
In particular, $$ terminates at $X'$. Since the induced birational map $X X'$ does not extract any divisor, $(X',',B',)/U$ is a weak lc model of $(X,,B,)/U$, which implies (2.b.i). Since $$ is also an $E_1$-MMP$/U$, we get (2.b.ii). (2.b.iii) follows from Lemma [lem: ACSS mmp can run](3.f).
# ACC for lc thresholds and the global ACC
## The global ACC
Let $X$ be a normal projective variety and $$ a nef $$-divisor on $X$. If $_X 0$, then $0$.
Let $f: Yarrow X$ be a birational morphism such that $$ descends to $Y$. By the negativity lemma,
$_Y=f^*_X-E -E$ for some $E 0$. Since $_Y$ is nef, $_Y$ is pseudo-effective, so $-E$ is pseudo-effective. Thus $E=0$ and $_Y 0$, so $0$.
[Proof of Theorem [thm: global acc alg int gfq]]
By Theorem [thm: ACSS model], possibly replacing $$ with $\{1\}$ and replacing $(X,,B,)$ with an ACSS model, we may assume that there exists a contraction $f: Xarrow Z$ such that $(X,,B,)/Z$ is $$-factorial ACSS. Let $F$ be a general fiber of $f$, $B_F:=B|_F$, $^F:=|_F$, and $^F_j:=_j|_F$ for each $j$. Since $K_F=K_X|_F=K_|_F$,
$$(F,B_F,^F=_j_j^F)$$
is an lc g-pair of dimension $r$ such that $K_F+B_F+^F_F 0$. Moreover, $B_F$. By [Theorem 1.6]BZ16, there exists a finite set $_1$ depending only on $r$ and $$ such that $B_F_1$. Since $(X,,B,)$ is lc, $B$ is horizontal$/Z$. Thus $B_1$.
Possibly rewrite $$, we may assume that $_j0$ and $_j>0$ for any $j$. By Lemma [lem: trivial trace nef imply trivial], $_j,X 0$ for each $j$. For any $j$, we let $_j (0,_j)$ be a real number and run a
$$(K_+B+_X-_j_j,X)-MMP/Z.$$
Since $_j,X 0$, $K_+B+_X-_j_j,X -_j_j,X$ is not pseudo-effective$/Z$. By Theorem [thm: existence mfs], this MMP terminates with a Mori fiber space $_j: (X_j,_j,B_j,-_j_j)arrow T_j$ of $(X,,B,-_j_j)$.
Since $K_+B+_X 0$, $(X,,B,)$ and $(X_j,_j,B_j,)$ are crepant, so $(X_j,_j,B_j,)$ is lc and $K__j+B_j+_X_j 0$. Since $K__j+B_j+_X_j-_j_j,X_j$ is anti-ample$/T_j$, $_j,X_j$ is ample$/T_j$.
Let $F_j$ be a general fiber of $_j$, $r_j:= F_j$, $B_F_j:=B_j|_F_j$, $^j:=|_F_j$, and $^j_i:=_i|_F_j$. Then $r_j r$. Since $K_F_j=K_X_j|_F_j=K__j|_F_j$,
$$(F_j,B_F_j,^j=_i_i^j_i)$$
is an lc g-pair of dimension $r_j$, and $B_F_j$. Moreover, since $_j,X_j$ is ample$/T_j$, $^j_j,X_j$ is ample. Thus $^j_j0$. By [Theorem 1.6]BZ16, there exists a finite set $_2$ depending only on $$ such that $_j_2$. Since $j$ can be any index, we may take $_0:=_1_2$.
## ACC for lc thresholds
Let $(X,,B,)/X$ be an lc gfq, $D$ an $$-divisor on $X$, and $$ a $$-divisor on $X$ satisfying the following.
- [(i)] $$ is algebraically integrable.
- [(ii)] $ B=(B+D)$.
- [(iii)] $+$ and $-$ are nef$/X$ for some $(0,1)$.
- [(iv)] $(X,,B+D,+)/X$ is an lc gfq. In particular, $D+_X$ is $$-Cartier.
- [(v)] $(X,,B+(1+)D,+(1+))$ is not lc for any positive real number $$.
- [(vi)] For any prime divisor $P$ on $X$ with $a(P,,B+D,+)=-_(D)$, $_PD=0$.
Then for any real number $t (0,1)$, there exist two projective birational morphisms $h: X'arrow X$ and $g: Y'arrow X'$ satisfying the following.
- $h$ is an ACSS modification of $(X,,B+tD,+t)$.
- For any prime $h$-exceptional divisor $P$, $a(P,,B,)=-_(P)$. In particular, $$a(D,,B+sD,+s)=-_(D)$$
for any real number $s$.
- $g$ extracts a unique prime divisor $E$. In particular, $-E$ is ample over $X'$.
- $a(E,,B+D,+)=-_(E)$ and $a(E,,B,)>-_(E)$. In particular, $$a(E,,B+sD,+s)>-_(E)$$ for any real number $s<1$.
- Let $B_Y',D_Y'$ be the strict transforms of $B,D$ on $Y'$ respectively, $_Y':=(h g)^-1$, and $F_Y':=((h g))^_Y'.$ Then
$$(Y',_Y',B_Y'+tD_Y'+F_Y';+t)$$
is $$-factorial ACSS.
$
Y@-->[r]@->_f[d] & Y'@->^g[d]
X & X'@->[l]^h.
$
By condition (v), there exists a prime divisor $P_0$ over $X$ such that
$$a(P_0,,B+D,+)=-_(P_0)$$
and
$$a(P_0,,B+ D,+)<-_(P_0)$$
for any $>1$. In particular,
$$a(P_0,,B+tD,+t)>-_(P_0).$$
By condition (vi), $P_0$ is exceptional$/X$. By Theorem [thm: property * induction], there exists a proper ACSS model $(Y,_Y, B_Y,+;G_Y)/Z$ of $(X,,B+D,+)$ such that $P_0$ is on $Y$. Let $f: Yarrow X$ be the induced birational morphism, $B_Y,D_Y$ the strict transforms of $B,D$ on $Y$ respectively, and $F_Y:=((f))^_Y$. Then $ B_Y=B_Y+D_Y+F_Y$.
By conditions (ii) and (iii) and Lemma [lem: acss smaller coefficient],
$$(Y,_Y,B_Y+tD_Y+F_Y,+t;G_Y)/Z$$
is ACSS. Let $E_1,,E_n$ be the prime $f$-exceptional divisors, then
$$K__Y+B_Y+tD_Y+F_Y+_Y+t_Y_ R,X_i=1^n(_(E_i)+a(E_i,,B+tD,+t))E_i 0.$$
By Theorem [thm: mmp very exceptional alg int fol], we may run a $(K__Y+B_Y+tD_Y+_Y+t_Y+F_Y)$-MMP$/X$ which terminates with a good minimal model $(X',',B'+tD'+F',+t)/X$ of $(Y,_Y,B_Y+tD_Y+F_Y,+t)$, such that
$$K_'+B'+tD'+F'+_X'+t_X'_ R,X0,$$
where $B',D',F'$ are the strict transforms of $B_Y,D_Y,F_Y$ on $X'$ respectively. Let $G'$ be the image of $G_Y$ on $X'$. By Lemma [lem: ACSS mmp can run], $(X',',B'+tD'+F',+t;G')/Z$ is $$-factorial ACSS. In particular, the induced morphism $h: X'arrow X$ is an ACSS modification of $(X,,B+tD,+t)$.
By construction, the divisors contracted by the induced birational map $Y X'$ are all divisors $E_i$ satisfying the inequality
$$a(E_i,,B_Y+tD_Y,+t)>-_(E_i).$$
Thus $Y X'$ contracts $P_0$. Therefore, $Y X'$ contains a divisorial contraction, so it is not the identity morphism. We let $g: Y' X'$ be the last step of this MMP. Since $X'$ is $$-factorial and $$K_'+B'+tD'+F'+_X'+t_X'_ R,X0,$$
$g$ is a divisorial contraction of a prime divisor $E$.
We show that $h,$ $g$, and $t$ satisfy our requirements. (1) and (5) immediately follow from our construction. (3) follows from our construction and the negativity lemma.
For any prime divisor $Q$ on $X'$ that is exceptional over $X$,
so $a(Q,,B+sD,+s)=-_(Q)$ for any real number $s$. This implies (2).
Since $g$ is a divisorial contraction of the prime divisor $E$,
so $a(E,,B,)>-_(E)$. This implies (4) and completes the proof.
[Proof of Theorem [thm: acc lct alg int gfq]]
Suppose that the theorem does not hold. Then there exists a sequence of NQC lc gfq $(X_i,_i,B_i,_i)$, $$-Cartier $$-divisors $D_i$ on $X_i$, and $$-divisors $_i$ on $X_i$, such that $_i=r$, $B_i,D_i$, $_i,_i$ are $$-linear combination of $$-nef$/X$ $$-divisors, and
$$t_i:=(X_i,_i,B_i,_i;D_i,_i)$$ is strictly increasing. By Lemma [lem: find nontrivial divisor on ACSS model], possibly replacing $$ with $\{1\}$, we may assume that
- [(i)] $(X_i,_i,B_i+t_i'D_i,_i+t_i'_i)$ is $$-factorial ACSS for some $0<t_i'<t_i$,
- [(ii)] there exists a divisorial contraction $f_i: Y_iarrow X_i$ of a prime divisor $E_i$, such that $-E_i$ is ample$/X_i$, $$a(E_i,_i,B_i+t_iD_i,_i+t_i_i)=-__i(E_i)$$
and
$$a(E_i,_i,B_i+sD_i,_i+s_i)=-__i(E_i)$$
for any $s=t_i$, and
- [(iii)] let $B_Y_i,D_Y_i$ be the strict transforms of $B_i,D_i$ on $Y_i$ respectively, $_Y_i:=f_i^-1_i$, and $F_i:=((f_i))^_i$. Then
$$(Y_i,_Y_i,B_Y_i+t_i'D_Y_i+F_i,_i+t_i'_i)$$
is $$-factorial ACSS.
We let $E_i^$ be the normalization of $E_i$, $_E_i$ the restricted foliation of $_Y_i$ on $E_i$, $^E_i:=_i|_E_i$, and $^E_i:=_i|_E_i$
For any real number $t$, we let $^E(t)_i:=^E_i+t^E_i$, and
$$K__E_i+B_E_i(t)+^E(t)_i,E_i^:=(K__Y_i+B_Y_i+tD_Y_i+F_i+_i,Y_i+t_i,Y_i)|_E_i^.$$
Let $V_i$ be the center of $E_i$ on $X_i$. Then there exists an induced birational morphism $_i: E_i^ V_i$ such that
$$K__E_i+B_E_i(t_i)+^E(t_i)_i,E_i^_ R,V_i0.$$
Since $-E_i$ is ample$/X_i$,
$$K__E_i+B_E_i(t_i')+^E(t_i')_i,E_i^$$
is anti-ample$/V_i$.
By Proposition [prop: a.i preserved adjunction], $_E_i$ is algebraically integrable. By Theorem [thm: precise adj gfq],
$$(E_i^,_E_i,B_E_i(t_i),^E(t_i)_i)/V_i$$
is lc, and
$$(E_i^,_E_i,B_E_i(t),^E(t)_i)/V_i$$
is lc for any $0 t t_i$. By Theorem [thm: ACSS model], we may let
$(W_i,_W_i,B_W_i(t_i),^E(t_i)_i;G_i)/Z_i$
be an ACSS model of
$$(E_i^,_E_i,B_E_i(t_i),^E(t_i)_i)$$ with induced birational morphism $g_i: W_iarrow E_i^$, and let
$$B_W_i(t):=(g_i^-1)_*B_E_i(t)+((g_i))^_W_i$$
for each $i$. Since $$K__E_i+B_E_i(t_i')+^E(t_i')_i,E_i^$$
is anti-ample$/V_i$,
$K__W_i+B_W_i(t_i')+^E(t_i')_i,W_i$ is not pseudo-effective$/V_i$. Moreover, since $t_i>t_i'$, $B_E_i(t_i) B_E(t_i')$, so $(W_i,_W_i,B_W_i(t_i'),^E(t_i')_i)$ is lc. Thus we may run a
$$(K__W_i+B_W_i(t_i')+^E(t_i')_i,W_i)-MMP/V_i$$
with scaling of an ample$/V_i$ divisor. By Theorem [thm: existence mfs], this MMP terminates with a Mori fiber space $_i: ( W_i,_ W_i,B_ W_i(t_i'),^E(t_i')_i)arrow T_i$ of $(W_i,_W_i,B_W_i(t_i'),^E(t_i)_i)/V_i$.
$
W_i@-->[rr]@->[d]_g_i & & W_i@->[d]^_i
E_i^@->[rd]^_i & & T_i@->[ld]
& V_i &$
By Lemma [lem: ACSS mmp can run], $_i$ is also a Mori fiber space$/Z_i$. Since
$$K__W_i+B_W_i(t_i)+^E(t_i)_i,W_i_ R,V_i0,$$
$( W_i,_ W_i,B_ W_i(t_i),^E(t_i)_i)$ and $(W_i,_W_i,B_W_i(t_i),^E(t_i)_i)$ are crepant, where $B_ W_i(t)$ is the image of $B_W_i(t)$ on $ W_i$ for any $t$. Then
$$K__ W_i+B_ W_i(t_i)+^E(t_i)_i, W_i_ R,V_i0,$$
so
$$K__ W_i+B_ W_i(t_i)+^E(t_i)_i, W_i_ R,T_i0.$$
Let $L_i$ be a general fiber of $_i$, $B_L_i(t):=B_ W_i(t)|_L_i$ for any $t$, and $^L(t)_i:=^E(t)_i|_L_i$ for any $t$. Then $K__ W_i|_L_i=K_L_i$, $(L_i,B_L_i(t_i),^L(t_i)_i)$ is lc,
$$K_L_i+B_L_i(t_i)+^L(t_i)_i,L_i 0,$$
and
$$K_L_i+B_L_i(t_i')+^L(t_i')_i,L_i$$
is anti-ample. Moreover, since $_i$ is a Mori fiber space$/Z_i$, by Proposition [prop: a.i preserved adjunction],
$$ L_i_ W_i=_E_i_i=r.$$
We get a contradiction to [Theorem 1.6]BZ16 by considering the coefficients of $B_L_i(t_i)$ and $^L(t_i)_i,L_i$, which can be precisely computed by Theorem [thm: precise adj gfq]. Theorem [thm: acc lct alg int gfq] is proven.
## Uniform rational polytopes
Let $X$ be a normal variety, $D_i$ $$-divisors on $X$, $_i$ $$-divisors on $X$, and $d_i(t): Rarrow R$ $$-affine functions. Then we call the formal finite sum $ d_i(t)D_i$ an $$-affine functional divisor, and call the formal finite sum $ d_i(t)_i$ an $$-affine $$-divisor.
Let $c$ be a non-negative real number, and $[0,+)$ a set of real numbers. Let $X$ be a normal variety.
For any $$-affine functional divisor $(t)$ on $X$, we write $(t)_c()$ if we may write $(t)=_id_i(t)D_i$, where $D_i$ are distinct prime divisors, and the following condition is satisfied: For any $i$, either $d_i(t)=1$, or
$$d_i(t)=-1++ktm,$$
where $m^+$, $_+$, $k$, and $f+kt=_j(f_j+k_jt)$, where $f_j\{0\}$, $k_j$, and $f_j+k_jc0$ for any $j$.
For any $$-affine functional $$-divisor $(t)$ on $X$ and any projective morphism $Xarrow Z$, we write $(t)_c(/Z)$ if we can write $(t)=_i_i(t)_i$, where $_i$ are nef$/Z$ $$-Cartier $$-divisors, and the following condition is satisfied: For any $i$, either $_i(t)=1$, or
$$_i(t)=v+nt=_j(v_j+n_jt),$$
where $v_j$, $n_j Z$, and $v_j+n_jc 0$ for any $j$. Moreover, if $Z=\{pt\}$, then we may omit $Z$ and write $(t)_c()$.
Let $d$ be a positive integer and $[0,+)$ a set of real numbers. We define $_d(),'_d() [0,+)$ as follows: $c_d()$ (resp. $'_d()$) if and only if there exist a normal projective variety $X$ (resp. a $$-factorial normal projective variety $X$), an $$-affine functional divisor $(t)$ on $X$, and an $$-affine functional $$-divisor $(t)$ satisfying the following.
- $ X d$,
- $(t)_c()$, $(t)_c()$,
- $(X,(c),(c))$ is lc,
- $K_X+(c)+(c)_X0$, and
- $K_X+(c')+(c')_X 0$ for any $c' c$.
Let $r$ be a positive integer and $[0,+)$ a set of real numbers. We define $_r(),'_r() [0,+)$ as follows: $c_r()$ (resp. $c_r'()$) if and only if there exist a normal projective variety $X$ (resp. a $$-factorial normal projective variety $X$), an algebraically integrable foliation $$ on $X$, an $$-affine functional divisor $(t)$ on $X$, and an $$-affine functional $$-divisor $(t)$ on $X$ satisfying the following.
- $ r$,
- $(t)_c()$, $(t)_c()$,
- $(X,,(c),(c))$ is lc,
- $K_+(c)+(c)_X0$, and
- $K_+(c')+(c')_X 0$ for any $c'=c$.
Let $r$ be a positive integer and $[0,+)$ a set of real numbers. Then $_r()=_r()='_r()='_r()$.
By considering the foliation $=T_X$, we have $_r()_r()$. By the existence of dlt modifications, $_r()=_r'()$. By Theorem [thm: ACSS model], $_r()=_r'()$. We only need show that $_r()_r()$.
Pick $c_r()$. The there exists a $$-factorial normal projective variety $X$, an algebraically integrable foliation $$ on $X$, an $$-affine functional divisor $(t)$ on $X$, and an $$-affine functional $$-divisor $(t)$ on $X$, such that
- $ r$,
- $(t)_c(),(t)_c()$,
- $(X,,(c),(c))$ is lc,
- $K_+(c)+(c)_X0$, and
- $K_+(t)+(t)_X 0$ for any $t=c$.
By Theorem [thm: ACSS model], we may let $f: X'arrow X$ be an ACSS modification of $(X,,(c),(c))$, $':=f^-1$, $E:=((f))^'$, and $'(t):=f^-1_*(t)+E$ for any real number $t$. Then $' r$, $'(t)_c()$, $(X',','(c),(c))$ is lc, and $K_'+'(c)+(c)_X' 0$. Moreover, for any $t=c$, since $$0 K_+(t)+(t)_X=f_*(K_'+'(t)+(t)_X'),$$ $K_'+'(t)+(t)_X' 0$. Therefore, we may replace $(X,,(t),(t))$ with $(X',','(t),(t))$, and assume that $(X,,(c),(c))$ is $$-factorial ACSS. Thus there exists a contraction $f: Xarrow Z$ and a reduced divisor $G$ such that $(X,,(c),(c);G)/Z$ is ACSS.
Suppose that for any $0< 1$, $(X,,(c+),(c+);G)/Z$ or $(X,,(c-),(c+);G)/Z$ is not ACSS. By Lemmas [lem: acss smaller coefficient] and [lem: acss f-triple perturb coefficient],
- either there exists a component $D$ of $(c)$, such that $_D(c)=1$ and $_D(t)=1$ for any $t=c$, or
- $(t)= _i(t)_i$, where each $_i$ is $$-nef, and $_i(t)=v_i+n_it=_i(v_i,j+n_i,jt)$ for any $v_i,j$, $n_i,j Z$, $v_i+n_ic 0$ for any $i$, and $v_i+n_ic=0$ for some $i$.
By [Lemma 3.7]Nak16, $c_1()_r()$. Therefore, we may assume that $(X,,(c+),(c+);G)/Z$ and $(X,,(c-),(c-);G)/Z$ are ACSS for any $0< 1$.
Fix $0< 1$. Since $K_+(t)+(t)_X 0$ for any $t=c$ and $K_+(c)+(c)_X 0$, either $K_+(c+)+(c+)_X$ or $K_+(c-)+(c-)_X$ is not pseudo-effective. By Theorem [thm: existence mfs], we may run a $(K_+(c+)+(c+)_X)$-MMP (resp. $(K_+(c-)+(c-)_X)$-MMP) with scaling of an ample divisor if $K_+(c+)+(c+)_X$ (resp. $K_+(c-))+(c-)_X$) is not pseudo-effective, which terminates with a Mori fiber space $: (X'','',''(c+),(c+))arrow T$ (reps. $: (X'','',''(c-),(c-))arrow T$) of $(X,,(c+),(c+))$ (resp. $(X,,(c-),(c-))$), where $''(t)$ is the image of $(t)$ on $X''$ for any $t$. By Lemma [lem: ACSS mmp can run](4), this MMP is also an MMP$/Z$ and $$ is a contraction$/Z$.
Since $K_+(c)+(c)_X 0$, $(X'','',''(c),(c))$ and $(X,,(c),(c))$ are crepant, so $K_''+''(c)+(c)_X'' 0$ and $(X'','',''(c),(c))$ is lc.
Let $F$ be a general fiber of $$. By Theorem [thm: cone theorem gfq], $F$ is tangent to $''$, so $K_''|_F=K_X''|_F=K_F$. Let $_F(t):=''(t)|_F$ and $^F(t):=(t)|_F$. Then
- $ F X- Z= r$,
- $_F(t)_c()$ and $^F(t)_c()$,
- $(F,_F(c),^F(c))$ is lc,
- $K_F+_F(c)+^F(c)_F 0$, and
- $K_F+_F(c+)+^F(c+)_F$ or $K_F+_F(c-)+^F(c-)_F$ is anti-ample.
Thus $c_r()$.
Let $d,c,m,n$ be positive integers, $r_1,,r_c$ real numbers such that $1,r_1,,r_c$ are linearly independent over $ Q$, $:=(r_1,,r_c)$, and $s_1,,s_m,_1,,_n: R^c+1arrow R$ $ Q$-linear functions. Then there exists a positive real number $$ depending only on $d,$ and $s_1,,s_m,_1,,_n$ satisfying the following. Assume that
- $$(X,,B=_i=1^ms_i(1,r_1,,r_c-1,t)B_i,=_i=1^n_i(1,r_1,,r_c-1,t)_i)/X$$ is an lc gfq such that $$ is algebraically integrable and $ d$,
- $B_i 0$ are distinct Weil divisors (possibly $0$) and $s_i(1,) 0$ for each $i$,
- $_i$ are nef$/X$ $$-Cartier $$-divisors and $_i(1,) 0$ for each $i$, and
- $B(t):=_i=1^ms_i(1,r_1,,r_c-1,t)B_i$ and $(t):=_i=1^n_i(1,r_1,,r_c-1,t)_i$ for any $t R$.
Then $(X,,B(t),(t))$ is lc for any $t (r_c-,r_c+)$.
We let $s_i(t):=s_i(1,r_1,,r_c-1,t)$ and $_i(t):=_i(1,r_1,,r_c-1,t)$ for any $t R$. If $s_i(r_c)=0$, then $s_i(t)=0$ for any $i$, so we may assume that $s_i(r_c)=0$ for any $i$. Let $(X',',B'(r_c),(r_c))$ be an ACSS model of $(X,,B(r_c),(r_c))$, $f: X'arrow X$ the induced birational morphism, $E:=(((f)))^'$, and $B'(t):=f^-1_*B(t)+E$ for any $t$. Then
$$K_'+B'(r_c)+(r_c)_X'=f^*(K_+B(r_c)+(r_c)_X).$$
Since $1,r_1,,r_c$ are linearly independent over $ Q$,
$B'(t):=f^-1_*B(t)+E$ for any $t$, and
$$K_'+B'(t)+(t)_X'=f^*(K_+B(t)+(t)_X)$$
for any $t R$. Thus possibly replacing $(X,,B(t),(t))$ with $(X',',B'(t),(t))$, we may assume that $(X,,B(r_c),(r_c))$ is $$-factorial ACSS.
Let $$t_1:=\{t r_c (X,,B(r_c),(r_c)) is lc\}$$
and
$$t_2:=\{t r_c (X,,B(r_c),(r_c)) is lc\}.$$
If $|t_1-t_0| |t_2-t_0|$ then we let $t_0:=t_1$. Otherwise, we let $t_0:=t_2$. We only need to show that there exists a positive real number $$ depending only on $d,$, and $s_1,,s_m,_1,,_n$, such that $|t_0-r_c|$.
Since $1,r_1,,r_c$ are linearly independent over $ Q$, there exists a positive real number $_1$ depending only on $$ and $s_1,,s_m,_1,,_n$, such that $s_i(t)>0$ and $_i(t)>0$ for any $t (r_c-_1,r_c+_1)$. We may assume that $|t_0-r_c|<_1$. In particular, for any $0< 1$, $B(t_0+(t_0-r_c)) 0$, and $_i(t_0+(t_0-r_c))>0$. Thus $(X,,B(t_0),(t_0))$ has an lc center $V_0$ such that $ V_0 X-2$, and $V_0$ is not an lc center of $(X,,B(r_c),(r_c))$.
By Lemma [lem: find nontrivial divisor on ACSS model], possibly replacing $(X,,B(t),(t))$, we may assume that there exist a divisorial contraction $g: Yarrow X$ of a prime divisor $ E$ and a real number $s$ satisfying the following: let $B_Y(t)$ be the strict transform of $B(t)$ on $Y$ for any $t$ and $_Y:=g^-1$, then
- [(i)] $s (r_c,t_0)$ if $r_c>t_0$, and $s (t_0,r_c)$ if $t_0<r_c$,
- [(ii)] $(X,,B(s),(s))$ is $$-factorial ACSS, $(X,,B(r_c),(r_c))$ is lc, and $(X,,B(t_0),(t_0))$ is lc,
- [(iii)] $- E$ is ample over $X$,
- [(iv)] $(Y,_Y,B_Y(s)+_( E),(s))$ is $$-factorial ACSS, and
- [(v)] $a(E,,B(t_0),(t_0))=-_( E)$ and $a(E,,B(r_c),(r_c))>-_( E)$. In particular, $(Y,_Y,B_Y(t_0)+_( E),(t_0))$ is lc and $a(E,,B(s),(s))>-_( E)$.
We let $E$ be the normalization of $ E$, $_E$ the restricted foliation of $_Y$ on $E$, $V:=_X E$,
$^E(t):=(t)|_E$, and
$$K__E+B_E(t)+^E(t)_E:=(K__Y+B_Y(t)+_( E)+(t)_Y)|_E$$
for any real number $t$. By Theorem [thm: precise adj gfq], $B_E(t)$ is an $$-affine functional divisor, $^E(t)$ is an $$-affine functional $$-divisor, and
$$(E,_E,B_E(t_0),^E(t_0)),(E,_E,B_E(s),^E(s))$$
are lc gfqs. By Proposition [prop: a.i preserved adjunction], $_E$ is algebraically integrable and $ d$.
Let $: Earrow V$ be the induced projective surjective morphism. Since $- E$ is ample$/X$,
$$K__E+B_E(t_0)+^E(t_0)_E_ R,V0$$
and
$$K__E+B_E(s)+^E(s)_E$$
is anti-ample$/V$. Thus $$K__E+B_E(t)+^E(t)_E$$ is anti-ample$/V$ for any $t (t_0,s)$ if $t_0<r_c$, and for any $t (s,t_0)$ if $t_0>r_c$.
By Theorem [thm: ACSS model], we may let $$(W,_W,B_W(t_0),^E(t_0);G)/Z$$ be an ACSS model of $(E,_E,B_E(t_0),^E(t_0))$ with induced birational morphism $g: Warrow E$. Let $F_W:=((g))^_W$ and let $B_E(t):=g_*^-1B_E(t_0)+F_W$ for any $t R$. Since $s (r_c-_1,r_c+_1)$, $s_i(s)>0$ and $_i(s)>0$. By Theorem [thm: precise adj gfq] and Lemma [lem: acss f-triple perturb coefficient], there exists a real number $u$, such that $u (t_0,s)$ if $t_0<r_c$, $u (s,t_0)$ if $t_0>r_c$, and
$(W,_W,B_W(u),^E(u);G)/Z$
is ACSS. Since
$$K__E+B_E(u)+^E(u)_E$$ is anti-ample$/V$,
$K__W+B_W(u)+^E(u)_W$ is not pseudo-effective$/V$. Thus we may run a
$$(K__W+B_W(u)+^E(u)_W)-MMP/V$$
with scaling of an ample$/V$ divisor. By Theorem [thm: existence mfs], this MMP terminates with a Mori fiber space$/V$ $: ( W,_ W,B_ W(u),^E(u))arrow T$ of $(W,_W,B_W(u),^E(u))/V$. By Lemma [lem: ACSS mmp can run], $$ is also a Mori fiber space$/Z$.
$
W@-->[rr]@->[d]_g & & W@->[d]^
E@->[rd]^ & & T@->[ld]
& V &$
Let $B_ W(t)$ be the image of $B_W(t)$ on $ W$ for any $t$. Since
$$K__E+B_E(t_0)+^E(t_0)_E_ R,V0,$$
we have
$$K__W+B_W(t_0)+^E(t_0)_W_ R,V0,$$
so $( W,_ W,B_ W(u),^E(u))$ and $(W,_W,B_W(u),^E(u))$ are crepant, and
$$K__ W+B_ W(t_0)+^E(t_0)_ W_ R,V0.$$
Let $L$ be a general fiber of $$, $B_L(t):=B_ W(t)|_L$ for any $t$, and $^L(t):=^E(t)|_L$ for any $t$. Since $$ is Mori fiber space$/Z$, the general fibers of $$ are tangent to $_ W$. Thus $K__ W|_L=K_L$, $(L,B_L(t_0),^L(t_0))$ is lc,
$$K_L+B_L(t_0)+^L(t_0)_L 0,$$
and
$$K_L+B_L(u)+^L(u)_L$$
is anti-ample. Moreover, since $$ is a Mori fiber space$/Z$,
$$ L_ W=_E d.$$
By [Theorem 3.6]Che20 and considering the coefficients of $B_L(t_0)$ and $^L(u)$, which can be precisely computed by Theorem [thm: precise adj gfq], there exists a positive real number $$ depending only on $d,,s_1,,s_m,_1,,_n$, such that $|t_0-r_c|$. This concludes the proof of the theorem.
Let $d,c,m,n$ be positive integers, $r_1,,r_c$ real numbers such that $1,r_1,,r_c$ are linearly independent over $ Q$, $:=(r_1,,r_c)$, and $s_1,,s_m,_1,,_n: R^c+1arrow R$ $ Q$-linear functions. Then there exists an open subset $U$ depending only on $d,$ and $s_1,,s_m,_1,_n$ satisfying the following. Assume that
- $$(X,,B():=_i=1^ms_i(1,)B_i),():=_i=1^n_i(1,)_i)/X$$ is an lc gfq such that $$ is algebraically integrable and $ d$,
- $B_i 0$ are distinct Weil divisors (possibly $0$) and $s_i(1,) 0$,
- $_i$ are nef$/X$ $$-Cartier $$-divisors and $_i(1,) 0$, and
- $B():=_i=1^ms_i(1,)B_i$ and $():=_i=1^n_i(1,)_i$ for any $t R$.
Then $(X,,B(),())$ is lc for any $ U$.
We apply induction on $c$. When $c=1$, Theorem [thm: uniform rational polytope] directly follows from Theorem [thm: uniform rational polytope foliation one variable]. When $c 2$, by Theorem [thm: uniform rational polytope foliation one variable], there exists a positive integer $$ depending only on $r_1,,r_c,s_1,,s_m$, such that for any $t (r_c-,r_c+)$, $$(X,,_i=1^ms_i(1,r_1,,r_c-1,t)B_i,_i=1^n_i(1,r_1,,r_c-1,t)_i)$$ is lc. We pick rational numbers $r_c,1 (r_c-,r_c)$ and $r_c,2 (r_c,r_c+)$ depending only on $r_1,,r_c,s_1,,s_m$. By induction on $c$, there exists an open subset $U_0 (r_1,,r_c-1)$ of $ R^c-1$, such that for any $ U_0$, $$(X,,_i=1^ms_i(1,,r_c,1)B_i,_i=1^n_i(1,,r_c,1)_i)$$ and $$(X,,_i=1^ms_i(1,,r_c,2)B_i,_i=1^n_i(1,,r_c,2)_i)$$ are lc. We may pick $U:=U_0 (r_c,1,r_c,2)$.
bundle formula and MMP for generalized pairs
# Canonical bundle formula for lc-trivial fibrations
## Stability of generalized foliated quadruples
[cf. [Proposition 3.7]ACSS21]
Let $(X,,B,)/U$ be a sub-gfq satisfying Property $(*)$ associated with $f: Xarrow Z$ and $G$. Assume that $f$ is equi-dimensional and $B$ is horizontal$/Z$. Then $f: (X,B+G,)arrow Z$ is BP semi-stabl if and only if $(X,,B,)$ is sub-lc.
Since $(X,,B+)/U$ satisfies Property $(*)$, $f: (X,B+G,)arrow Z$ satisfies Property $(*)$. By Lemma [lem: basic property (*) gpair](1), $(X,B+G,)$ is sub-lc. Let $f': (X',_X',)arrow (Z',_Z')$ be any equi-dimensional model of $(X,B+G,)$ associated with $h: X'arrow X$ and $h_Z: Z'arrow Z$. By Proposition [prop: weak ss imply *], there exists an $$-divisor $ B$ on $X'$ satisfying the followings.
- $ B_X'$.
- $K_X'+ B+_X'=h^*(K_X+B+G+_X)+F$ for some $F 0$ that is vertical$/Z'$.
- $(X', B,)$ and $(X,B+G,)$ are crepant over the generic point of $Z$. In particular, $(X', B,)$ and $(X,B,)$ are crepant over the generic point of $Z$.
- $f': (X', B,)arrow Z$ satisfies Property $(*)$. By Lemma [lem: basic property (*) gpair](1), $(X', B,)$ is sub-lc.
Let $':=h^-1$, $G'$ the vertical$/Z'$ part of $ B$, and $B'$ the horizontal$/Z'$ part of $ B$. Then $(X',',B',;G')/Z'$ satisfies Property $(*)$. Since $F$ is vertical$/Z'$ and $'$ is induced by $f'$, $F$ is $'$-invariant.
We let $B_Z$ and $$ be the discriminant part and moduli part of $f: (X,B+G,)arrow Z$ respectively, and let $ B_Z'$ and $'$ be the discriminant part and moduli part of $f: (X', B,)arrow Z$ respectively. Since $(X,,B,)/Z$ satisfies Property $(*)$, $Z$ is smooth, so $K_Z+B_Z$ is $$-Cartier, and we may define
$$K_Z'+B_Z':=h_Z^*(K_Z+B_Z).$$
Since $f': (X', B,)arrow Z'$ satisfies Property $(*)$, $ B_Z'=f'(G')$. Since $f: (X,B+G,)arrow Z$ satisfies Property $(*)$, $B_Z=f(G)$.
By Proposition [prop: weak cbf gfq], $K_+B+_X_X$ and $K_'+B'+_X''_X'$. In particular, $_X$ is $$-Cartier. Let $A:='_X'-h^*_X'$. Then
In particular, $A$ vertical$/Z'$.
$(X,,B,)$ is sub-lc if and only if $A 0$.
Let
$$A':=K_'+h^-1_*B+_X'+((h))^'-h^*(K_+B+_X).$$
By Lemma [lem: existence foliated log resolution], $h$ is a foliated log resolution of $(X,,B,)$, so $(X,,B,)$ is sub-lc if and only if $A' 0$. Since
$$A K_'+B'+_X'-h^*(K_+B+_X),$$
for suitable choices of $K_$ and $K_'$, we have
$$A'-A=h^-1_*B-B'+((h))^'.$$
For any horizontal$/Z$ prime divisor $P$ on $X'$, if $P$ is not exceptional$/X$, then
$$_PA'=_P(h^-1_*B- B)=0$$
as $G$ and $F$ are vertical$/Z$. If $P$ is exceptional$/X$, then
$$_PA'=1+_P(h^-1_*B- B) 1-_P B.$$
Since $f': (X', B,)arrow Z'$ satisfies Property $(*)$, $_P B 1$, so $_PA' 0$.
For any vertical$/Z'$ prime divisor $P$ on $X'$, since $B$ is horizontal$/Z$ and $B'$ is horizontal$/Z'$, $_PA'=_PA$. The claim follows.
Let $B'_Z'$ be the discriminant part of $f': (X', B-F,)arrow Z'$. Then for any prime divisor $D$ on $Z'$,
$$_D B_Z'=1-\{t (X', B+tf'^*D,) is sub-lc over the generic point of D\}$$
and
$$_D B'_Z'=1-\{t (X', B-F+tf'^*D,) is sub-lc over the generic point of D\}.$$
Since $ B_X'$, by the definition of equi-dimensional model, $( B-F)_X'$. Therefore, if $D_Z'$, then
$$_D B'_Z'=_D B_Z'=_f^*DF=0.$$
Otherwise,
$$_D( B_Z'-B'_Z')=\{t 0 F-tf'^*D 0\}.$$
Therefore,
- $F-f'^*( B_Z'-B'_Z') 0$, and
- $F-f'^*( B_Z'-B'_Z')- f'^*D 0$ for any prime divisor $D$ on $Z'$ and any $>0$.
Since
$$A=f'^*(B_Z'-B'_Z')+(F-f'^*( B_Z'-B'_Z')),$$
we have that $A 0$ if and only if $B_Z'-B'_Z' 0$. The proposition follows from Claim [claim: a' for semistable].
Let $(X,B,)/U$ be an lc g-pair and $f: Xarrow Z$ a contraction such that
- $f: (X,B,)arrow Z$ satisfies Property $(*)$,
- $(X,B,)$ is BP semi-stable$/Z$,
- $f$ is equi-dimensional, and
- $K_X+B+_X$ is nef$/Z$.
Let $$ be the moduli part of $f: Xarrow Z$. Then:
- $_X$ is nef$/U$.
- If $(X,B,)$ is BP stable$/Z$, then $$ descends to $X$. In particular $$ is nef$/U$.
Let $$ be the foliation induced by $$ and $B^h$ the horizontal$/Z$ part of $B$. By Proposition [prop: bp semistable foliation lc], $(X,,B^h,;G)/Z$ is weak ACSS. Since $K_X+B+_X$ is nef$/U$, by Lemma [lem: equivalence over bases], $K_+B+_X$ is nef$/U$.
By Proposition [prop: weak cbf gfq],
$$_X K_+B^h+_X,$$
so $_X$ is nef$/U$. This implies (1). If $(X,B,)$ is BP stable$/Z$, then $$ descends to $X$, and (2) follows from (1).
Let $(X,,B,)/U$ be an lc gfq such that $$ is induced by a contraction $f: Xarrow Z$. Let $D_Z$ be a divisor over $Z$. Then there exists an ACSS model $(X',',B',)/Z'$ of $(X,,B,)$ with induced morphisms $f': X'arrow Z'$ and $g: X'arrow X$, and a birational morphism $h_Z: Z'arrow Z$, such that $h_Z f'=f g$ and $D_Z$ is on $Z'$.
By Definition-Theorem [defthm: weak ss reduction], there exists an equi-dimensional model $(Y,_Y,)arrow Z$ of $f: (X,B,)arrow Z$ associated with $h: Yarrow X$ and $h_Z: Z'arrow Z$, such that $D_Z$ is on $Z$. Let $_Y:=h^-1$ and $B_Y:=h^-1_*B+((h))^_Y$, then $(Y,_Y,B_Y,)$ is foliated log smooth, and
$$K__Y+B_Y+_Y_ R,X_E(h)(_(E)-a(E,,B,))E 0.$$
By Theorem [thm: mmp very exceptional alg int fol], we may run a $(K__Y+B_Y+_Y)$-MMP$/X$ which terminates with a good minimal model $(X',',B',)/X$ of $(Y,_Y,B_Y,)/X$. By Lemma [lem: acss model is gmm], $(X',',B',)$ is an ACSS model of $(X,,B,)$. By Lemma [lem: ACSS mmp can run], this MMP is also a $(K__Y+B_Y+_Y)$-MMP$/Z'$. Then $(X',',B',)/Z'$ satisfies our requirements.
Let $(X,,B,)/U$ be an lc gfq, $f: Xarrow Z$ a contraction, and $G$ a reduced divisor on $X$ such that $(X,,B,;G)/Z$ is weak ACSS. Then $(X,B+G,)$ is BP stable$/Z$.
For any prime divisor $D_Z$ over $Z$, by Lemma [lem: special acss model], there exist two birational morphisms $h_Z: Z'arrow Z$ and $h: X'arrow X$, and an ACSS model $(X',',B',)/Z'$ of $(X,,B,)$ with induced morphism $f': X'arrow Z'$, such that $f h=h_Z f'$ and $D_Z$ is on $Z'$.
We let $G'$ be a divisor on $X'$ such that $(X',',B',;G')/Z'$ is ACSS. Let $B_Z$ and $$ be the discriminant and moduli part of $f: (X,B+G,)arrow Z$ respectively, $K_Z'+B_Z':=h_Z^*(K_Z+B_Z)$, and let $B'_Z'$ and $'$ be the discriminant part and moduli part of $f': (X',B'+G',)arrow Z'$ respectively.
By Proposition [prop: weak cbf gfq], we have
$$'_X' K_'+B'+_X'=h^*(K_+B+_X) h^*_X.$$
Thus for suitable choices of $'$ and $$, we may assume that $'_X'=h^*_X$. Let
$$K_X'+ B'+_X':=h^*(K_X+B+G+_X).$$
Let $ B_Z'$ and $$ be the discriminant and moduli parts of $f': (X', B,)arrow Z'$ respectively. Since
we have that
$$B'+G'- B'-f'^*(B'_Z'-B_Z')=0.$$ Moreover, by Proposition [prop: bp semistable foliation lc], $(X,B+G,)$ is BP semi-stable$/Z$. Thus $$_D_Z B_Z'_D_ZB_Z'.$$
For any prime divisor $D$ on $X$ with $f'(D)=D_Z$, since $B'$ is horizontal$/Z'$, $_DB'=0$. Thus
$$_DG'=_D( B'+f'^*(B'_Z'-B_Z')).$$
There are two cases.
1. $D_Z$ is not a component of $B'_Z'$. In this case, $_DG'=0$, and
$$_D B'=_Df'^*B_Z'=_D_ZB_Z'_Df'^*D_Z.$$
Thus $_D( B'-_D_ZB_Z'f'^*D_Z)=0,$ and
$$_D( B'+(1-_D_ZB_Z')f'^*D_Z)=_Df'^*D_Z 1.$$
Therefore,
Thus
$$_D_ZB_Z'=_D_Z B_Z'.$$
2. $D_Z$ is a component of $B'_Z'$. In this case, $_DG'=1$ and $_DB'_Z'=1$. Therefore,
$$1=_D( B'+(_DB'_Z'-_DB_Z')f'^*D_Z)=_D( B'+(1-_DB_Z')f'^*D_Z).$$
Thus
and hence
$$_D_ZB_Z'=_D_Z B_Z'.$$
In either case, we have $_D_ZB_Z'=_D_Z B_Z'$. Since $D_Z$ can be any prime divisor over $Z$, $f: (X,B+G,)arrow Z$ is BP stable.
When $=0$ and $X$ is projective, Theorem [thm: lc+weak acc=bpstable] becomes [Theorem 4.3]ACSS21 without the condition that $K_X+B$ is $f$-nef. This seems to be an interesting discovery and may be useful for future applications.
## Numerical dimension zero generalized foliated quadruples
Let $(X,,B,)/U$ be an lc gfq such that
- $(X,,B,)$ is weak ACSS,
- $_(X/U,K_+B+_X)=0$, and
- either $X$ is $$-factorial klt or $$ is NQC$/U$.
Then for any ample$/U$ $$-divisor $A$, there exists a $(K_+B+_X)$-MMP$/U$ with scaling of $A$, say $_0$, satisfying the following. Let $=_0$ if $X$ is not $$-factorial, and let $$ be any $(K_+B+_X)$-MMP$/U$ with scaling of $A$ if $X$ is $$-factorial. After a sequence of steps in $$, we get a log birational model $(X',',B',)/U$ of $(X,,B,)/U$ satisfying the following.
- For any very general fiber $F'$ of $X'arrow U$, $(K_'+B'+_X')|_F' 0$, and if $_(X/U,K_+B+_X)=0$, then $(K_'+B'+_X')|_F'_ R0.$
- Suppose that the associated morphism $:X U$ is an equi-dimensional contraction and $U$ is $$-factorial.
- Assume that $K_+B+_X_U(resp. _ R,U) E^h+E^v$ for some $$-divisors $E^h$ and $E^v$ such that $E^h 0$ and $E^v$ is vertical$/U$. Then
$$K_'+B'+_X'_U(resp. _ R,U) 0.$$
In particular, $(X',',B',)/U$ is a weak lc model of $(X,,B,)/U$.
- If $_(X/U,K_+B+_X)=0$, then:
- $K_'+B'+_X'_ R,U0.$
- $(X',',B',)/U$ is a weak lc model of $(X,,B,)/U$.
- If $(X,,B,)/U$ is ACSS, then $(X',',B',)/U$ is a good minimal model of $(X,,B,)/U$.
Let $(X_0,_0,B_0,):=(X,,B,)$.
We denote $$ by
$
(X_0,_0,B_0,)@-->[r] & (X_1,_1,B_1,)@-->[r] & @-->[r] & (X_n,_n,B_n,)@-->[r] &
.$
Let $A_i$ be the strict transform of $A$ on $X_i$, $_i: X_iarrow U$ the induced contraction for each $i$, and
$$_i:=\{t 0 K__i+B_i+_X_i is nef/U\}$$
the scaling numbers. By Proposition [prop: run mmp with scaling gfq], we may choose $_0$ so that either $$ terminates, or $_iarrow+_i=0$.
If $$ terminates, then we let $m$ be the index so that $(X_m,_m,B_m,)/U$ is output of $$. If $$ does not terminate, then we let $m$ be a positive integer such that $f_i$ is a flip for any $i m$. We let $_i: X_m X_i$ be the induced birational map for any $i m$. Since $$ contains countable many steps, there are at most countably many closed point $z Z$, such that for some $i m$, $_i^-1(z)$ is contained in either the flipping locus of $f_i$ or the flipped locus of $f_i-1$. Therefore, for a very general point $z Z$ and any $i m$, $_i^-1(z)$ is neither contained in the flipping locus of $f_i$ nor the flipped locus of $f_i-1$ for any $i m$. We let $F_m$ be a very general fiber of $_m$, $z_0:=_m(F_m)$, and let $F_i$ be the fiber of $_i$ over $z_0$ for each $i$. Then the induced birational map
$$_F,i:=_i|_F_m: F_m F_i$$
is small for any $i m$. Let $^F:=|_F_m$, $B_F_i:=B_i|_F_i$, and $A_F_i:=A_i|_F_i$ for each $i m$. Since $F_i$ is a very general fiber of $_i$, $K_F_i=K__i|_F_i$ for any $i m$.
We will show that $(X',',B',)/U:=(X_m,_m,B_m,)/U$ satisfies our requirements.
$K__m+B_m+_X_m$ is movable$/U$ and $(K__m+B_m+_X_m)|_F_m$ is movable.
If $K__m+B_m+_X_m$ is nef$/U$ then the claim is obvious, so we may assume that $K__m+B_m+_X_m$ is not nef$/U$. In particular, $$ does not terminate. Since $K__i+B_i+_X_i+tA_i$ is nef$/U$ for any $i m$,
$$K_X_m+B_m+_X_m=_iarrow+(_i^-1)_*(K_X_i+B_i+_X_i+tA_i)$$
is movable$/U$, and
$$K_F_i+B_F_i+^F_F_i+tA_F_i=(K__i+B_i+_X_i+tA_i)|_F_i$$
is nef for each $i m$. Thus
$$K_F_m+B_F_m+^F_F_m=_iarrow+(_F,i^-1)_*(K_F_i+B_F_i+^F_F_i+tA_F_i)$$
is movable, and the claim follows.
of Proposition [prop: weak ss num 0 mmp] continued. Since $_(X/U,K_+B+_X)=0$, $_(X_m/U,K__m+B_m+_X_m)=0$ and $_(K_F_m+B_F_m+^F_F_m)=0$. By Claim [claim: movable alon very general fiber] and Lemma [lem: movable num 0 is 0], $K_F_m+B_F_m+^F_F_m 0$. Moreover, if $_(X/U,K_+B+_X)=0$, then $_(X_m/U,K__m+B_m+_X_m)=0$, so $_(K_F_m+B_F_m+^F_F_m)=0$, and hence $K_F_m+B_F_m+^F_F_m_ R0$. This implies (1).
We prove (2). From now on, we may assume that $$ is equi-dimensional and $U$ is $$-factorial. Suppose that $K_+B+_X_U(resp. _ R,U) E^h+E^v$ where $E^h 0$ and $E^v$ is vertical$/U$. Since $U$ is $$-factorial, for any prime divisor $D$ on $X$, $D$ is $$-Cartier, and we may define
$$t_D:=\{s E^v-s^*D 0 over the generic point of D\}.$$
Let
$$ E^v:=E^v-_D D is a prime divisor on Ut_DD.$$
Since $$ is equi-dimensional, $ E^v 0$ and $ E^v$ is very exceptional$/U$. Possibly replacing $E^v$ with $ E^v$, we may assume that $0 E^v$ is very exceptional$/U$. Let $E^h_m$ and $E^v_m$ be the strict transforms of $E^h$ and $E^v$ on $X'=X_m$ respectively. Then $E^h_m|_F_m 0$, so $E^h_m|_F_m=0$ and
$$E^v_m_U(resp. _ R,U) K__m+B_m+_X_m$$
is movable$/U$. Therefore, for any prime divisor $S$ on $X_m$ and very general curves $C$ on $S$ over $U$, $E^v_m C 0$. By [Lemma 3.3]Bir12, $E^v_m=0$. This implies (2.a).
If $_(X/U,K_+B+_X)=0$, then $K_+B+_X_ R,UE 0$ for some $$-divisor $E$ on $X$ (cf. [Definition 2.6]HH20). Then (2.b) immediately follows from (2.a) and Lemma [lem: ACSS mmp can run].
The following proposition is a direct consequence of Proposition [prop: weak ss num 0 mmp].
Let $(X,,B,)$ be a projective lc gfq such that
- $(X,,B,)$ is weak ACSS,
- $_(K_+B+_X)=0$, and
- either $X$ is $$-factorial klt or $$ is NQC.
Then for any ample $$-divisor $A$, there exists a $(K_+B+_X)$-MMP with scaling of $A$, say $_0$, satisfying the following. Let $=_0$ if $X$ is not $$-factorial, and let $$ be any $(K_+B+_X)$-MMP with scaling of an ample $$-divisor if $X$ is $$-factorial. Then:
- $$ terminates with a weak lc model $(X',',B',)$ of $(X,,B,)$ such that
$$K_'+B'+_X' 0.$$
- Suppose that $_(K_+B+_X)=0$. Then:
- $K_'+B'+_X'_ R,U0.$
- If $(X,,B,)$ is $$-factorial ACSS, then $(X',',B',)$ is a good minimal model of $(X,,B,)$.
It immediately follows from Proposition [prop: weak ss num 0 mmp] by taking $U=\{pt\}$.
## Refined definition of lc-trivial fibrations
[Lc-trivial fibration]
Let $(X,,B,)/U$ be a sub-gfq and $f: Xarrow Z$ a contraction$/U$, such that the general fibers of $f$ are tangent to $$. We say that $f: (X,,B,)arrow Z$ is an lc-trivial fibration if
- $(X,,B,)$ is sub-lc over the generic point of $Z$,
- $K_+B+_X_ R,Z0$, and
- there exists a birational morphism $h: Yarrow X$ with $_Y:=h^-1_*$ and $K__Y+B_Y+_Y=h^*(K_+B+_X)$, such that $-B_Y^ 0$ is $$-Cartier and
$$_(Y/Z,-B_Y^ 0)=0.$$
It is clear the lc-trivial fibration does not depend on the choice of $U$.
It is essential to note that our definition of lc-trivial fibration differs from the classical one, even when $=0$ and $=T_X$. We have valid reasons for this deviation. For the sake of simplicity, in the rest part of this remark, we will assume that $=T_X$.
In the classical definition, condition (3) is substituted by
- [(3')] $ f_*_X(^*(X,B,))=1.$
This condition (3') appears in the initial version of the canonical bundle formula [Condition (3) of Theorem 2]Kaw98. It has also been adopted in subsequent versions, for instance, [Theorem 0.2]Amb05 for sub-klt sub-pairs and [Theorem 8.3.7]Kol07 (also see [Theorem 3.6]FG14) for lc-trivial fibrations of sub-lc sub-pairs.
However, for generalized sub-pairs, does not we cannot prove a complete version of the canonical bundle formula under condition (3'). Specifically, for lc-trivial fibrations of NQC generalized pairs defined using condition (3') instead of (3), one must incorporate one of the subsequent conditions to derive the canonical bundle formula:
- [(4.1)] $B 0$ over the generic point of $Z$ (rational coefficient case [Theorem 2.20]FS23; real coefficient case [Theorem 2.23]JLX22).
- [(4.2)] $$ is $$-semi-ample$/Z$ (rational coefficient case [Chapter 6, Theorem 7]Fil19; real coefficient case [Theorem 2.23]JLX22).
While the canonical bundle formula for NQC generalized pairs under conditions (4.1) or (4.2) usually suffices for studying generalized pairs, troubles arise when examining the canonical bundle formula for generalized foliated quadruples. This is because we need to construct equi-dimensional models during the construction of the canonical bundle formula for generalized foliated quadruples, as outlined in [Definition-Theorem 6.12]LLM23. This approach could yield a sub-lc g-sub-pair with negative coefficients, typically not complying with (4.1) or (4.2). Consequently, defining the canonical bundle formula for generalized foliated quadruples becomes challenging. Condition (3) was introduced to address this issue.
Indeed, the most important cases of the canonical bundle formula arise when $B 0$ over the generic point of $Z$. But as we often need to consider the coefficients of the discriminant part across any high model of the base $Z$ in order to study the corresponding singularities, base changes are inevitable. Therefore, we need to take consideration of crepant pullbacks of $(X,B,)$. Furthermore, running minimal model programs over the base to introduce new structures means that crepant transformations over the generic point of $Z$ also become inevitable. This will inevitably introduce more sub-pairs or g-sub-pairs, necessitating a broader category of structures for which the canonical bundle formula needs to be applied. Specifically, we aim to identify a category $$ of structures
$$f: (X,B,)arrow Z,$$
which satisfies the following two conditions.
- [(i)] For any g-sub-pair $(X,B,)/U$ and contraction$/U$ $f: Xarrow Z$ such that $K_X+B+_X_ R,Z0$ and $(X,B,)$ is lc over the generic point of $Z$, $f: (X,B,)arrow Z$ belongs to $$.
- [(ii)] For any g-sub-pairs $(X,B,)/U$ and $(X',B',')/U$ and birationally equivalent contractions$/U$ $f: Xarrow Z$, $f': X'arrow Z'$ such that $K_X+B+_X_ R,Z0$, $K_X'+B'+_X'_ R,Z'0$, and $(X,B,)$ and $(X',B',')$ are crepant over the generic point of $Z$, $f: (X,B,)arrow Z$ belongs to $$ if and only if $f': (X',B',')arrow Z$ belongs to $$.
Condition (3') is one natural condition to add in order to form the category $$. For generalized pairs, however, the $$ category shaped by incorporating condition (3') becomes overly expansive to consistently prove the canonical bundle formula. By comparing our condition (3) with (3'), it becomes evident that (3') can be loosely interpreted as
$$(Y/Z,-B_Y^ 0)=0$$
(cf. [Definitions 8.4.1, 8.4.2]Kol07). This essentially indicates some kind of existence of good minimal models should hold for for generalized pairs with Kodaira dimension $0$. But such an assertion is absurd by numerous examples (e.g., [1.1 Example]Sho00). In fact, even for usual pairs, since we don't know the existence of good minimal models for pairs with Kodaira dimension of $0$, the theory of mixed Hodge structures is inevitably used to prove the canonical bundle formula in almost all literature, with the exception of [ACSS21]. We also note that [ACSS21] does not extensively address lc-trivial fibrations.
Given these considerations, we redirect our focus to a new category $$ of g-sub-pairs which adhere to (1) and (2) but do not depend on condition (3'). It turns out that condition (3) is a natural alternative choice for us to form the category $$. This enables us to bypass the abundance conjecture or the mixed Hodge structure by replacing (3) with (3'). This will eventually lead us to prove the canonical bundle formula for generalized pairs and generalized foliated quadruples in full generality.
The following lemmas are analogues of Lemma [lem: lc trivial (3) invariant under pullback], [lem: lc trivial preserved crepant], and [lem: lc trivial holds for lc gpair] for foliations, and their proofs are similar.
Let $(X,,B,)/U$ be a sub-gfq. Assume that $-B^ 0$ is $$-Cartier and $_(X/U,-B^ 0)=0$. Then for any birational morphism $g: Warrow X$, such that
- $K_g^-1+B_W+_W:=g^*(K_+B+_X)$ satisfies that $-B_W^ 0$ is $$-Cartier, and
- there exists an $$-Cartier $$-divisor $0 F(g)$,
we have that
$$_(W/U,-B_W^ 0)=0.$$
Let $D:=-B^ 0$, $D_W:=-B_W^ 0$, and $m 0$ an integer. Then we have
$$D_W=g^-1_*D+E$$
for some $E 0$ that is exceptional$/X$. Thus
$$0=_(X/U,D)=_(W/U,g^*D+mF)_(W/U,g^-1_*D+E)=_(W/U,D_W) 0.$$
So $_(W/U,D_W)=0$.
Let $(X,,B,)/U$ and $(X',',B,')/U$ be two sub-gfqs. Let $f: Xarrow Z$ and $f': X'arrow Z'$ be two birationally equivalent contractions$/U$, such that $(X,,B,)$ and $(X',',B',')$ are crepant over the generic point of $Z$. Assume that $K_+B+_X_ R,Z0$ and $K_'+B'+_X'_ R,Z'0$.
Then $f: (X,,B,)arrow Z$ is an lc-trivial fibration if and only if $f': (X',',B',')arrow Z'$ is an lc-trivial fibration.
By symmetry, we only need to prove the only if part, and we may assume that $f: (X,,B,)arrow Z$ is an lc-trivial fibration.
Let $p: Warrow X$ and $q: Warrow X'$ be a resolution of indeterminacy of the induced birational map $: X X'$ such that $$ descends to $W$, $_W:=p^-1=q^-1'$,
$K__W+B_W+_W:=p^*(K_+B+_X)$, and $K__W+B'_W+'_W:=q^*(K_'+B'+'_X')$. Moreover, by Lemma [lem: lc trivial (3) invariant under pullback], possibly replacing $W$ with a higher resolution, we may assume that $W$ is smooth and $_(W/Z,-B_W^ 0)=0$.
Since $(X,,B,)$ and $(X',',B',')$ are crepant over the generic point of $Z$, over the generic point of $Z$, we have that $B_W=B'_W$, $='$, and $_W='_W$. Thus $_(W/Z,-B_W'^ 0)=0$. Moreover, since $(X,,B,)$ is sub-lc over the generic point of $Z$, $(W,,B_W,)$ is sub-lc over the generic point of $Z$, so $(W,',B_W',')$ is sub-lc over the generic point of $Z$, and so $(W,',B_W',')$ is sub-lc over the generic point of $Z'$, so $(X',',B',')$ is sub-lc over the generic point of $Z'$. The lemma follows.
Let $(X,,B,)/U$ be a sub-gfq and $f: Xarrow Z$ a contraction$/U$, such that $(X,,B,)$ is lc over the generic point of $Z$ and $K_+B+_X_ R,Z0$. Then $f: (X,,B,)arrow Z$ is an lc-trivial fibration.
Over the generic point of $Z$, $B^ 0=0$, so $_(X/Z,B^ 0)=0$. The lemma follows from the definition.
## Canonical bundle formula for generalized pairs
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction$/U$ such that $f: (X,B,)arrow Z$ is an lc-trivial fibration. Then there exists an $$-divisor $L$ on $Z$ such that $K_X+B+_X_ Rf^*L$. There exists a unique $$-divisor $^Z$ on $Z$ satisfying the following.
Let $f': X'arrow Z'$ be any contraction that is birationally equivalent to $f$ such that the induced birational maps $h: X' X$ and $h_Z: Z' Z$ are morphisms. We let $$K_X'+B'+_X':=h^*(K_X+B+_X)$$
and let $B_Z'$ be the discriminant part of $f': (X',B',)arrow Z'$. Then
$$^Z_Z'=h_Z^*L-K_Z'-B_Z'.$$
We call $^Z$ the base moduli part of $f: (X,B,)arrow Z$. If there is no confusion, we may also call $^Z$ as the moduli part of $f: (X,B,)arrow Z$. It is clear that for any fixed choice of $L$, $^Z$ is unique. In particular, $^Z$ is unique up to $$-linear equivalence.
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction$/U$ such that $f: (X,B,)arrow Z$ is an lc-trivial fibration. Suppose that $n(K_X+B+_X) 0$ over the generic point of $Z$ for some positive integer $n$. Then there exists a choice $^Z$ of the base moduli part of $f: (X,B,)arrow Z$ such that
$$n(K_X+B+_X) nf^*(K_Z+B_Z+^Z_Z),$$
where $B_Z$ be the discriminant part of $f: (X,B,)arrow Z$.
By assumption, there exists a rational function $ K(X)$ such that $n(K_X+B+_X)+()$ is vertical$/Z$. By [Lemma 2.5]CHL23, there exists an $$-Cartier $$-divisor $L$ on $Z$ such that
$$n(K_X+B+_X)+()=nf^*L.$$
The lemma follows from our construction of $^Z$ as in Definition [defn: cbf gpair].
Let $(X,B,)/U$ and $(X',B,)/U$ be two g-sub-pairs. Let $f: (X,B,)arrow Z$ and $f': (X',B',)arrow Z'$ be two lc-trivial fibrations$/U$ such that $f$ and $f'$ are birationally equivalent, and $(X,B,)$ and $(X',B',)$ are crepant over the generic point of $Z$. Let $^Z$ be the base moduli part of $f: (X,B,)arrow Z$ and let $^Z'$ be the base moduli part of $Z'$. Then $^Z_ R^Z'$.
Possibly passing to a common base and resolve indeterminacy of the induced birational map $X X'$, we may assume that $f=f'$, $X=X'$, and $Z=Z'$. Now $K_X+B+_X=K_X+B'+_X$ over the generic point of $Z$, so $B-B'$ is vertical$/Z$. Since $K_X+B+_X_ R,Z0$ and $K_X+B'+_X_ R,Z0$, $B-B'_ R,Z0$, so $B-B'=f^*P$ for some $$-divisor $P$ on $Z$.
Let $B_Z$ and $B_Z'$ be the discriminant parts of $f: (X,B,)arrow Z$ and $f: (X,B',)arrow Z$ respectively. By the definition of the discriminant part, $B_Z=B_Z'+P$. Since
$$K_Z+B_Z'+P+^Z'_Z_ RK_Z+B_Z+^Z_Z,$$
$^Z'_Z_ R^Z_Z$. Since we may pass to an arbitrarily high base change, we have $^Z_ R^Z'$.
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction$/U$ such that $f: (X,B,)arrow Z$ is an lc-trivial fibration. Let $B_Z$ and $^Z$ be the discriminant part and a base moduli part of $f: (X,B,)arrow Z$ respectively. Then $^Z$ is nef$/U$. Moreover:
- $(Z,B_Z,^Z)/U$ is a g-sub-pair.
- If the vertical$/Z$ part of $B$ is $ 0$, then $(Z,B_Z,^Z)/U$ is a g-pair.
- If $(X,B,)$ is sub-lc (resp. lc, sub-klt, klt), then $(Z,B_Z,^Z)$ is sub-lc (resp. lc, sub-klt, klt).
- Any lc center of $(Z,B_Z,^Z)$ is the image of an lc center of $(X,B,)$.
- The image of any lc center of $(X,B,)$ on $Z$ is an lc center of $(Z,B_Z,^Z)$.
- If $$ is NQC$/U$, then $^Z$ is NQC$/U$.
By Lemmas [lem: lc trivial (3) invariant under pullback] and [lem: lc trivial preserved crepant], possibly replacing $f$, we may assume that $-B^ 0$ is $$-Cartier and $_(X/Z,-B^ 0)=0$. By Definition-Theorem [defthm: weak ss reduction], $f: (X,B,)arrow Z$ has an equi-dimensional model $f': (X',_X',)arrow Z'$ with associated morphisms $h: X' X$ and $h_Z: Z'arrow Z$. Let
$$K_X'+ B'+_X':=h^*(K_X+B+_X),$$
$ B'^h$ the horizontal$/Z'$ part of $ B'$, and $B':=( B'^h)^ 0$. Let $G'$ be the vertical$/Z'$ part of $_X'$, $ B'^v$ the vertical$/Z'$ part of $ B'$, $E^h:=-( B'^h)^ 0$, and $E^v:=G'- B'^v$. Then $E^h 0$ and $E^v$ is vertical$/Z'$. By Lemma [lem: lc trivial (3) invariant under pullback], $_(X'/Z,E^h)=0$. We have
Since $(X,B,)$ is sub-lc over the generic point of $Z$, $_X' B' 0$. Let $'$ be the foliation induced by $f': X'arrow Z'$. By Lemma [lem: existence foliated log resolution], $(X',',B',;G')/Z'$ is ACSS. By Proposition [prop: weak cbf gfq],
$$K_'+B'+_X'_ R,Z'K_X'+B'+G'+_X'_ R,Z'E^h+E^v.$$
Thus
$$_(X'/Z',K_'+B'+_X')=_(X'/Z',E^h)=0.$$
By Proposition [prop: weak ss num 0 mmp], we may run a $(K_'+B'+_X')$-MMP$/Z'$ which terminates with a good minimal model $(X'','',B'',)/Z'$ of $(X',',B',)/Z'$. Let $G''$ be the image of $G'$ on $X''$. By Lemma [lem: ACSS mmp can run], $(X'','',B'',;G'')/Z'$ is ACSS.
Since $X'arrow U$ factors through $Z'$, $X' X''$ is a sequences of steps of a $(K_'+B'+_X')$-MMP$/U$. By Lemma [lem: equivalence over bases], $K_''+B''+_X''$ is nef$/U$. By Theorem [thm: lc+weak acc=bpstable], $(X'',B''+G'',)$ is BP stable$/Z'$. Let $f'': X''arrow Z'$ be the induced contraction and let $$ be the moduli part of $f'': (X'',B''+G'',)arrow Z'$. By Proposition [prop: bp stable nef], $$ is nef$/U$ and $$ descends to $X$. By Proposition [prop: weak cbf gfq], $$K_X''+B''+G''+_X''_ R,Z'0.$$
Let $'$ be the base moduli part of $f'': (X'',B''+G'',)arrow Z'$, then by the definition of base moduli part, $'$ descends to $Z'$ and $f''^*'_X'=_X''$ is nef, so $'_X'$ is nef, hence $'$ is nef.
Let $ B''^h$ be the image of $ B'^h$ on $X''$. Since $K_X'+ B'+_X'_ R,Z'0$, $K_X'+ B'^h+_X'_ R0$ over the generic point of $Z'$. Thus $K_X''+ B''^h+_X''_ R0$ over the generic point of $Z'$. Since $B'' B''^h$ and $K_X''+B''+_X''_ R,Z'0$, $B''= B''^h$ over the generic point of $Z'$. Since $(X', B'^h,)$ and $(X'', B''^h,)$ are crepant over the generic point of $Z'$, $(X', B',)$ and $(X'',B''+G'',)$ are crepant over the generic point of $Z'$. Thus $(X,B,)$ and $(X'',B''+G'',)$ are crepant over the generic point of $Z$. By Lemma [lem: m preserved under crepant], $^Z='$. The main part of the theorem follows. (1) immediately follows.
(2-4) immediately from the definition of the discriminant part. (5) follows from the definition of the discriminant part and Lemma [lem: alg int foliation lct achieved]. By [Theorem 2.23]JLX22, if $$ is NQC$/U$, then $'$ is NQC$/U$, hence $^Z$ is NQC$/U$. (6) follows.
## Canonical bundle formula for generalized foliated quadruples
Let $(X,,B,)/U$ be a sub-gfq and $f: Xarrow Z$ a contraction$/U$, such that the general fibers of $f$ are tangent to $$ and $f: (X,,B,)arrow Z$ is an lc-trivial fibration. We define two $$-divisors $$ and $^Z$ on $Z$ in the following way.
By Lemma [lem: gen fiber tangent mean induce], there exists a foliation $_Z$ on $Z$ such that $=f^-1_Z$. Let $f': (X',_X',)arrow (Z',_Z')$ be any equi-dimensional model of $f: (X,B,)arrow Z$ with associated morphisms $h: X'arrow X$ and $h_Z: Z'arrow Z$. Let $_Z':=h_Z^-1_Z$ and $':=h^*$, then $'=f'^-1_Z'$. We define
$$R':=(f'^*D-f^-1(D)),$$
where $D$ runs over all $_Z'$-invariant prime divisors on $Z$. By [2.9]Dru17, we have
$$K_'/_Z'=K_X'/Z'-R'.$$
Let $K_'+B'+_X':=h^*(K_+B+_X)$. Then $K_''+B'+_X'_ R,Z'0$, so
$$K_X'+B'-R'+_X'_ R,Z'0.$$
Since $R'=0$ and $K_X'=K_'$ over the generic point of $Z'$, $f': (X',B'-R',)arrow Z'$ is an lc-trivial fibration. By Theorem [thm: cbf gpair nonnqc], there exist two $$-divisors $$ and $^Z$ on $Z$, such that $$ is uniquely determined and $^Z$ is uniquely determined up to $$-linear equivalence, and the following conditions are satisfied:
- [(i)] $K_X'+B'-R'+_X'_ Rf'^*(K_Z'+_Z'+^Z_Z')$.
- [(ii)] $^Z$ is nef$/U$.
- [(iii)] For any birational morphism $g_Z: Z''arrow Z'$ and $g: X''arrow X'$ such that the induced map $f'': X'' Z''$ is a morphism, we let
$$K_X''+ B''+_X'':=g^*(K_X'+B'-R'+_X'),$$
then $_Z''$ is the discriminant part of $f'': (X'', B'',)arrow Z''$.
We call $$ as the discriminant $$-divisor of $f: (X,,B,)arrow Z$ and call $^Z$ as the base moduli part of $f: (X,,B,)arrow Z$. We also call $_Z$ the discriminant part of $f: (X,,B,)arrow Z$. Then:
- $$ and $^Z$ are well-defined, i.e. $$
and the $$-linear equivalence class of $^Z$ are independent of the choices of the equi-dimensional model of $f: (X,B,)arrow Z$.
- $(Z,_Z,B_Z:=_Z,^Z)/U$ is a sub-gfq. We say that $(Z,_Z,B_Z,^Z)/U$ is a sub-gfq induced by a canonical bundle formula$/U$ of $f: (X,,B,)arrow Z$.
- If $$ is NQC$/U$, then $^Z$ is NQC$/U$.
By [Definition-Lemma 6.11]LLM23, $$ is independent of the choices of the equi-dimensional model of $f: (X,B,)arrow Z$.
Since $K_+B+_X_ R,Z0$, there exists an $$-divisor $L$ on $Z$ which is uniquely determined up to $$-linear equivalence, such that
$$K_+B+_X_ Rf^*L.$$
By condition (i), we have
$$K_'+B'+_X'_ Rf'^*(K__Z'+_Z'+^Z_Z').$$
Therefore, for any birational morphism $g_Z: Z''arrow Z'$ with $_Z'':=g_Z^-1_Z'$, we have
$$^Z_Z''_ R(h_Z g_Z)^*L-K__Z''-_Z''.$$
Thus $^Z_Z''$ is uniquely determined up to the choices of $L$ in its $$-linear equivalence class, so $^Z$ is uniquely determined up to $$-linear equivalence. This implies (1).
We have
$$L=(h_Z)_*h_Z^*L_ R(h_Z)_*(K__Z'+_Z'+^Z_Z')=K__Z+B_Z+^Z_Z,$$
so $K__Z+B_Z+^Z_Z$ is $$-Cartier. By condition (ii), $(Z,_Z,B_Z:=_Z,^Z)/U$ is a sub-gfq. This implies (2).
(3) follows from Theorem [thm: cbf gpair nonnqc](6).
Let $(X,,B,)/U$ be a sub-gfq and $f: Xarrow Z$ a contraction$/U$ such that $f: (X,,B,)arrow Z$ is an lc-trivial fibration. Let $B_Z$ be the discriminant part of $f: (X,,B,)arrow Z$ and $_Z$ a foliation on $Z$ such that $=f^-1_Z$. Let $n$ be a positive integer such that $n(K_+B+_X) 0$ over the generic point of $Z$. Then there is a choice $^Z$ of the base moduli part of $f: (X,,B,)arrow Z$, such that
$$n(K_+B+_X) nf^*(K__Z+B_Z+^Z_Z).$$
Let $f': (X',_X',)arrow (Z',_Z')$ be a sufficiently high equi-dimensional model of $f: (X,B,)arrow Z$ with associated morphisms $h: X'arrow X$ and $h_Z: Z'arrow Z$. Let $_Z':=h_Z^-1_Z$ and let
$$R':=_D D is an _Z'-invariant prime divisor(f'^*D-f'^-1(D)).$$
Then $f': (X',B'-R',)arrow Z'$ is an lc-trivial fibration.
Since $R'$ is vertical$/Z'$, $n(K_X'+B'-R'+_X') 0$ over the generic point of $Z$. The lemma follows from Lemma [lem: order along generic fiber cbf].
Let $(X,,B,)/U$ and $(X',',B',)/U$ be two sub-gfqs. Let $f: (X,,B,)arrow Z$ and $f': (X',',B',)arrow Z'$ be two lc-trivial fibrations$/U$ such that $f$ and $f'$ are birationally equivalent, and $(X,,B,)$ and $(X',',B',)$ are crepant over the generic point of $Z$. Let $^Z$ be the base moduli part of $f: (X,,B,)arrow Z$ and let $^Z'$ be the base moduli part of $f': (X',',B',)arrow Z$. Then $^Z_ R^Z'$.
Possibly passing to a common base and resolve indeterminacy of the induced birational map $X X'$, we may assume that $f=f'$, $X=X'$, $Z=Z'$, and $='$ over the generic point of $Z$, $f: (X,)arrow (Z,_Z)$ is equi-dimensional toroidal for some $ B B'$, and $(Z,_Z)$ is log smooth. Let $_Z$ and $_Z'$ be two foliations on $Z$ such that $=f^-1_Z$ and $'=f'^-1_Z'$,
$$R:=_D D is an _Z-invariant prime divisor(f^*D-f^-1(D)),$$
and
$$R':=_D D is an '_Z-invariant prime divisor(f^*D-f^-1(D)).$$
Then $^Z$ and $^Z'$ are the moduli parts of $f: (X,B-R,)arrow Z$ and $f': (X,B'-R',)arrow Z$ respectively. Since $(X,B-R,)$ and $(X',B'-R',)$ are crepant over the generic point of $Z$, by Lemma [lem: m preserved under crepant], $^Z_ R^Z'$.
Let $(X,,B,)/U$ be a sub-gfq and $f: Xarrow Z$ a contraction$/U$ such that $f: (X,,B,)arrow Z$ is an lc-trivial fibration with discriminant $$-divisor $$. Let $_Z$ be a foliation on $Z$ such that $=f^-1_Z$. Then for any prime divisor $D$ on $Z$,
$$_D_Z=__Z(D)-\{t 0 (X,,B+tf^*D,) is sub-lc over the generic point of D\}.$$
Moreover, there exists an lc center of $$(X,,B+(__Z(D)-_D_Z)f^*D,)$$ over the generic point of $D$.
Let $B_Z:=_Z$. By Definition-Lemma [deflem: cbf gfq], possibly replacing $f: Xarrow Z$ with an equi-dimensional model of $f: (X,B,)arrow Z$, we may assume that $X$ is $$-factorial klt with at most toric quotient singularities, $f$ is equi-dimensional, $$ descends to $X$, and there exists a toroidal morphism $f: (X,_X,)arrow (Z,_Z)$ such that $ B_X$. We define
$$R:=_D D is an _Z-invariant prime divisor(f^*D-f^-1(D)).$$
For any prime divisor $D$ on $Z$, we define
$$b_D:=1-\{t 0 (X,B-R+tf^*D,) is lc over the generic point of D\}$$
and
$$t_D:=__Z(D)-\{t 0 (X,,B+tf^*D,) is lc over the generic point of D\}.$$
By definition, $_DB_Z=b_D$ for any prime divisor $D$ on $Z$. There are three cases.
1. $D$ is not $_Z$-invariant. In this case, $R=0$ and $K_=K_X$ over the generic point of $D$, so
Thus $b_D=t_D$. Moreover, any lc center of $(X,B-R+(1-b_D)f^*D,)$ over the generic point of $D$ is an lc center of $(X,,B+(1-b_D)f^*D,)$ over the generic point of $D$. Since $(X,B-R+(1-b_D)f^*D,)$ is a g-sub-pair over the generic point of $D$, by Lemma [lem: alg int foliation lct achieved], there exists an lc center of $(X,B-R+(1-b_D)f^*D,)$ over the generic point of $D$. Thus there exists an lc center of $(X,,B+(1-b_D)f^*D,)$ over the generic point of $D$.
2. $D$ is $_Z$-invariant and $D_Z$. Let $B^h$ be the horizontal$/Z$ part of $B$, then $B=B^h$ over the generic point of $D$. Since $(X,,B,)$ is sub-lc over the generic point of $Z$, $_X B^h$. By [Lemma 6.6]LLM23, $(X,B^h+f^-1(D),)$ is sub-lc over the generic point of $D$. Since
$$(X,B-R+f^*D,)=(X,B^h+f^-1(D),)$$
over the generic point of $D$, $b_D=0$. Thus $_DB_Z=0$. Since $D$ is $_Z$-invariant, any component of $f^-1(D)$ is $$-invariant. Since $B=B^h$ over the generic point of $D$, any component of $f^-1(D)$ is an lc center of $(X,,B,)$. In particular,
$b_D=0=t_D.$
3. $D$ is $_Z$-invariant and $D_Z$. Then
$$-b_D=\{t (X,B+f^-1(D)+tf^*D,) is sub-lc over the generic point of D\}.$$
Since $f: (X,_X,)arrow (Z,_Z)$ is toroidal, there exists a component $S$ of $f^*D$, such that
- $_S(B+f^-1(D)-b_Df^*D)=1$, and
- $0 B+f^-1(D)-tf^*D$ over the generic point of $D$ for any $t<-b_D$.
Therefore, $_S(B-b_Df^*D)=0$, and $0 B-b_Df^*D$ over the generic point of $D$. Thus
$$-b_D \{t 0 (X,,B+tf^*D,) is sub-lc over the generic point of D\}=-t_D.$$
Suppose that $-b_D>-t_D$. Let $s (-t_D,-b_D)$ be a real number, then $$(X,B+f^-1(D)+sf^*D,)$$ is sub-lc over the generic point of $D$, and $(X,,B+sf^*D,)$ is not sub-lc over the generic point of $D$. Then there exists a prime divisor $D_X$ over $X$, such that the image of $D_X$ on $Z$ is $D$, and $a(D_X,,B+sf^*D,)<-_(D_X)$. By Definition-Theorem [defthm: weak ss reduction], there exists an equi-dimensional model $f': (X',_X',)arrow (Z',_Z')$ of $f: (X, B+ f^*D,)arrow Z$ associated with $h: X'arrow X$ and $h_Z: Z'arrow Z$, such that $D_X$ is on $X'$. Let $':=h^-1$, $_Z':=h_Z^-1_Z$, $K_'+B'+_X':=h^*(K_+B+_X)$, $D':=(h_Z^-1)_*D$, and
$$R':=_L L is an _Z'-invariant prime divisor(f'^*L-f'^-1(L)).$$
Then $D_X$ is a component of $f'^-1(D')$. Since $D'$ is $_Z'$-invariant and $'=f'^-1_Z'$, $D_X$ is $'$-invariant. Since $a(D_X,,B+sf^*D,)<-_(D_X)$, $_D_X(B'+sf'^*D')>0$. By Definition-Lemma [deflem: cbf gfq](1),
a contradiction. Thus $b_D=t_D$. Since $_S(B-t_Df^*D)=0$, $S$ is an lc center of $(X,B-b_Df^*D,)$ over the generic point of $D$. The lemma follows in this case.
Let $(X,,B,)/U$ be a sub-gfq and $f: Xarrow Z$ a contraction$/U$ such that $f: (X,,B,)arrow Z$ is an lc-trivial fibration. Let $$ be the discriminant $$-divisor of $f: (X,,B,)arrow Z$, $B_Z:=_Z$, and $^Z$ the base moduli part of $f: (X,,B,)arrow Z$. Let $_Z$ be a foliation on $Z$ such that $=f^-1_Z$. Then:
- If the vertical$/Z$ part of $B$ is $ 0$, then $B_Z 0$.
- If $(X,,B,)$ is sub-lc (resp. lc), then $(Z,_Z,B_Z,^Z)$ is sub-lc (resp. lc).
- Any lc center of $(Z,_Z,B_Z,^Z)$ is the image of an lc center of $(X,,B,)$.
- The image of any lc center of $(X,,B,)$ on $Z$ is an lc center of $(Z,_Z,B_Z,^Z)$.
The proposition immediately follows from Lemma [lem: td=bd].
Finally, we state the following proposition that can be useful for inductive purposes.
Let $(X,,B,)$ be a sub-gfq and $X$ two contractions$/U$. Let $h:=g f$. Suppose that $h: (X,,B,)arrow Z$ is an lc-trivial fibration. Let $(Z,_Z,B_Z,^Z)$ be the sub-gfq induced by $h: (X,,B,)arrow Z$. Then:
- $f: (X,,B,)arrow Y$ is an lc-trivial fibration.
- Let $(Y,_Y,B_Y,^Y)$ be a sub-gfq induced by $f: (X,,B,)arrow Y$. Then:
- $g: (Y,_Y,B_Y,^Y)arrow Z$ is an lc-trivial fibration.
- The discriminant part of $g: (Y,_Y,B_Y,^Y)arrow Z$ is $B_Z$.
- $(Z,_Z,B_Z,^Z)$ is a sub-gfq induced by $g: (Y,_Y,B_Y,^Y)arrow Z$.
Possibly replacing $X$ and $Y$ with high models, we may assume that $X$ and $Y$ are smooth, and $_(X/Z,-B^ 0)=0.$
(1) Since $(X,,B,)$ is sub-lc over the generic point of $Z$, $(X,,B,)$ is sub-lc over the generic point of $Y$. Since $K_+B+_X_ R,Z0,$ $K_+B+_X_ R,Y0$. Since $_(X/Z,-B^ 0)=0$, $_(X/Y,-B^ 0)=0$. This implies (1).
(2.a) Since $(X,,B,)$ is sub-lc over the generic point of $Z$, by Theorem [thm: cbf gpair nonnqc], $(Y,_Y,B_Y,^Y)$ is sub-lc over the generic point of $Z$. Since
$$f^*(K__Y+B_Y+_Y)_ RK_+B+_X_ R,Z0,$$
$K__Y+B_Y+_Y_ R,Z0$. By Lemma [lem: td=bd], for any component $D$ of $B_Y^ 0$ and any irreducible component $D_X$ of $f^-1(D)$ over the generic point of $D$, $D_X$ is a component of $B^ 0$. Therefore, over the generic point of $Z$, there exists a positive real number $$ such that
$$-B^ 0 f^*(-B_Y^ 0).$$
Thus
$$0 _(X/Z,f^*(-B_Y^ 0))=_(X/Z, f^*(-B_Y^ 0)) _(X/Z,-B^ 0)=0,$$
so
$$_(Y/Z,-B_Y^ 0)=_(X/Z,f^*(-B_Y^ 0))=0.$$
Therefore, $g: (Y,_Y,B_Y,^Y)arrow Z$ is an lc-trivial fibration.
(2.b) Let $B_Z'$ be the discriminant part of $g: (Y,_Y,B_Y,^Y)arrow Z$. For any prime divisor $D$ over $Z$, let $s_D:=__Z(D)-_DB_Z$ and $s'_D:=__Z(D)-_DB_Z'$.
By Lemma [lem: td=bd], for any positive real number $t$ and any prime divisor $D$ on $Z$,
$$(Y,_Y,B_Y+tg^*D,)$$
is the sub-gfq induced by $f: (X,,B+th^*D,)arrow Y$ over the generic point of $D$. By Proposition [prop: gfq cbf preserve sing](3)(4),
Thus $B_Z=B_Z'$.
(2.c) By applying (2.b) to all high models of $Z$, we get (2.c).
# Canonical bundle formula for lc-trivial morphisms and subadjunction formula
## Canonical bundle formula for lc-trivial morphisms
[[Proposition 3.4]Dru21; cf. [Proposition 3.7]Spi20]
Let $f: X'arrow X$ be a surjective finite morphism between normal varieties and $$ a foliation on $X$. Assume that $K_$ is $$-Cartier and $':=f^-1$. For any prime divisor on $X$, we let $r_D$ be the ramification index of $f$ along $D$. We call
$$R:=_D D is a non--invariant prime divisor(r_D-1)D$$
the ramification divisor of $f$ with respect to $$. Then we have
$$K_'=f^*K_+R.$$
Let $(X,,B,)/U$ be a sub-gfq and $f: Xarrow Z$ a finite morphism$/U$. Suppose that there exists a foliation $_Z$ on $Z$ such that $=f^-1_Z$, and suppose that $K_+B+_X_ R,Z0$.
We define two $$-divisors, $$ on $^Z$ on $Z$, in the following way. Let $h_Z: Z'arrow Z$ be any birational morphism, $X'$ the main component of $Z'_ZX$, $f': X'arrow Z'$ and $h: X'arrow X$ the induced morphisms, $':=h^-1$, and $_Z':=h_Z^-1_Z$. We let $$K_'+B'+_X':=h^*(K_+B+_X).$$
Let $Z'^0$ be the largest open subset of $Z'$ which does not contain $(_Z')(Z')$ and let $X'^0:=f'^-1(Z'^0)$. By Definition-Lemma [deflem: hurwitz foliation],
$$K_'|_X'^0=(f'|_X'^0)^*K__Z'|_Z'^0+R'^0$$
where $R'^0$ is the ramification divisor of $f'|_X'^0$ with respect to $_Z'|_Z'^0$. We let $R'$ be the closure of $R'^o$ in $X'^o$. We let $$ and $^Z$ be the $$-divisors such that $_Z'=1 ff'_*(R'+B')$ and $^Z_Z'=1 ff'_*_X'$ for any choices of $Z'$. Then:
- $$ and $$ are well-defined and uniquely determined.
- For any choice of $Z'$,
$$K_'+B'+_X'_ Rf'^*(K__Z'+B_Z'+^Z_Z').$$
- $^Z$ is nef$/U$.
- If $B 0$, then $_Z 0$.
- If $(X,,B,)$ is (sub-)lc, then $(Z,_Z,_Z,^Z)$ is (sub-)lc, and for any lc center $T$ of $(Z,_Z,B_Z,^Z)$, any component of $f^-1(T)$ is an lc center of $(X,,B,)$.
- If $$ is NQC$/U$, then $^Z$ is NQC$/U$.
We call $$ the discriminant $$-divisor of $f: (X,B,)arrow Z$, and call $B_Z:=_Z$ the discrminant part of $f: (X,B,)arrow Z$. We call $^Z$ the base moduli part of $f: (X,B,)arrow Z$. We say that $(Z,_Z,B_Z,^Z)/U$ is the sub-gfq induced by $f: (X,,B,)arrow Z$.
(1) We only need to show that for any birational morphism $g_Z: Z''arrow Z'$, $(g_Z)_*_Z''=_Z'$ and $(g_Z)_*^Z_Z''=^Z_Z'$. We let $X''$ be the main component of $X'_Z'Z''$ and $g: X''arrow X'$, $f'': X''arrow Z''$ the induced morphisms. Let $'':=g^-1',_Z'':=g^-1_Z_Z'$, $Z''^0$ be the largest open subset of $Z''$ which does not contain $(_Z'')(Z'')$, $X''^0:=f'^-1(Z''^0)$, $R''^0$ the ramification divisor of $f''|_X''^0$ with respect to $_Z''|_Z''^0$, and $R''$ the closure of $R''^0$ in $X''$. Then
$$_Z'=1 ff'_*(B'+R')=1 ff'_*g_*(B''+R'')=1 f(g_Z)_*f''_*(B''+R'')=(g_Z)_*_Z''$$
and
$$^Z_Z'=1 ff'_*_X'=1 ff'_*g_*_X''=1 f(g_Z)_*f''_*_X''=(g_Z)_*^Z_Z''.$$
(2) By (1), we only need to prove (2) for any sufficiently high model $Z'$ of $Z$. In particular, we may assume that $Z'$ is $$-factorial. Then $f'^*(1 ff'_*R')=R'$, $f'^*(1 ff'_*B')=B'$, and $f'^*(1 ff'_*_X')=_X'$, so (2) immediately follows.
(3)(6) By [Lemma 4.2]HL21b, there exists a birational morphism $h_Z: Z''arrow Z$ satisfying the following. Let $X''$ be the main component of $Z''_ZX$, then $$ descends to $X''$. By definition, $^Z$ descends to $Z''$. Since $_X''$ is nef, $^Z_Z''$ is nef. Thus $^Z$ is nef. This implies (3). Moreover, if $$ is NQC$/U$, then $_X''$ is NQC$/U$, so $^Z_Z''$ is NQC$/U$, hence $^Z$ is NQC$/U$. This implies (6).
(4) It is obvious from the definition of $$.
(5) By (4), we only need to prove the sub-lc case. Suppose that $(X,,B,)$ is sub-lc, then $(X',',B',)$ is sub-lc. Let $D$ be a prime divisor on $Z'$. Let $E_1,,E_m$ be all components of $f'^-1(D)$ and let $r_i$ be the ramification index of $r_i$ along $E_i$.
If $D$ is $_Z'$-invariant, then each $E_i$ is $$-invariant $E_i R'$. Since $(X',',B',)$ is sub-lc, $_E_iB' 0$ for any $i$. Thus
$$_D_Z'=_D1 ff'_*(B'+R')=_i=1^m1 f(_E_iB') 0=__Z'(D).$$
Moreover, if $D$ is an lc place of $(Z,_Z,B_Z,^Z)$, then $_D_Z'=0$, so $_E_iB'=0$ for each $i$. Therefore, each $E_i$ is an lc place of $(X',',B',)$, hence an lc place of $(X,,B,)$.
If $D$ is $_Z$-invariant, then each $E_i$ is not $$-invariant, and $_i=1^mr_i f$. Since $(X',',B',)$ is sub-lc, $_E_iB' 1$ for any $i$. Thus
$$_D_Z'=_D1 ff'_*(B'+R')=_i=1^m1 f(r_i-1+_E_iB')_i=1^mr_i f 1=__Z'(D).$$
Moreover, if $D$ is an lc place of $(Z,_Z,B_Z,^Z)$, then $_D_Z'=1$, so $_E_iB'=1$ for each $i$. Therefore, each $E_i$ is an lc place of $(X',',B',)$, hence an lc place of $(X,,B,)$.
Since $h_Z: Z'arrow Z$ can be any birational morphism, we get (5).
[lc-trivial morphism]
Let $(X,,B,)/U$ be a sub-gfq and $f: Xarrow Z$ a projective surjective morphism over $U$. Let $X Z$ be the Stein factorization of $f$. We say that $f: (X,,B,)arrow Z$ is an lc-trivial morphism, if
- $K_+B+_X_,Z0$,
- $: (X,,B,)arrow Z$ is an lc-trivial fibration, and
- there exists a foliation $_Z$ on $Z$ such that $=f^-1_Z$.
[Canonical bundle formula for lc-trivial morphisms]
Let $$(X,,B,)/U$$ be a sub-gfq and $f: Xarrow Z$ an lc-trivial morphism$/U$, and let $_Z$ be a foliation on $Z$ such that $=f^-1_Z$. Then there is a sub-gfq $(Z,_Z,B_Z,^Z)/U$, such that $B_Z$ is uniquely determined and $^Z$ is determined up to $$-linear equivalence, defined in the following way.
Let $X Z$ be the Stein factorization of $f$. By Definition-Lemma [deflem: cbf gfq], there exists a sub-gfq $$( Z,_ Z,B_ Z,^Z)/U$$
induced by $: (X,,B,)arrow Z$, such that $B_ Z$ is uniquely determined, and $^Z$ is uniquely determined up to $$-linear equivalence. Moreover, we have $_ Z=^-1_Z$ and
$$K__ Z+B_ Z+^Z_ Z_ R,Z0.$$
By Definition-Lemma [deflem: cbf finite], there exists a sub-gfq
$$(Z,_Z,B_Z,^Z)/U$$
induced by $: ( Z,_ Z,B_ Z,^Z)arrow Z$, such that $B_Z$ is uniquely determined, and $^Z$ is uniquely determined up to $$-linear equivalence. We say that $B_Z$ is the discriminant part of $f: (X,,B,)arrow Z$, $^Z$ the base moduli part of $f: (X,,B,)arrow Z$, and say that $(Z,_Z,B_Z,^Z)$ is a sub-gfq induced by $f: (X,,B,)arrow Z$.
Moreover, we have the following:
- If the vertical$/Z$ part of $B$ is $ 0$, then $B_Z 0$.
- If $(X,,B,)$ is (sub-)lc, then $(Z,_Z,B_Z,^Z)$ is (sub-)lc.
- $B_Z$ is uniquely determined, and $^Z$ is uniquely determined up to $$-linear equivalence.
- Suppose that $(X,,B,)$ is sub-lc. Then for any lc center $T$ of $(Z,_Z,B_Z,^Z)$, $T$ is the image of an lc center of $(X,,B,)$ on $Z$.
(1) It follows from Definition-Lemma [deflem: cbf finite](4) and Proposition [prop: gfq cbf preserve sing](1).
(2) It follows from Definition-Lemma [deflem: cbf finite](5) and Proposition [prop: gfq cbf preserve sing](2).
(3) It follows from Definition-Lemma [deflem: cbf gfq](1) and Definition-Lemma [deflem: cbf finite](1).
(4) It follows from Proposition [prop: gfq cbf preserve sing](3) and Definition-Lemma [deflem: cbf finite](5).
## Subadjunction formula for g-pairs
In this section, we shall introduce and discussion the subadjunction formula for lc g-pairs. Since the canonical bundle formula for lc-trivial fibrations for gfqs requires that the general fibers are tangent to the foliation, the subadjunction formula for foliations is more subtle and we will omit it in this paper.
[Subadjunction formula via log resolutions]
Let $(X,B,)/U$ be a g-sub-pair and $V$ an lc center of $(X,B,)$ with normalization $: Warrow V$, such that $B 0$ near the generic point of $V$. Then there exists a naturally defined g-sub-pair $(W,B_W,^W)/U$ defined in the following way.
Let $S$ be an lc place of $(X,B,)$ so that $_XS=V$. Let $h: Yarrow X$ be a log resolution of $(X, B)$ such that $$ descends to $Y$ and $S$ is on $Y$. We let
$$K_Y+B_Y+_Y:=h^*(K_X+B+_X)$$
and let $(S,B_S,^S)/U$ be the g-sub-pair induced by the adjunction
$$K_S+B_S+^S_S:=(K_Y+B_Y+_Y)|_S.$$
Then there exists an induced projective surjective morphism $h_S: Sarrow W$ such that $ f_S=h|_S$. By construction, we have
$$K_S+B_S+^S_S_ R,W0.$$
Since $B 0$ near the generic point of $V$, $B_W 0$ near the generic point of $S$. Therefore, $h_S: (S,B_S,^S)arrow W$ is an lc-trivial morphism. By Definition-Theorem [defthm: cbf lctrivial morphism], there exists a g-sub-pair $(W,B_W,^W)/U$ induced by $h_S: (S,B_S,^S)arrow W$. Moreover, we have the following:
- For any fixed choice and $S$, $B_W$ is uniquely determined, and $^W$ is uniquely determined up to $$-linear equivalence. In particular, $B_W$ and the $$-linear equivalence class of $^W$ are independent of the choice of $h$.
- $K_W+B_W+_W_ R(K_X+B+_X)|_W$.
- If $(X,B,)$ is sub-lc near $V$, then $(W,B_W,^W)$ is sub-lc.
- Suppose that $(X,B,)$ is sub-lc near $V$. Then for any lc center $T$ of $(W,B_W,^W)$, $(T)$ is an lc center of $(X,B,)$.
We say that $(W,B_W,^W)/U$ is a g-sub-pair induced by subadjunction
$$K_W+B_W+^W_W:=(K_X+B+_X)|_W$$
and say that $(W,B_W,^W)$ is associated with $S$.
The construction is clear so we only need to prove (1-4).
(1) We let $h': Y'arrow X$ be a log resolution of $(X, B)$ such that $$ descends to $Y'$ and $S$ on $Y$, so that the induced birational map $g: Y'arrow Y$ is a morphism. Let $S':=g^-1_*S$,
$$K_Y'+B_Y'+_Y':=h'^*(K_X+B+_X),$$
and let $(S',B_S',^S)/U$ be the g-sub-pair induced by the adjunction
$$K_S'+B_S'+^S_S':=(K_Y'+B_Y'+_Y')|_S.$$
Then $g|_S': S'arrow S$ is a morphism, and we have
By our construction, the g-sub-pair induced by $h_S g|_S': (S',B_S',^S)arrow W$ is equal to the g-sub-pair induced by $h_S: (S,B_S,^S)arrow W$ modulo $$-linear equivalence of the base moduli part. Since $h'$ can be any high log resolution of $(X, B)$, (1) follows.
(2) It immediately follows from the definition.
(3) Since $(X,B,)$ is sub-lc near $V$, $(W,B_W,)$ is sub-lc near $S$. Thus $(S,B_S,^S)$ is sub-lc. By Definition-Lemma [defthm: cbf lctrivial morphism](1), we get (3).
(4) By Definition-Theorem [defthm: cbf lctrivial morphism], $T$ is the image of an lc center $T_S$ of $(S,B_S,^S)$ on $W$. Since $(S,B_S,^S)$ is log smooth, $T_S$ is also an lc center of $(Y,B_Y,)$. Thus $h(T_S)$ is an lc center of $(X,B,)$. By construction, $(T)=h(T_S)$.
[Subadjunction formula via dlt models]
Let $(X,B,)/U$ be an g-sub-pair and $V$ an lc center of $(X,B,)$ with normalization $: Warrow V$, such that $(X,B,)$ is lc near $W$. Let $S$ be an lc place of $(X,B,)$ such that $_XS=V$. Let $(W,B_W,^W)/U$ be a g-sub-pair induced by subadjunction
$$K_W+B_W+^W_W:=(K_X+B+_X)|_W$$
and is associated with $S$.
Suppose that $f: Yarrow X$ is a dlt modification of $(X,B,)$ near $W$ such that $S$ is on $Y$. Let
$$K_Y+B_Y+_Y:=f^*(K_X+B+_X),$$
$(S,B_S,^S)/U$ the g-sub-pair induced by the adjunction
$$K_S+B_S+^S_S:=(K_Y+B_Y+_Y)|_S,$$
and $f_S: Sarrow W$ the induced projective surjective morphism such that $ f_S=f|_S$. Then:
- $(W,B_W,^W)$ is the g-pair induced by $f_S: (S,B_S,^S)arrow W$.
- $(W,B_W,^W)$ is lc.
Let $g: Y'arrow Y$ be a log resolution of $(Y, B_Y)$ such that $$ descends to $Y'$,
$$K_Y'+B_Y'+_Y':=g^*(K_Y+B_Y+_Y),$$
$S':=g^-1_*S$, and let $(S',B_S',^S)/U$ be the g-sub-pair induced by the adjunction
$$K_S'+B_S'+^S_S':=(K_Y'+B_Y'+_Y')|_S'.$$
Then $g|_S': S'arrow S$ is a morphism, and we have
By our construction, $(W,B_W,^W)/U$ is the g-sub-pair induced by $f_S g|_S': (S',B_S',^S)arrow W$, which is equal to the g-sub-pair induced by $f_S: (S,B_S,^S)arrow W$ modulo $$-linear equivalence of the base moduli part. By Definition-Theorem [defthm: cbf lctrivial morphism](2), $(W,B_W,^W)$ is lc.
Let $(X,B,)/U$ be a dlt g-pair and $f: (X,B,)arrow Y$ a dlt crepant log structure$/U$ (Definition [defn: lc cls]). Let $Z Y$ be an lc center of $f: (X,B,)arrow Y$ with normalization $: Z^narrow Z$. Let $$ be the set of all lc centers of $(X,B,)$ which dominate $Z$ and let $S$ be an element that is minimal under inclusion. Let $(S,B_S,^S)$ be the g-pair induced by adjunction
$$K_S+B_S+^S_S:=(K_X+B+_X)|_S,$$
$f_S: Sarrow Z^n$ the induced morphism such that $ f_S=f|_S$, and let $f^n_S: S V Z^n$ be the Stein factorization of $f|_S: Sarrow Z$.
Then:
- [(1)] (Crepant log structure) $(S,B_S,^S)$ is dlt, $K_S+B_S+^S_S_,Z0$, and $(S,B_S,^S)$ is klt over the generic point of $Z$. In particular, $f|_S: (S,B_S,^S)arrow Z$ is a dlt crepant log structure and an lc-trivial morphism.
We let
$$(V,B_V,^V)/U$$
be the g-pair induced by the lc-trivial fibration $: (S,B_S,^S)arrow V$. Then:
- [(2)] (Uniqueness of sources) The crepant birational equivalence class of $(S,B_S,^S)$ does not depend on the choice of $S$. We call the crepant birational equivalence class of $(S,B_S,^S)$ as the source of $Z$ with respect to $f: (X,B,)arrow Y$, and is denoted by $(Z,X,B,)$.
- [(3)] (Uniqueness of springs) $(V,B_V,^V)$ modulo the $$-linear equivalence class of $^V$ is unique up to isomorphism. We call $(V,B_V,^V)$ as the spring of $Z$ with respect to $f: (X,B,)arrow Y$, and is denoted by $(Z,X,B,)$.
- [(4)] (Adjunction) Let $W X$ be an lc center such that $Z Y_W:=f(W)$, and let $(W,B_W,^W)/U$ be the lc g-pair induced by repeatedly applying adjunction
$$K_W+B_W+^W_W:=(K_X+B+_X)|_W.$$
Let $_Y: Y_W^narrow Y_W$ be the normalization of $Y_W$, $f_W: Warrow Y_W^n$ the induced morphism such that $_Y f_W=f|_W$, and let
$$W_W V_W_WY_W$$
be the Stein factorization of $f_W$. Let $Z_W V_W$ be an irreducible subvariety such that $(_Y_W)(Z_W)=Z$, and $(V_W,B_V_W,^V_W)/U$ a g-pair induced by the lc-trivial fibration $_W: (W,B_W,^W)arrow V_W$. Then:
- $Z_W$ is an lc center of $(V_W,B_V_W,^V_W)$.
- $(Z,X,B,)=(Z_W,W,B_W,^W)$.
- $(Z,X,B,)=(Z_W,W,B_W,^W)$.
(1) By [Lemma 2.9]HL22, $(S,B_S,^S)$ is dlt. Since $K_X+B+_X_ R,Z0$, $K_S+B_S+^S_S_ R,Z0$. By Lemma [lem: inversion of adjunction gdlt] and since $S$ is minimal in $$, $(S,B_S,^S)$ is klt over the generic point of $Z$. (1) follows.
(2) By Theorem [thm: P1 link for gdlt crepant log structure], different choices of $S$ are $ P^1$-linked to each other, hence they are crepant equivalent to each other by Definition [defn: p1 link](3).
(3) It follows from (2) and Definition [defn: cbf gpair].
(4) By Lemma [lem: gdlt crepant log structure is compatible under subadjunction](3) and Theorem [thm: cbf gpair nonnqc], $Z_W$ is an lc center of $(V_W,B_V_W,^V_W)$ and an lc center of $_W: (W,B_W,^W)arrow V_W$. This implies (4.a).
Let $S'$ be a minimal lc center of $(W,B_W,^W)$ which dominates $Z_W$, then $S'$ is also an lc center of $(X,B,)$ which dominates $Z_W$. In particular, $S'$ dominates $Z$. If $S'$ is not minimal in $$, then there exists $S'' S'$ such that $S''$ dominate $Z$, so $_W(S'') Z_W$ and $_W(S'')$ dominates $Z$. This is not possible as $Z_W$ is irreducible and $_W$ is finite. Therefore, $S'$ is minimal in $$. This implies (4.b). (4.c) follows from (4.b) and (3).
[Subadjunction formula via minimal lc centers]
Let $(X,B,)/U$ be an g-sub-pair and $V$ an lc center of $(X,B,)$ with normalization $: Warrow V$, such that $(X,B,)$ is lc near $W$.
Suppose that $f: Yarrow X$ is a dlt modification of $(X,B,)$ near $W$ and let
$$K_Y+B_Y+_Y:=f^*(K_X+B+_X).$$
Let $$ be the set of all lc center of $(Y,B_Y,)$ whose image on $X$ is $V$, and let $S$ be a minimal element of $$ up to inclusion. Let $(S,B_S,^S)/U$ be the g-pair induced by repeating applying adjunction
$$K_S+B_S+^S_S:=(K_Y+B_Y+_Y)|_S,$$
and let $f_S: Sarrow W$ be the induced projective surjective morphism such that $ f_S:=f|_S$.
We let $(W,B_W,^W)/U$ be a g-pair induced by a canonical bundle formula of $f_S: (S,B_S,^S)arrow W$. Then:
- There exists an lc place $S'$ of $(X,B,)$ such that $_XS'=V$, $(W,B_W,^W)$ is a g-pair induced by subadjunction
$$K_W+B_W+^W_W:=(K_X+B+_X)|_W,$$
and $(W,B_W,^W)$ is associated with $S'$.
- $K_W+B_W+_W_ R(K_X+B+_X)|_W$.
- $(W,B_W,^W)$ is lc.
- For any lc center $T$ of $(W,B_W,^W)$, $(T)$ is an lc center of $(X,B,)$.
- $W$ does not depend on the choice of $S$ (but may depend on the choice of $f$).
We say that $(W,B_W,^W)/U$ is associated to $f$.
(1) We let $g: Y'arrow Y$ be the blow-up of the generic point of $S$ and let $S'$ be the reduced exceptional divisor. Let
$$K_Y'+B_Y'+_Y'=g^*(K_Y+B_Y+_Y).$$
Then $(Y',B_Y',)$ is dlt over a neighborhood of $W$. Let $(S',B_S',^S')/U$ be the g-pair induced by adjunction
$$K_S'+B_S'+^S'_S':=(K_Y'+B_Y'+_Y')|_S'.$$
Since $(Y,B_Y)$ is log smooth near the generic point of $S$ and $$ descends to $Y$ near the generic point of $S$, $g|_S': S'arrow S$ is a contraction, and $(S,B_S,^S)$ is induced by $g|_S' (S',B_S',^S')arrow S$.
Thus the Stein factorization of the induced morphism $S'arrow W$ factors through $S$. By Proposition [prop: composition lc trivial fibration], we get (1).
(2) It follows from (1) and Definition-Theorem [defthm: subadjun](2).
(3) It follows from (1) and Proposition [prop: lc subadj is lc](2).
(4) It follows from (1) and Definition-Theorem [defthm: subadjun](4).
(5) It follows from Definition-Theorem [thm: spring and source for glc crepant log structure].
# Stratification of generalized pairs and Du Bois property
The goal of this section is to study the stratification properties of lc generalized pairs and prove Theorem [thm: glc sings are Du Bois].
## Stratification
In this subsection we recall some basic definitions of stratifications.
[[Definition 9.15]Kol13]
Let $X$ be a scheme. A stratification of $X$ is a decomposition of $X$ into a finite disjoint union of reduced locally closed subschemes. We will consider stratifications where the strata are of pure dimensions
and are indexed by their dimensions. We write $X=_iS_iX$ where $S_iX X$ is the $i$-th
dimensional stratum. Such a stratified scheme is denoted by $(X,S_*)$. We also
assume that $_i jS_iX$ is closed for every $j$. The boundary of $(X,S_*)$ is the closed subscheme
$$
B(X,S_*):=_i< XS_iX=X S_ XX,
$$
and is denoted by $B(X)$ if the stratification $S_*$ is clear.
Let $(X, S_*)$ and $(Y, S_*)$ be stratified schemes. We say that $f: X Y$ is a stratified morphism if $f(S_iX) S_iY$ for every $i$. Since $S_iX$ are disjoint with each other, $f: X Y$ is a stratified morphism if and only if $S_iX=f^-1(S_iY)$.
Let $(Y, S_*)$ be a stratified scheme and $f:X Y$ a quasi-finite morphism such that $f^-1 (S_iY)$ has pure dimension $i$ for every $i$ . Then $S_iX:=f^-1(S_iY)$ defines a stratification of $X$. We denote it by $(X,f^-1S_*)$, and we say that $f:X(Y,S_*)$ is stratifiable.
[[Definition 9.16]Kol13]
Let $(X, S_*)$ be stratified variety. A relation $(_1,_2): Rrightarrows (X,S_*)$ is stratified if each $_i$ is stratifiable and $_1^-1S_*=_2^-1S_*$. Equivalently,
there exists a stratification $(R,^-1S_i)$, such that $r^-1S_iR$ if and only if $_1(r) S_iX$ and if and only if $_2(r) S_iX$.
[[Definition 9.18]Kol13]
Let $(X,S_*)$ be a stratified scheme such that $X$ is an excellent scheme. The normality conditions (N), (SN), (HN), and (HSN) are defined in the following ways.
- [(N)] We say that $(X,S_*)$ has normal strata, or that it satisfies (N), if each $S_iX$ is normal.
- [(SN)] We say that $(X,S_*)$ has semi-normal boundary, or that it satisfies (SN), if $X$ and $B(X,S_*)$ are both semi-normal.
- [(HN)] We say that $(X,S_*)$ has hereditarily normal strata, or that it satisfies (HN), if
- the normalization $: (X^n,^-1S_*) (X,S_*)$ is stratifiable,
- $(X^n,^-1S_*)$ satisfies (N), and
- $B(X^n,^-1S_*)$ satisfies (HN).
- [(HSN)] We say that $(X,S_*)$ has hereditarily semi-normal boundary, or that it
satisfies (HSN), if
- the normalization $: (X^n,^-1S_*) (X,S_*)$ is stratifiable,
- $(X,^-1S_*)$ satisfies (SN), and
- $B(X^n,^-1S_*)$ satisfies (HSN).
Next we give a special stratification that is induced by the lc crepant log structure.
[Lc stratification for generalized pairs]
Let $f:(X,,) Z$ be an lc crepant log structure. Let $S^*_i(Z,X,,) Z$ be the union of all $ i$-dimensional lc centers of $f:(X,,) Z$, and
$$
S_i(Z,X,,):=S^*_i(Z,X,,)~ ~S^*_i-1(Z,X,,).
$$
If the lc crepant log structure $f:(X,,) Z$ is clear from the context, we will use $S_i(Z)$ for abbreviation. It is clear that each $S_i(Z)$ is a locally closed subspace of $Z$ of pure dimension $i$, and $Z$ is the disjoint union of all $S_i(Z)$.
The stratification of $Z$ induced by $S_i(Z)$ is called the lc stratification of $Z$ induced by $f:(X,,) Z$. Since this is the only stratification we are going to use in the rest of this paper, we usually will not emphasize the lc crepant structure $f:(X,,) Z$, and we will denote the corresponding stratified scheme by $(Z,S_*)$. The boundary of $(Z,S_*)$ is the closed subspace
$$B(Z,S_*):=Z S_ Z(Z)=_i< ZS_i(Z).$$
We say that a semi-normal stratified space $(Y,S_*)$ is of lc origin if $S_i(Y)$ is unibranch for any $i$, and there are lc crepant log structures $f_j:(X_j,_j,^j) Z_j$ with lc stratifications $(Z_j,S_*^j)$ and a finite surjective stratified morphism $: _j(Z_j,S_*^j) (Y,S_*)$.
## Semi-normality of lc centers and lc origin
In this subsection we show that lc centers of lc generalized pairs are semi-normal.
Let $f:(X,,) Z$ be an lc crepant log structure. Let $W Z$ be the union of all lc centers of $f:(X,,) Z$ except $Z$, and $B(W) W$ the union of all non-maximal (with respect to inclusion) lc centers that are contained in $W$. Then
- $W$ is semi-normal, and
- $W B(W)$ is normal.
Let $(Z,_Z,)/U$ be an lc g-pair induced by the canonical bundle formula$/U$ of $f: (X,,)arrow Z$. By Theorem [thm: cbf gpair nonnqc], the lc centers of $(Z,_Z,)$ are exactly the lc centers of $f: (X,,)arrow Z$. Possibly replacing $(X,,)$ with a dlt model of $(Z,_Z,)$, we may assume that $f$ is birational and $(X,,)$ is $ Q$-factorial dlt. We have $W=f()$. Let $':=\{\}$. We consider the exact sequence
$$
0_X(-)_X_
$$
and its push-forward
$$
_Z=f_*_X f_*_^1f_*_X(-).
$$
By [Lemma 3.4]HL22, we can find an $$-divisor $'' 0$ such that $$-_,ZK_X+'+_X_,ZK_X+''$$ and $(X,'')$ is klt. Since $-$ is a Weil divisor, by [Lemma 5.3, Theorem 5.6]HLS19, possibly perturbing $''$, we may assume that $''$ is a $$-divisor and
$$-_ Q,ZK_X+''.$$
By [Corollary 10.40]Kol13, $R^if_*_X(-)$ is torsion free for every $i$. On the other hand, $f_*_$ is supported on $W$, hence it is a torsion sheaf. Thus the connecting map $$ is zero, hence $_Z f_*_$ is surjective. Since this map factors through $_W$, we conclude that $_W f_*_$ is also surjective, hence an isomorphism.
Note that $$ has only nodes at codimension 1 points and it is $S_2$ by [Corollary 2.88]Kol13. By [Lemma 10.14]Kol13, $$ is semi-normal. By [Lemma 10.15]Kol13, $W$ is semi-normal. This is (1).
To prove (2), let $V$ be an irreducible component of its non-normal locus. Then $V$ is an lc center of $(X,)$, hence an lc center of $(X,,)$. Thus $f(V)$ is an lc center of $f: (X,,)arrow Z$. Hence either $f(V)$ is an irreducible component of $W$, or $f(V) B(W)$. Thus [Complement 10.15.1]Kol13 implies that $W B(W)$ is normal.
Let $(X,,)$ be an lc g-pair. Then $(X,,)$ is semi-normal.
It follows from Theorem [thm: glc locus is semi-normal] when $f$ is the identity morphism.
(cf. [Lemma 5.26]Kol13)
Let $f:(X,,) Z$ be a lc crepant log structure and $(Z,S_*)$ the induced lc stratification. Then
- $S_i(Z)$ is unibranch for every $i$, and
- $B(Z,S_*)$ is semi-normal.
(1) follows from Lemma [lem: intersection of lc center gpair](2) and (2) follows from Theorem [thm: glc locus is semi-normal].
(cf. [Proposition 4.42]Kol13)
Let $f: (X,,) Z$ be a dlt crepant log structure, $(Z,S_*)$ its induced lc stratification, and $Y X$ an lc center of $(X,,)$. Let $(Y,,^Y)/Z$ be the dlt g-pair induced by adjunction to higher-codimensional lc center $Y$, i.e.
$$K_Y+_Y+^Y_Y:=(K_X++_X)|_Y.$$
We consider the Stein factorization of $f|_Y$
$$(Y,_Y,^Y)_Y.$$
Then:
- $f_Y:(Y,_Y,^Y) W$ is a dlt crepant log structure which induces an lc stratification $(W,S_*)$.
- $S_i(W)=^-1(S_i(Z))$ for every $i$.
It follows from Lemma [lem: intersection of lc center gpair].
Let $f:(X,,) Z$ be an lc crepant log structure and $(Z,S_*)$ the induced lc stratification. Then $(Z,S_*)$ satisfies (HN) and (HSN).
By Lemma [lem: (Z,S) is U and SN] and [Definitions 9.18,~9.19]Kol13, $(Z,S_*)$ satisfies (HU) and (HSN). By [Theorem 9.21]Kol13, $(Z,S_*)$ satisfies (HN).
(cf. [5.29]Kol13)
Every lc stratification is of lc origin. More precisely, let $f:(X,,) W $ be an lc crepant log structure and $Y W$ any union of lc centers. Then $(Y, S_*)$ is of lc origin, where $S_i(Y)=Y S_i(W)$ for each $i$.
By Theorem [thm: (Z,S) is HN and HSN] and [Theorem 9.26]Kol13, we know that $Y$ is semi-normal and $S_i(Y)$ is unibranch for each $i$. Then we can apply Lemma [lem: stratification is compatible under adjunction] to each lc center of $f: (X,,)$ contained in $Y$ to conclude that $(Y,S_*)$ is of lc origin.
## Du Bois property
In this subsection, we show that lc generalized pairs have Du Bois singularities. This subsection is parallel to [Section 6]LX23b.
We recall the following definition in [Kov11] (cf. [Definition 6.10]Kol13).
A DB pair $(X,)$ consists of a reduced scheme $X$ of finite type and a closed reduced subscheme $$ in $X$ such that the natural morphism
$$
_ X _X,^0
$$
is a quasi-isomorphism. We will also say $(X,)$ is DB in this case.
The definition of DB pairs is subtle but what really matters here is the following lemma:
[[Proposition 6.15]Kol13]
Let $(X,)$ be a DB pair. Then $X$ has Du Bois singularities if and only if $$ has Du Bois singularities.
The following theorems are analogues of [Theorems 6.31, 6.33]Kol13 for g-pairs and the proofs are similar. For the reader's convenience, we provide full proofs here.
Let $(X,B,)/U$ be an lc g-pair and $f: (X,B,)arrow Z$ an lc-trivial fibration.
Let $W Z$ be the union of lc centers of $f: (X,B,)arrow Z$ except $Z$. Then $(Z,W)$ is a DB pair.
Let $(Z,B_Z,^Z)/U$ be a g-pair induced by $f: (X,B,)arrow Z$. By Theorem [thm: cbf gpair nonnqc], the lc centers of $(Z,B_Z,^Z)$ are exactly the lc centers of $f: (X,B,)arrow Z$. Thus we can assume that $f$ is the identity morphism, $(X,B,)=(Z,B_Z,^Z)$, and $W=(X,B,)$.
Let $g: Y X$ be a log resolution of $(X, B)$ such that $$ descends to $Y$ and $F:=g^-1(W)$ is an snc divisor. Let
$$K_Y+B_Y+_Y:=g^*(K_X+B+_X)$$
and $D:=B_Y^=1$. Since $_Y$ is nef$/X$ and big$/X$, there exists $0 B'_Y_,X_Y$ such that $(Y,B_Y-D+B'_Y)$ is sub-klt. Possibly replacing $Y$ with a higher resolution, we may assume that $(Y, B_Y D B_Y')$ is log smooth. Let
$$ B_Y:=(B_Y-D+B'_Y)^0+\{(B_Y-D+B'_Y)^ 0\}$$ and
$$E:= (B_Y-D+B'_Y)^ 0,$$ then $ B_Y=0$ and $E$ is a g-exceptional Weil divisor. In particualr, $(Y, B_Y)$ is klt.
Since $E-D-F$, we have natural maps:
$$
g_*_Y(-F) Rg_*_Y(-F) Rg_*_Y(E-D).
$$
Since $E-D_,XK_Y+ B_Y$ and $E-D$ is a Weil divisor, by [Lemma 5.3, Theorem 5.6]HLS19, $E-D_,XK_Y+ B_Y'$ for some klt $$-pair $(Y, B_Y')$. by [Theorem 10.41]Kol13,
$$
Rg_*_Y(E-D)_qis_iR^ig_*_Y(E-D)[i].
$$
Thus we get a morphism
$$
g_*_Y(-F) Rg_*_Y(-F) Rg_*_Y(E-D) g_*_Y(E-D).
$$
Note that
$$
g_*_Y(E-D)=g_*_Y(E-D) g_*_Y(E)=g_*_Y(E-D) g_*_Y=g_*_Y(-D).
$$
Since $D$ is reduced and $g(D)=W$, we have $g_*_Y(-D)=_W$, the ideal sheaf of $W$ in $Z=X$. Moreover, $g_*_Y(-F)=_W$ since $F$ is also reduced. Therefore, we get an isomorphism $_W=g_*_Y(-F) g_*_Y(E-D)$, which implies that
$$
: _W g_*_F Rg_*_F
$$
has a left inverse. Since $Y$ is smooth and $F$ is an snc divisor, we see that $(Y,F)$ is a DB pair, thus by [Theorem 3.3]Kov12 (cf. [Theorem 6.27]Kol13), $(Z,W)$ is also a DB pair.
We say a commutative diagram of schemes
is a universal push-out diagram if for any scheme $T$, the induced diagram
$$
(X,T)@->[r]^ i@->[d]_ p & (,T)@->[d]^ q
(Y,T)@->[r]^ j & (,T)
$$
is a universal pull-back diagram of sets.
Let $(X,S_*)$ be a stratified scheme of lc origin (Definition [defn: of glc origin]). Then $X$ is Du Bois.
We use induction on the dimension. When $ X=1$ the theorem is trivial.
Let $: (X^n,S^n_*) (X,S_*)$ be the normalization. Let $B(X) X$ and
$B(X^n) X^n$ denote the corresponding boundaries. By [9.15.1]Kol13, we have a universal push-out diagram
$
B(X^n)@^(->[r]@->[d] & X^n@->[d]^
B(X)@^(->[r]& X
$
Notice that $B(X)$ and $B(X^n)$ are of lc origin by Lemma [lem: glc stratification is of glc origin], hence Du Bois by induction.
Since $$ is finite, it follows that $R_*_B(X^n) X^n=_*_B(X^n) X^n$. Furthermore, $_*_B(X^n) X^n=_B(X) X$ by [Theorem 9.30]Kol13. By [Theorem 3.3]Kov12 and Lemma [lem: property of DB pairs], we only need to show that $X^n$ is Du Bois. By assumption, for each irreducible component $X_i^n X^n$, there exists an lc crepant log structure $f_i:(Y_i,_i,) Z_i$ and a finite surjection $Z_i X_i^n$. By [Corollary 2.5]Kov99, we only need to show that $Z_i$ is Du Bois for each $i$. Let $B(Z_i) Z_i$ be the boundary of the lc stratification of $Z_i$. Then $B(Z_i)$ is of lc origin by Lemma [lem: glc stratification is of glc origin], hence Du Bois by induction. By Theorem [thm: (Z,W) is DB for glc crepant log structure], $(Z_i,B(Z_i))$ is a DB pair, hence $Z_i$ is Du Bois and we are done.
[Proof of Theorem [thm: glc sings are Du Bois]]
Let $W$ be any union of the glc centers, then by Lemma [lem: glc stratification is of glc origin] the induced stratified space $(W,S_*)$ is of lc origin. Theorem [thm: glc sings are Du Bois] follows from Theorem [thm: of glc origin implies DB].
# Vanishing and contraction theorems for lc generalized pairs
The goal of this section is to prove the vanishing theorems and contraction theorems for lc generalized pairs. This section is parallel to [CLX23], except that the canonical bundle formula and the subadjunction formulas are replaced by the ones established in Sections [sec: cbf] and [sec: subadj].
## Adjacent lc centers and universal push-out diagram
[Union of lc centers] Let $(X,B,)$ be an lc g-pair. A union of lc centers of $(X,B,)$ is a reduced scheme $Y= Y_i$, where each $Y_i$ is an lc center of $(X,B,)$. We denote by $S(X,B,)$ the set of all unions of lc centers of $(X,B,)$. We remark that
- $$ is also considered as a union of lc centers, and
- a union of lc center may be represented in different ways. For example, if $Y_1$ and $Y_2$ are two lc centers such that $Y_1 Y_2$, then $Y_1 Y_2$ and $Y_2$ are the same union of lc centers.
[Adjacent unions of lc centers]
Let $(X,B,)$ be an lc g-pair. For any two unions of lc centers $Y,Y' S(X,B,)$, we say that $Y$ and $Y'$ are adjacent in $S(X,B,)$ if
- $Y Y'$ or $Y' Y$, and
- there does not exist any $Y'' S(X,B,)$ such that $Y Y'' Y'$ or $Y' Y'' Y$.
An lc center $V$ is called minimal in $S(X,B,)$ if $V$ and $$ are adjacent in $S(X,B,)$.
Let $(X,B,)$ be an lc g-pair. Let $Y$ and $Y'$ be two unions of lc centers, such that $Y' Y$, and $Y$ and $Y'$ are adjacent in $S(X,B,)$. Let $: Y^narrow Y$ be the normalization of $Y$ and let $Y'':=^-1(Y')$ with the reduced scheme structure. Denote the induced morphism $Y''arrow Y'$ by $''$. Then there exist a universal push-out diagram
$
Y'' @^(->[r]^j@->[d]_'' & Y^n@->[d]^
Y' @^(->[r]^i& Y
$
and a short exact sequence
where $i,j$ are the natural closed immersions.
By Theorem [thm: glc locus is semi-normal] and [Theorem 9.26]Kol13, $Y$ is semi-normal. Let $L$ be an lc center contained in $Y$ but not contained in $Y'$. Since $Y'$ and $Y$ are adjacent in $S(X,B,)$, we have
$$Y Y'=L (L Y'),$$
and $L Y'$ is the union of all lc centers of $(X,B,)$ that are contained in $L$ but not equal to $L$. By Theorem [thm: glc locus is semi-normal], $Y Y'$ is normal. The lemma follows from [Lemma 2.6]CLX23.
## Vanishing theorems
The following lemma is very similar to [Lemma 2.4]Xie22.
Let $(X,B,)/U$ be an lc g-pair, and $L$ a nef $$-divisor such that $L-(K_X+B+_X)$ is nef$/U$ and big$/U$. Then there exists an $$-divisor $ 0$ such that $L-(K_X+)$ is ample over $U$ and $(X,)=(X,B,)$.
Let $f: Y X$ be a log resolution of $(X, B)$ such that $$ descends on $Y$, and let
$$K_Y+B_Y+_Y:=f^*(K_X+B+_X).$$
Since $L-(K_X+B+_X)$ is nef$/U$ and big$/U$, $f^*L-(K_Y+B_Y+_Y)$ is nef$/U$ and big$/U$. Then there exists an $$-divisor $E 0$ on $Y$, such that for any positive integer $n$, there exists an ample$/U$ $$-divisor $A_n$ on $Y$ such that
$$f^*L-(K_Y+B_Y+_Y)_,U A_n+1nE.$$
We let $m$ be a positive integer such that
$$(Y,B_Y,)= B_Y=(Y,B_Y+1mE,).$$
Let $0< 1$ a real number such that $A_m- B_Y$ is ample$/U$. Pick a general ample $$-divisor $A_Y|(A_m+_Y- B_Y)/U|_ R$, set
$$B_Y':=B_Y+A_Y+ B_Y+1mE,$$
and $B':=f_*B_Y'$. Then $0 B'_ R,UB+_X$ and
$$(X,B')=(X,B')=(X,B,).$$
Since $L-(K_X+B+_X)$ is big$/U$ and nef$/U$, there exist an $$-divisor $F 0$ on $X$ and an ample$/U$ $$-divisor $H$ on $X$ such that
$$L-(K_X+B+_X)_ R,UH+F.$$
Let $l 0$ be an integer, then
$$L-(K_X+B'+1lF)_ R,UL-(K_X+B+_X+1lF)_ R,U1lH+-1l(L-(K_X+B+_X))$$
is ample$/U$, and
$$(X,B'+1lF)(X,B')=(X,B')(X,B'+1lF).$$
Hence
$$(X,B'+1nF)=(X,B')=(X,B,).$$
Thus $:=B'+1lF$ has the required property.
Let $f: Xarrow U$ be a projective morphism, $h: Yarrow X$ a finite morphism between normal schemes, and $g:=f h$. Let $W X$ and $V Y$ be two reduced subschemes such that $h^-1(W)=V$ with defining ideal sheaves $_W$ and $_V$. Let $L$ be a line bundle on $X$ such that $R^ig_*(h^*L_V)=0$ for some positive integer $i$. Then $R^if_*(L_W)=0$.
Notice that $I_W$ is a direct summand of $h_*I_V$ (via the splitting $_X h_*_Y _X$), so it suffices to prove that $R^if_*(L h_*_V)=0$.
Since $R^ih_*(G)=0$ for any coherent sheaf $G$ and $i>0$, we have
$$R^if_*(L h_*_V)=R^if_*(h_*(h^*L_V))=R^ig_*(h^*L_V)=0.$$
Let $f: Xarrow U$ be a projective morphism, $L$ an $$-Cartier $$-divisor on $X$, and $D$ a Cartier divisor on $X$. Let $h: Yarrow X$ be a finite morphism, $(Y,B_Y,^Y)/U$ an lc g-pair such that
$$K_Y+B_Y+^Y_Y_ R,Uh^*L,$$
and $V:=(Y,B_Y,^Y)$ with the reduced scheme structure. Set $W:=h(V)$ with the reduced scheme structure. Let $_W,_V$ be the defining ideal sheaves of $W$ and $V$ respectively, $g:=f h$, and $D_Y:=h^*D$. Suppose that $D_Y-(K_Y+B_Y+^Y_Y)$ is nef$/U$ and log big$/U$ with respect to $(Y,B_Y,^Y)$. Then:
- $R^ig_*(_V_Y(D_Y))=0$ for any $i>0$.
- $g_*_Y(D_Y)arrow g_*_V(D_Y)$ is surjective.
- Suppose that $V=h^-1(W)$. Then $R^if_*(_W_X(D))=0$ for any $i>0$.
- Suppose that $V=h^-1(W)$. Then $f_*_X(D)arrow f_*_W(D)$ is surjective.
By Lemma [lem: perturb glc pair to nlc pair], there exists a pair $(Y,_Y)$ such that $D_Y-(K_Y+_Y)$ is ample/$U$ and $V=(X,_Y)$. (1) follows from [Theorem 8.1]Fuj11.
(2) follows from (1) and the long exact sequence
$$0arrow g_*(_V_Y(D_Y))arrow g_*_Y(D_Y)arrow g_*_V(D_Y)arrow R^1g_*(_V_Y(D_Y))arrow.$$
(3) follows from (1) and Lemma [lem: vanishing keep under finite mor]. (4) follows from (3) and the long exact sequence
$$0arrow f_*(_W_X(D))arrow f_*_X(D)arrow f_*_W(D)arrow R^1f_*(_W_X(D))arrow.$$
Let $(X,B,)/U$ be an lc g-pair associated with morphism $f: Xarrow U$, and $D$ a Cartier divisor on $X$ such that $D-(K_X+B+_X)$ is nef$/U$ and log big$/U$ with respect to $(X,B,)$. Let $Y$ and $Y'$ be two unions of lc centers, such that $Y' Y$, and $Y$ and $Y'$ are adjacent in $S(X,B,)$. Let $: Y^narrow Y$ be the normalization of $Y$, $Y'':=^-1(Y')$ with the reduced scheme structure, and $'':=|_Y''$.
$
Y'' @^(->[r]^j@->[d]_'' & Y^n@->[d]^
Y' @^(->[r]^i& Y
$
Then the induced map
$$f_*_*_Y^n(D|_Y^n) arrow f_*''_*_Y''(D|_Y'')$$
is surjective.
We only need to show that
$$f_*_*_Y_0(D|_Y^n_0) arrow f_*''_*_Y_0''(D|_Y^n_0 Y'')$$
is surjective for any connected component $Y^n_0$ of $Y^n$. Let $Y^n_0$ be a connected component of $Y^n$, $Y_0'':=Y'' Y^n_0$, $Y_0:=(Y^n_0)$, and $Y'_0:=''(Y_0'')$. Since $Y$ and $Y'$ are adjacent in $S(X,B,)$, either $Y_0=Y'_0$, or $Y_0'$ and $Y_0$ are adjacent in $S(X,B,)$ and $Y_0' Y_0$. Possibly replacing $Y$ with $Y_0$ and $Y'$ with $Y_0'$, we may assume that $Y$ is an lc center of $(X,B,)$. Since $Y$ and $Y'$ are adjacent in $S(X,B,)$, $Y'$ is the union of all lc centers of $(X,B,)$ that are contained in $Y$.
We let $(W,B_W,)$ be a dlt model of $(X,B,)$ with induced birational morphism $h: Warrow X$. Let $S$ be an lc center of $(W,B_W,)$ which is minimal in all lc centers which dominate $Y$, $(S,B_S,^S)/U$ the dlt g-pair induced by adjunction
$$K_S+B_S+^S_S:=(K_W+B_W+_W)|_W,$$
and $h_S: Sarrow Y^n$ the induced morphism such that $ h_S=h|_S$. Let
$$S Z Y^n$$
be the Stein factorization of $h_S$, and let $(Z,B_Z,^Z)/U$ be the lc g-pair induced by $: (S,B_S,^S)arrow Z$. Let $(Y^n,B_Y^n,^Y^n)/U$ be the lc g-pair induced by $: (Z,B_Z,^Z)arrow Y^n$, and let $Y'_Z:=^-1(Y'')$.
By Lemma [lem: gdlt crepant log structure is compatible under subadjunction](3) and Theorem [thm: cbf gpair nonnqc](5), for any lc center $V$ of $(X,B,)$ such that $V Y^n$, any irreducible component of $^-1(V)$ is an lc center of $(Z,B_Z,^Z)$. In particular, any irreducible component of $Y'_Z$ is an lc center of $(Z,B_Z,^Z)$, so $(Z,B_Z,^Z) Y'_Z$. By Theorem [thm: cbf gpair nonnqc](4), $()((Z,B_Z,^Z))$ is a union of lc centers of $(X,B,)$ that are contained in $Y$, so $(Z,B_Z,^Z) Y'_Z$. Thus $$(Z,B_Z,^Z)=Y'_Z=^-1(Y'').$$
Let $D_Y^n:=D|_Y^n$ and $D_Z:=^*D_Y^n$. Since $D-(K_X+B+_X)$ is nef$/U$, $D_Y^n-(K_Y^n+B_Y^n+^Y^n_Y^n)$ is nef$/U$, so $D_Z-(K_Z+B_Z+^Z_Z)$ is nef$/U$. For any lc center $V_Z$ of $(Z,B_Z,^Z)$ with normalization $V_Z^n$, $()(V_Z)$ is an lc center of $(X,B,)$, so $(D-(K_X+B+_X))|_(V_Z)^n$ is big$/U$, where $(V_Z)^n$ is the normalization of $(W)$. Since $$ is finite, $(D_Z-(K_Z+B_Z+^Z_Z))|_V_Z^n$ is big$/U$. Therefore, $D_Z-(K_Z+B_Z+^Z_Z)$ is log big$/U$.
The lemma follows from Lemma [lem:3.1](4).
Let $(X,B,)/U$ be an lc g-pair associated with projective morphism $f: Xarrow U$, $D$ a Cartier divisor on $X$ such that $D-(K_X+B+_X)$ is nef$/U$ and log big$/U$ with respect to $(X,B,)$, and $Y$ a union of lc centers of $(X,B,)$ such that $Y=X$. Then:
- $R^if_*_Y(D)=0$ for any positive integer $i$.
- $R^if_*_X(D)=0$ for any positive integer $i$.
- The map $f_*_X(D)arrow f_*_Y(D)$ is surjective.
- $R^if_*(_Y_X(D))=0$ for any positive integer $i$, where $_Y$ is the defining ideal sheaf of $Y$ on $X$.
We apply induction on $ X$. When $ X=1$ the theorem is obvious.
For any union of lc centers $Z$ of $(X,B,)$, we define $m(Z)$ to be the number of lc centers of $(X,B,)$ that are contained in $Z$. We let $W:=(X,B,)$, associated with the reduced scheme structure.
1. In this step we prove (1) when $Y$ is minimal in $S(X,B,)$ the set of all unions of lc centers of $(X,B+)/U$.
By Theorem [thm: (Z,S) is HN and HSN], $Y$ is normal. If $ Y=0$ then we are done. Otherwise, by Definition-Theorem [defthm: subadjun] and Proposition [prop: lc subadj is lc], there exists a klt g-pair $(Y,B_Y,^Y)/U$ such that $K_Y+B_Y+^Y_Y_,U(K_X+B+_X)|_Y$. Hence $D|_Y-(K_Y+B_Y+^Y_Y)$ is nef$/U$ and big$/U$. By Lemma [lem: perturb glc pair to nlc pair], there exists a klt pair $(Y,_Y)$ such that $D|_Y-(K_Y+_Y)$ is ample$/U$. (1) follows from the usual Kawamata-Viehweg vanishing theorem (cf. [Theorem 1-2-7]KMM87).
2. In this step we prove (1).
We apply induction on $m(Y)$. When $m(Y)=1$, $Y$ is minimal in $S(X,B,)$ and we are done by Step 1. Thus we may assume that $m(Y)>1$. In particular, $ Y 1$. We let $Y' S(X,B,)$ be a union of lc centers such that $Y' Y$ and $Y',Y$ are adjacent in $S(X,B,)$. Let $: Y^narrow Y$ be the normalization of $Y$, $Y'':=^-1(Y')$ with the reduced scheme structure, and $'':=|_Y''$. By Lemma [lem:pushout2], there exists a universal push-out diagram
$
Y'' @^(->[r]^j@->[d]_'' & Y^n@->[d]^
Y' @^(->[r]^i& Y
$
and a short exact sequence
$$
0 _Y^* i^* _*_Y^n_Y'^*-''^* ''_*_Y'' 0.
$$
where $i,j$ are the natural closed immersions. Since $m(Y')<m(Y)$, by induction on $m(Y)$, we have
$$
R^if_*_Y'(D)=0
$$
for any positive integer $i$.
By Definition-Theorem [defthm: subadjun] and Proposition [prop: lc subadj is lc], there exists an lc g-pair $(Y^n,B_Y^n,^Y_n)/U$ such that $K_Y^n+B_Y^n+^Y_n_Y^n_ R(K_X+B+_X)|_Y^n$, and the image of any lc center of $(Y^n,B_Y^n,^Y_n)$ in $X$ is an lc center of $(X,B,)$. Since $ Y^n< X$ and $$ is a finite morphism, by induction on $ X$, we have
$$
&R^i(f )_*_Y^n(D|_Y^n)=R^if_*(_*(_Y^n(D|_Y^n))
=0.
$$
For any positive integer $i$,
$$
&R^i(f '')_*_Y''(D|_Y'')= R^if_*(''_*_Y''(D|_Y''))=0.
$$
We only need to show that,
$$R^i(f '')_*_Y'' Y^n_0(D|_Y'' Y^n_0)= R^if_*(''_*_Y'' Y^n_0(D|_Y'' Y^n_0))=0$$
for any irreducible component $Y^n_0$ of $Y^n$. Let $Y^n_0$ be a connected component of $Y^n$, $Y_0'':=Y'' Y^n_0$, $Y_0:=(Y^n_0)$, and $Y'_0:=''(Y_0'')$. Since $Y$ and $Y'$ are adjacent in $S(X,B,)$, either $Y_0=Y'_0$, or $Y_0'$ and $Y_0$ are adjacent in $S(X,B,)$ and $Y_0' Y_0$. Possibly replacing $Y$ with $Y_0$ and $Y'$ with $Y_0'$, we may assume that $Y$ is an lc center of $(X,B,)$. Since $Y$ and $Y'$ are adjacent in $S(X,B,)$, $Y'$ is the union of all lc centers of $(X,B,)$ that are contained in $Y$.
We let $(X',B',)$ be a dlt model of $(X,B,)$ with induced birational morphism $h: X'arrow X$. Let $S$ be an lc center of $(X',B',)$ which is minimal in all lc centers which dominate $Y$, $(S,B_S,^S)/U$ the dlt g-pair induced by adjunction
$$K_S+B_S+^S_S:=(K_X'+B'+_X')|_S,$$
and $h_S: Sarrow Y^n$ the induced morphism such that $ h_S=h|_S$. Let
$$S Z Y^n$$
be the Stein factorization of $h_S$, and let $(Z,B_Z,^Z)/U$ be the lc g-pair induced by $: (S,B_S,^S)arrow Z$. Let $(Y^n,B_Y^n,^Y^n)/U$ be the lc g-pair induced by $: (Z,B_Z,^Z)arrow Y^n$, and let $Y'_Z:=^-1(Y'')$.
By Lemma [lem: gdlt crepant log structure is compatible under subadjunction](3) and Theorem [thm: cbf gpair nonnqc](5), for any lc center $V$ of $(X,B,)$ such that $V Y^n$, any irreducible component of $^-1(V)$ is an lc center of $(Z,B_Z,^Z)$. In particular, any irreducible component of $Y'_Z$ is an lc center of $(Z,B_Z,^Z)$, so $(Z,B_Z,^Z) Y'_Z$. By Theorem [thm: cbf gpair nonnqc](4), $()((Z,B_Z,^Z))$ is a union of lc centers of $(X,B,)$ that are contained in $Y$, so $(Z,B_Z,^Z) Y'_Z$. Thus $$(Z,B_Z,^Z)=Y'_Z=^-1(Y'').$$
Since $ Z< X$, by induction on $ X$,
$$R^i(f '')_*_Y'_Z(D|_Y'_Z)=0.$$
By Lemma [lem: vanishing keep under finite mor], the claim follows.
of Theorem [thm: kod vanishing with lc strata] continued. By the short exact sequence ([eq: short exact sequence in main theorem]), we have a short exact sequence
$$0arrow _Y(D)^* i^*_*_Y^n(D|_Y^n) _Y'(D) ^*-''^* ''_*_Y''(D|_Y'')arrow 0,$$
which induces a long exact sequence
Hence, it follows from ([eq3.1]), ([eq3.2]), ([eq3.3]) and Lemma [lem:3.2] that $R^if_*_Y(D)=0$ for any positive integer $i$.
3. In this step we prove (2) and prove (3)(4) when $Y=W=(X,B,)$.
We have the long exact sequence
By (1), $R^if_*_W(D)=0$ for any positive integer $i$. By Lemma [lem:3.1](1), $R^i(_W f_*_X(D))=0$ for any positive integer $i$. This implies (2), and also implies (3)(4) when $Y=W$.
4. We prove (3)(4) in this step, hence conclude the proof of the theorem.
We apply induction on $m(W)-m(Y)$. When $m(W)-m(Y)=0$, $Y=W$ and we are done by Step 3. Thus we may assume that $m(W)-m(Y)>0$. Then there exists a union of lc centers $ Y$ such that $Y Y W$, and $Y$ and $ Y$ are adjacent in $S(X,B,)$.
Let $:^narrow $ be the normalization of $ Y$, and let $ Y:=^-1(Y)$ with the reduced scheme structure. Let $ i: Y Y$ and $ j: Y^n$ be the natural inclusions, and let $:=|_$. By Lemma [lem:pushout2], there exists a universal push-out diagram
$
@^(->[r]^ j@->[d]_ & Y^n@->[d]^
Y@^(->[r]^ i& Y
$
and a short exact sequence
which induces a short exact sequence
$$0arrow _(D)^* i^* _*_^n(D|_^n) _Y(D) j^*-^* _*_(D|_)arrow 0.$$
So we have the left exact sequence
$$
0arrow f_*_(D)^* i^* f_*_*_^n(D|_^n) f_*_Y(D) j^*-^* f_*_*_(D|_).
$$
By Lemma [lem:3.2],
$$ j^*: f_*_*_^n(D|_^n)arrow f_*_*_(D|_)$$
is surjective. Thus by an easy map tracing of ([eq:long]) we have that
$$ i^*: f_*_(D)arrow f_*_Y(D)$$
is also surjective. Since $m(W)-m( Y)<m(W)-m(Y)$, by induction on $m(W)-m(Y)$, $$f_*_X(D)arrow f_*_ (D)$$ is surjective. This implies (3).
We have the long exact sequence
so (4) follows immediately from (1)(2)(3).
## Base-point-freeness theorem and contraction theorem
Let $(X,B,)/U$ be an lc g-pair and $D$ a nef$/U$ Cartier divisor on $X$ such that $aD-(K_X+B+_X)$ is ample$/U$ for some positive real number $a$. Let $Y$ be a minimal lc center of $(X,B,)$ if $(X,B,)$ is not klt, and let $Y:=X$ if $(X,B,)$ is klt. Let $D_Y:=D|_Y$. Then for any integer $m 0$,
- $_Y(mD_Y)$ is globally generated over $U$,
- $|mD/U|=$, and
- $Y$ is not contained in $|mD/U|$.
When $(X,B,)$ is klt, by [Lemma 3.4]HL22, there exists a klt pair $(X,)$ such that $D-(K_X+)$ is ample$/U$. By the usual base-point-freeness theorem (cf. [Theorem 3-1-1]KMM87), the lemma follows.
When $(X,B,)$ is not klt, by Theorem [thm: (Z,S) is HN and HSN], $Y$ is normal. By Theorem [thm: kod vanishing with lc strata](3), the map $f_*_X(mD)arrow f_*_Y(mD_Y)$ is surjective for any positive integer $m a$. Thus (2)(3) follow from (1) and we only need to prove (1). If $ Y=0$ then there is nothing left to prove. If $ Y>0$, then by Definition-Lemma [deflem: subadj minimal lc center], there exists a klt g-pair $(Y,B_Y,^Y)/U$ such that $K_Y+B_Y+^Y_Y_,U(K_X+B+_X)|_Y$. Thus $D_Y-(K_Y+B_Y+^Y_Y)$ is nef$/U$ and log big$/U$ with respect to $(Y,B_Y,^Y)$. By [Lemma 3.4]HL22, there exists a klt pair $(Y,_Y)$ such that $D_Y-(K_Y+_Y)$ is ample$/U$. By the usual base-point-freeness theorem (cf. [Theorem 3-1-1]KMM87), the lemma follows.
[Proof of Theorem [thm:base-point-freeness intro]]
By Lemma [lem: non-vanishing of lc gpair], we may let $m_0$ be the minimal positive integer such that $|mD|=$ for any integer $m m_0$.
Let $\{p_i\}_i=1^+$ be a strictly increasing sequence of positive integers. There exist a non-negative integer $M$ and integers $i_1<i_2<<i_M+1$ satisfying the following. Let $s_k:=_l=1^kp_i_l$ for any $1 k M+1$, then
- $|s_1D/U|=$,
- $|s_kD/U||s_k+1D/U|$ for any $1 k M$, and
- $|s_M+1D/U|=$.
We may take $i_1$ to be any integer such that $p_i_1 m_0$, then (1) holds.
Suppose that we have already found $i_1,,i_k$ for some positive integer $k$. Let $d:= X$, let $H_1,,H_d+1$ be $d+1$ be general elements in $|s_kD/U|$, and let $H:=H_1++H_d+1$. Then $(X,B+H,)$ is lc outside $|s_kD/U|$. If $|s_kD/U|=$, then we may let $M:=k-1$ and we are done. Thus we may assume that $|s_kD/U|=$.
Since every $H_j$ contains $|s_kD/U|$, by [Theorem 18.22]Kol+92, $(X,B+H,)$ is not lc near $|s_kD/U|$. Let
$$c:=\{t t 0, (X,B+tH,) is lc\},$$
then $c [0,1)$, and there exists at least one lc center of $(X,B+cH,)$ which is contained in $|s_kD/U|$. Let
$$ be the set of all lc centers of $(X,B+cH,)$ that are contained in $|s_kD/U|$, and let $Y$ be a minimal lc center in $$. Since
$$(a+s_k(d+1))D-(K_X+B+cH+_X)_ Rs_k(d+1)(1-c)D+(aD-(K_X+B+_X))$$
is ample$/U$, by Lemma [lem: non-vanishing of lc gpair], there exists a positive integer $n$, such that for any integer $m n$, $|ms_kD/U|=$ and $|ms_kD/U|$ does not contain $Y$. In particular, $|ms_kD/U||s_kD/U|$. We may let $i_k+1$ be any integer such that $i_k+1>i_k$ and $p_i_k+1 n$. This construction implies (2). (3) follows from (2) and the Noetherian property.
of Theorem [thm:base-point-freeness intro] continued. We let $p$ and $q$ be two different prime numbers. By Claim [claim: induction bs], there exist two non-negative integers $M,N$ such that $_X(p^MD)$ and $_X(q^ND)$ are globally generated$/U$. Since $p^M$ and $q^N$ are coprime, for any integer $m 0$, we may write $m=bp^M+cq^N$ for some non-negative integers $b,c$, hence
$$|mD/U||p^MD/U||q^ND/U|=.$$
Therefore, $_X(mD)$ is globally generated over $U$ for any integer $m 0$.
[Contraction theorem for lc generalized pairs, cf. [Theorem 1.5]Xie22]
Let $(X,B,)/U$ be an lc generalized pair and $F$ a $(K_X+B+_X)$-negative extremal face$/U$. Then there exists a contraction$/U$ $_F: Xarrow Z$ of $F$ satisfying the following.
- For any integral curve $C$ on $X$ such that the image of $C$ in $U$ is a closed point, $_F(C)$ is a point if and only if $[C] F$.
- $_Y=(_F)_*_X$. In other words, $_F$ is a contraction.
- For any Cartier divisor $D$ on $Y$ such that $D C=0$ for any curve $C$ contracted by $_F$, there exists a Cartier divisor $D_Y$ on $Y$ such that $D=_F^*D_Y$.
[Proof of Theorem [thm: cont thm gpair]]
(1)(2) By Theorem [thm: cone theorem gfq], $F$ is a finitely dimensional rational $(K_X+B+_X)$-negative extremal face$/U$. Thus there exists a nef Cartier divisor $L$ on $X$ that is the supporting function of $F$. Then $L-(K_X+B+_X)$ is ample. By Theorem [thm:base-point-freeness intro], $mL$ is base-point-free$/U$, hence defines a contraction$/U$. Denote this contraction by $_F$. Then $_F$ satisfies (1) and (2).
(3) Since $D-(K_X+B+_X)$ is ample$/Z$, by Theorem [thm:base-point-freeness intro], $_X(mD)$ is globally generated over $Z$ for any integer $m 0$. Since $D C$ for any curve $C$ contracted by $_F$, $_F$ is defined by $|mD|$ for any integer $m 0$. Thus $mD=f^*D_Y,m$ and $(m+1)D=f^*D_Y,m+1$ for any integer $m 0$. We may let $D_Y:=D_Y,m+1-D_Y,m$.
[Proof of Theorem [thm: semi-ampleness intro]]
We write $D=_i=1^c r_iD_i$ where $r_1,,r_c$ are linearly independent over $ Q$ and each $D_i$ is a $$-divisor. We define $D():=_i=1^cv_iD_i$ for any $=(v_1,,v_c) R^c$, and let $:=(r_1,,r_c)$. By [Lemma 5.3]HLS19, each $D_i$ is $$-Cartier, so $()$ is $$-Cartier for any $ R^c$.
Let $L:=D-(K_X+B+_X)$. Since ample$/U$ is an open condition, there exists an open set $V$ in $ R^c$, such that
$12L+D()-D$ is ample$/U$ for any $ V$.
By Theorem [thm: cone theorem gfq], there exist finitely many $(K_X+B+_X+12L)$-negative extremal rays$/U$ $R_1,,R_l$, and each $R_j= R_+[C_j]$ for some rational curve $C_j$ such that
$$-2 X (K_X+B+_X+12L) C_j<0.$$
Since $D$ is nef, $D C_j 0$ for each $j$. Thus possibly shrinking $V$, we may assume that for any $ V$, we have that $D() C_j>0$ for any $j$ such that $D C_j>0$. Since $r_1,,r_c$ are linearly independent over $ Q$, for any $j$ such that $D C_j=0$, we have $D() C_j=0$ for any $ R^c$. Therefore, $D() C_j 0$ for any $j$ and any $ V$.
For any extremal ray $R$ in $(X/U)$ and any $ V$, if $R=R_j$ for some $j$, then $D() R_j 0$. If $R=R_j$ for any $j$, then
$$D() R_j=(K_X+B+_X+12L) R+(12L+D()-D) R>0.$$
Therefore, $D()$ is nef$/U$ for any $ V$. Moreover,
$$D()-(K_X+B+_X)=12L+12L+D()-D$$
is ample$/U$.
We let $_1,,_c+1 V Q^c$ be rational points such that $$ is in the interior of the convex hull of $_1,,_c+1$. Then there exists positive real numbers $a_1,,a_c+1$ such that $_i=1^c+1a_i=1$ and $_i=1^c+1a_i_i=$. Since $D(_i)$ is a nef$/U$ $$-divisor and $D(_i)-(K_X+B+_X)$ is ample$/U$, by Theorem [thm:base-point-freeness intro], $D(_i)$ is semi-ample$/U$ for any $i$. Therefore, $D= a_iD(_i)$ is semi-ample$/U$.
# Existence of flips for generalized pairs
The goal of this section is to show the existence of flips for $$-factorial lc generalized pairs. We remark that [Theorem 1.2]HL21a proves the case when the generalized pairs are NQC. Our proof does not rely on the results in [HL21a].
The following lemma is crucial for the proof of the existence of flips.
Let $(X,B,)/U$ be an lc g-pair such that the induced morphism $: Xarrow U$ is birational. Assume that there exists a non-empty open subset $U^0 U$, such that
- all lc centers of $(X,B,)$ intersect $X^0:=X_U U^0$, and
- $^0:=_U U^0$ descends to $X^0$, and $^0_X^0_,U^00$.
Then there exists an $$-divisor $0 G _,U _X$ such that $(X,B+G)$ is lc and $(X,B+G)=(X,B,)$.
Let $f: X$ be a log resolution of $(X, B)$ such that $$ descends to $$, we may write
$$K_+ B+_=f^*(K_X+B+_X)$$
for some $$-divisor $$. Since
$$ is birational, $_$ is big$/U$ and nef$/U$. Thus there exists a $$-divisor $E 0$, such that for any positive integer $k$, there exists an ample$/U$ $$-divisor $A_k$ on $ X$ such that
$$_=A_k+1kE.$$
Moreover, for any $k 1$, $(X, B+1kE)$ is contained in the strata of $ B$. By [Lemma 5.3]HLS19, there exist $$-divisors $_i$ and positive real numbers $a_i$, such that
- $ a_i=1$,
- $_= a_i_i$,
- $_i-_+A_k$ is ample$/U$ for each $i$, and
- $_i|_^0_,U^00$, where $^0:=_UU_0$.
Let $m$ be a positive integer such that $m_i$ is a Weil divisor and $m_i|_^0_U^00$ for each $i$. Then there exists a very ample divisor $H 0$ on $U$, such that $_*_(m_i) H$ is globally generated for each $i$, where $:= f$. In particular, $_(m_i) ^*H$ is globally generated over $U^0$. Thus for any general element $D_i |m_i+^*H|$, any non-klt center of $(X, B+1m a_iD_i)$ is contained in $ ^0$.
Since
$$m_i+^*H=m(_i-_+A_k)++^*H,$$ possibly replacing $m$ by a multiple, we may
may assume that $$ is Cartier. Thus $m(_i-_+A_k)$ is ample$/U$ and Cartier, and for any general element $_i |m_i+^*H|$, any non-klt center of $(X, B+1m a_i_i)$ is a stratum of $ B$ which intersects $^0$.
Therefore, for each $i$, we may choose $_i |m_i+^*H|$, such that
$$(X, B+1m a_i_i)$$ is sub-lc. Let $=1m a_i_i$, and $G:=f_*$. Then $0 G _,U _X$, $(X,B+G)$ is lc, and $(X,B+G)=(X,B,)$.
[Flipping contraction]
Let $Xarrow U$ be a projective morphism such that $X$ is normal quasi-projective and $D$ an $$-Cartier $$-divisor on $X$. A $D$-flipping contraction over $U$ is a contraction $f: Xarrow Z$ over $U$ satisfying the following:
- $X$ is $$-factorial,
- $f$ is a small birational morphism, and
- $f$ is the contraction of a $D$-negative extremal ray $R$ in $(X/U)$. In particular, $(X/Z)=1$.
[Flip]
Let $X$ be a normal quasi-projective variety, $D$ an $$-Cartier $$-divisor on $X$, and $f: Xarrow Z$ a $D$-flipping contraction. A $D$-flip is a birational contraction $f^+: X^+arrow Z$ satisfying the following.
- $X^+$ is a normal quasi-projective variety,
- $f^+$ is small, and
- $D^+$ is $$-Cartier and ample$/Z$, where $D^+$ is the strict transform of $D$ on $X^+$.
We call $f^+$ the flip of $f$.
Let $X$ be a normal quasi-projective variety and $D$ and $D'$ two $$-Cartier $$-divisors on $X$. Let $f: Xarrow Z$ a $D$-flipping contraction such that $D_ZrD'$ for some real number $r>0$. Then:
- $f$ is a $D'$-flipping contraction.
- Suppose that $f^+: X^+arrow Z$ is a $D'$-flip. Assume that either $D_ R,ZrD'$, or $D=K_X+B+_X$ for some lc g-pair $(X,B,)/Z$. Then $f^+$ is also a $D$-flip.
Since $D_ R,UrD'$, the unique $D$-negative extremal ray in $(X/Z)$ is also a $D'$-negative extremal ray, and we get (1).
By Theorem [thm: cont thm gpair](3) we may assume that $D_ R,ZrD'$. Let $D^+$ and $D'^+$ be the strict transform of $D$ and $D'$ on $X^+$ respectively. We have $D-rD'_ Rf^*L$ for some $$-Cartier $$-divisor $L$ on $Z$. Since $X X^+$ is small, $D^+-rD'^+_ R(f^+)^*L$. Since $D^+$ is $$-Cartier and ample$/Z$, $D'^+$ is $$-Cartier and ample$/Z$. This implies (2).
Let $(X,B,)/U$ be an lc g-pair and $f: Xarrow Z$ a $(K_X+B+_X)$-flipping contraction$/U$. Suppose that the flip $f^+: X^+arrow Z$ of $f$ exists. Then:
- $f^+$ is unique.
- For any $$-Cartier $$-divisor $D$ on $X$, the strict transform of $D$ on $X^+$ is $$-Cartier.
- If $X$ is $$-factorial, then $X^+$ is $$-factorial and $(X)=(X^+)$.
Let $H$ be an anti-ample$/Z$ divisor on $X$. Since $(X/Z)=1$ and $K_X+B+_X$ is anti-ample$/Z$, there exist a positive real number $r$ and a real number $s$ such that $H-r(K_X+B+_X)_Z0$ and $D-s(K_X+B+_X)_Z0$. By Theorem [thm: cont thm gpair](3), $H-r(K_X+B+_X)_ R,Z0$ and $D-s(K_X+B+_X)_ R,Z0$.
(1) By Lemma [lem: flip keep under rlinearequivalence], $f^+$ is an $H$-flip. Thus
$$X^+=(_m=0^+_*_X(mH))$$
is unique.
(2) We have $D-s(K_X+B+_X)_ Rf^*L$ for some $$-Cartier $$-divisor $L$ on $Z$. Let $D^+$ and $B^+$ be the strict transform of $D$ and $B$ on $X^+$ respectively. Since $X X^+$ is small, $D^+-s(K_X^++B^++_X^+)_ R(f^+)^*L$. Since $K_X^++B^++_X^+$ is $$-Cartier, $D^+$ is $$-Cartier.
(3) Since $X X^+$ is an isomorphism in codimension 1, there is a natural isomorphism between the groups of Weil divisors on $X$ and $X^+$. By (2), if $X$ is $$-factorial, then $X^+$ is $$-factorial. Since $X$ and $X^+$ are both $ Q$-factorial, $(X)=(X^+)$.
[Existence of flips]
Let $(X,B,)/U$ be an lc g-pair and $f: Xarrow Z$ a $(K_X+B+_X)$-flipping contraction$/U$. Assume that $_X$ is $$-Cartier. Then the $(K_X+B+_X)$-flip $f^+: X^+arrow Z$ of $f$ exists. Moreover,
- $(X^+/Z)=1$,
- $_X^+$ is $ R$-Cartier, and
- If $X$ is $$-factorial, then $X^+$ is $ Q$-factorial and $(X)=(X^+)$.
[Proof of Theorem [thm: existence of q-factorial glc flips]]
Let $h: Xarrow X$ be a birational morphism such that $$ descends to $ X$. Since $_X$ is $$-Cartier and $_ X$ is nef$/X$, we have
$$_ X+E=h^*_X$$
for some $E 0$ that is exceptional over $X$. Let $C$ be any flipping curve contracted by $f$.
There are two cases:
1. $_X C 0$. Then $(K_X+B) C<0$, and $f$ is also a $(K_X+B)$-flipping contraction. By [Corollary 1.2]Bir12, [Corollary 1.8]HX13, there exists a $(K_X+B)$-flip $f^+: X^+arrow Z$, such that $(X^+/Z)=1$. (1) follows. By Lemma [lem: flip keep under rlinearequivalence], $f^+: X^+arrow Z$ is a $(K_X+B+_X)$-flip. (2-3) follow from Lemma [lem: uniqueness flip].
2. $_X C<0$. In this case, $C h(E)$. Let $Z^0:= Z\{f(h( E))\}$, $X^0:=X_Z Z^0$, $B^0:=B_Z Z^0$, and $^0:=_Z Z^0$. Since $h( E)$ does not contain any lc center of $(X,B,(1-))$, for any $ (0,1)$,
- all lc centers of $(X,B,(1-))$ intersect $X^0$,
- $^0$ descends to $X^0$ and $^0_X^0_,Z^00$.
Let $_0 (0,1)$ be a real number such that $f$ is also a $(K_X+B+(1-_0)_X)$-flipping contraction. By Lemma [lem: flip reduce special gpair to pair], there exists an $$-divisor $G _,Z(1-_0) _X$ such that $(X,B+G)$ is lc. By Lemma [lem: flip keep under rlinearequivalence], $f$ is a $(K_X+B+G)$-flip. By [Corollary 1.2]Bir12, [Corollary 1.8]HX13, the flip $f^+: X^+arrow Z$ of $f$ exists and $(X^+/Z)=1$. (1) follows. By Lemma [lem: flip keep under rlinearequivalence], $f^+$ is a $(K_X+B+_X)$-flip. (2-3) follow from Lemma [lem: uniqueness flip].
minimal model and the proofs of the main theorems
# Existence of good minimal models and $$-semi-ampleness
## Good minimal models for polarized foliations
We note that the subsequent lemma does not necessarily require $$ to be algebraically integrable, allowing its application to other scenarios.
Let $(X,,B,)/U$ be an lc gfq and $A$ an ample$/U$ $$-divisor on $X$. Let
$$: (X,,B+A,) (X',',B'+A',)$$
be a sequence of steps of a $(K_+B+A+_X)$-MMP$/U$, where $B'$ and $A'$ are the images of $B$ and $A$ on $X'$ respectively. Then there exist a nef$/U$ $$-divisor $$ and an ample$/U$ $$-divisor $ A'$ on $X'$, such that
- $(X',',B',)/U$ is lc,
- $_X'+ A'_ R,U_X'+A'$,
- $-$ is nef$/U$, and
- for any contraction $f: Xarrow Z$ and divisor $G$ on $X$ such that $(X,,B,;G)/Z$ satisfies Property $(*)$ (resp. is weak ACSS, is ACSS), $(X',',B',;G':=_*G)/Z$ satisfies Property $(*)$ (resp. is weak ACSS, is ACSS).
We may assume that $$ is a single step of a MMP$/U$, and we have the following diagram$/U$
$
X@->[rd]^g@-->[rr]^ & & X'@->[dl]^h
& T &
$
such that either $=g$ is a divisorial contraction, or $$ is a flip, $g$ is the flipping contraction, and $h$ is the flipped contraction. Then there exists an ample$/T$ divisor $H$ on $X$ such that $K_+B+A+H+_X_ R,T0$. Let $H':=_*H$, then $-H'$ is ample$/T$. Since $A$ is ample$/U$, there exists an ample$/U$ $$-divisor $C$ on $T$ such that $A-g^*C$ is ample$/U$.
Let $0< 1$ be a real number. Then $ A':=h^*C- H'$ and $L:=A-g^*C+ H$ are ample$/U$, and $$ is a step of a $(K_+B+A+_X+ H)$-MMP$/T$. Since
$$K_+B+A+_X_ R,TK_+B+L+_X- H,$$
$$ is a step of a $(K_+B+L+_X)$-MMP$/T$, hence a step of a $(K_+B+L+_X)$-MMP$/U$. Let $L':=_*L$, then
$$_*L+ A'=A'.$$
We let $:=+$. By our construction, $$ and $ A'$ satisfy (2) and (3). Since $-$ descends to $X$ and $(X,,B,)$ is lc, $(X,,B,)$ is lc. Since $$ is a step of a $(K_+B+_X)$-MMP$/U$, $(X',',B',)$ is lc, which implies (1). If $(X,,B,;G)/Z$ satisfies Property $(*)$ (resp. is weak ACSS, is ACSS), then $(X,,B,;G)/Z$ satisfies Property $(*)$ (resp. is weak ACSS, is ACSS). (4) follows from Lemma [lem: ACSS mmp can run].
Let $(X,B,)/U$ be an lc g-pair and $f:X Z$ a contraction such that $B$ is super$/Z$. Assume that $:X T$ is a contraction$/U$ such that $K_X+B+_X_,T0$ and $$ is also a contraction$/Z$. Let $B_T$ be the discriminant part of $f: (X,B,)arrow T$. Then $B_T$ is super$/Z$.
Let $d:= X$. Since $B$ is super$/Z$, there exist ample Cartier divisors $H_1,,H_2d+1$ on $Z$ such that $B_i=1^2d+1 f^*H_i$. In particular, $B-_i=1^2d+1 f^*H_i0$, and
$$K_X+B-_i=1^2d+1 f^*H_i+_X_,T0.$$
Let $B_T'$ be the discriminant part of $: (X,B-_i=1^2d+1 f^*H_i,)arrow T$ and let $: Tarrow Z$ be the induced contraction. Then $B_T=B_T'+_i=1^2d+1^*H_i$, so $B_T$ is super$/Z$.
Let $d$ and $m$ be two positive integers, $(X,,B,)/U$ an lc gfq of dimension $d$, and $A 0$ an ample$/U$ $$-divisor on $X$, such that
- $$ is induced by a contraction $f: Xarrow Z$,
- $K_+B+A+_X$ is nef$/U$, and
- $K_+B+_X_ R,ZK_X++_X$ for some lc g-pair $(X,,)/U$.
Then the followings hold.
- $K_+B+A+_X$ is semi-ample$/U$.
- The contraction$/U$ defined by $K_+B+A+_X$ is a contraction$/Z$.
- Suppose that
$$m(K_+B+_X)_Zm(K_X++_X)$$
and $m(K_+B+A+_X)$ is Cartier. Then $$_X(nm(K_+B+A+_X))$$ is globally generated$/U$ for any integer $n 0$.
Let $: Xarrow U$ be the induced morphism and let $H'$ be a sufficiently ample Cartier divisor on $U$. Possibly replacing $A$ with $A+^*H'$, we may assume that $A$ is ample. Let $H_1,,H_2 X+1$ be ample Cartier divisor on $Z$. Possibly replacing $$ with $+_i=1^2 X+1f^*H_i$, we may assume that $$ is super$/Z$. By Lemma [lem: equivalence over bases], $K_X++A+_X$ is nef$/U$.
By Theorem [thm: semi-ampleness intro], $K_X++A+_X$ is semi-ample$/U$, so $K_X++A+_X$ defines a contraction$/U$ $: Xarrow T$.
Since $$ is super$/Z$, by the the length of extremal rays (Theorem [thm: cone theorem gfq](2)), any $(K_X++A+_X)$-trivial extremal ray in $(X/U)$ is an extremal ray$/Z$, so $$ is a contraction$/Z$. Therefore, $K_+B+A+_X_ R,T0$. Let $_T$ be the foliation induced by the induced contraction $: Tarrow Z$, then $=^-1_T$.
We let $H_T$ be a general ample$/U$ $$-divisor on $T$ such that $H:=A-^*H_T$ is ample$/U$. By Theorem [thm: cbf gfq], there exist an lc gfq $(T,_T,B_T,^T)/U$ induced by a canonical bundle formula of $: (X,,B,+)arrow T$, and an lc g-pair $(T,_T,^T)/U$ induced by a canonical bundle formula of $: (X,,+)arrow T$. By Lemma [lem:superundercbf], $_T$ is super$/Z$.
We have
$$K__T+B_T+^T_T_ R,ZK_T+_T+^T_T.$$
Since $$ is the morphism$/U$ defined by $K_X++A+_X$, $K_T+_T+H_T+^T_T$ is ample$/U$. Thus $K_T+_T+(1-)H_T+^T_T$ is ample$/U$ for any $0< 1$. By Theorem [thm: cone theorem gfq], $(K__T+B_T+(1-)H_T+^T_T)$ is nef$/U$. Thus $K__T+B_T+H_T+^T_T$ is ample$/U$, so $K_+B+A+_X$ is semi-ample$/U$, and $$ is the contraction$/U$ defined by $K_+B+A+_X$. This implies (1)(2).
We prove (3). Since $$ is a contraction defined by $K_X++A+_X$, $m(K_+B+A+_X)$ is Cartier, and $K_+B+A+_X_ Q,T0$, by Theorem [thm: cont thm gpair](3), there exists a Cartier divisor $L$ on $T$ such that
$$m(K_+B+A+_X)=^*L.$$
Since $L_ RK__T+B_T+H_T+^T_T$, $L$ is ample$/U$. Thus $nL$ is very ample$/U$ for any integer $n 0$, so
$$_X(nm(K_+B+A+_X))=_X(^*(nL))$$
is globally generated$/U$ for any integer $n 0$.
Let $(X,,B,)/U$ be an lc gfq, and $A,H$ two ample$/U$ $$-divisors on $X$. Assume that
- $$ is induced by a contraction $Xarrow Z$,
- $K_+B+A+_X$ is pseudo-effective$/U$,
- $K_+B+_X_ R,ZK_X++_X$ for some lc g-pair $(X,,)/U$, and
- either $X$ is $$-factorial klt or $$ is NQC$/U$.
Then there exists a $(K_+B+A+_X)$-MMP$/U$ with scaling of $H$, say $_0$, satisfying the following. Let $=_0$ if $X$ is not $$-factorial, and let $$ be any $(K_+B+A+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor if $X$ is $$-factorial. Then
- $$ terminates at a model $X'$ such that $K_'+B'+A'+_X$ is semi-ample$/U$, where $B',A'$ are the images of $B,A$ on $X'$ respectively, and $'$ is the pushforward of $$ on $X'$, and
- the contraction$/U$ defined by $K_'+B'+A'+_X'$ is a contraction$/Z$.
Let $':=+ A$. Then $$ is a $(K_+B+'_X)$-MMP$/U$ and $(X,,B,')$ is lc. By Proposition [prop: run mmp with scaling gfq], $$ terminates with a weak lc model $(X',',B',')/U$ of $(X,,B,')/U$. By Lemma [lem: +a keep under mmp], there exists a nef$/U$ $$-divisor $''$ and an ample$/U$ $$-divisor $A''$ such that $''_X'+A''_ R,U_X'+A'$ and $(X',',B','')/Z$ is lc. By Lemma [lem: ACSS mmp can run], $$ is also a $(K_X++A+_X)$-MMP$/U$. Since $(X,,+ A)$ is lc, $(X',',+ A)$ is lc, where $'$ is the image of $$ on $X'$. Moreover,
$$K_'+B'+A''+''_X'_ R,ZK_X'+'+_X'+ A_X'.$$
The theorem follows from Theorem [thm: bpf induced gfq].
## A special case of Prokhorov-Shokurov's effective $$-semi-ampleness conjecture
Let $(X,B,)/U$ be an lc g-pair and $f:(X,B,)arrow Z$ a contraction satisfying Property $(*)$. Let $$ be the moduli part of $f: (X,B,)arrow Z$. Assume that
- $f$ is equi-dimensional,
- $K_X+B+_X$ is nef$/Z$,
- $(X,B,)$ is BP semi-stable$/Z$, and
- there exists an ample$/U$ $$-divisor $H$ such that either $B^h H$ or $- H$ is nef$/U$, where $B^h$ the horizontal$/Z$ part of $B$.
Then $$ descends to $X$ and $_X$ is semi-ample$/U$.
Let $$ be the foliation induced by $f$. By Proposition [prop: bp semistable foliation lc], $(X,,B^h,)$ is lc and $(X,,B^h,;B-B^h)/Z$ is weak ACSS. By Theorem [thm: lc+weak acc=bpstable], $(X,B,)$ is BP stable$/Z$. By Proposition [prop: bp stable nef], $$ descends to $X$ and is nef$/U$. By Proposition [prop: weak cbf gfq], $K_+B^h+_X=_X$ is nef$/U$. By Theorem [thm: bpf induced gfq], $_X=K_+B^h+_X$ is semi-ample$/U$.
When we have an lc-trivial fibration, we can prove stronger $$-semi-ampleness.
Let $d$ and $m$ be two positive integers. Then there exists a positive integer $I$ depending only on $d$ and $m$ satisfying the following.
Assume that $(X,B,)/U$ is an lc g-pair and $f: (X,B,)arrow Z$ is a contraction$/U$ satisfying Property $(*)$. Let $$ be the moduli part of $f: (X,B,)arrow Z$. Assume that
- $f$ is equi-dimensional,
- $X$ is of Fano type over $Z$,
- $K_X+B+_X_ Q,Z0$,
- $(X,B,)$ is BP semi-stable$/Z$,
- $mB$ is a Weil divisor and $m$ is $$-base-point-free$/U$, and
- there exists an ample$/U$ $$-divisor $H$ such that either $B^h H$ or $- H$ is nef$/U$, where $B^h$ the horizontal$/Z$ part of $B$.
Then $$ descends to $X$, $I_X$ is Cartier, and $_X(nI_X)$ is globally generated$/U$ for any integer $n 0$.
Let $B_Z$ be the discriminant part of $f: (X,B,)arrow Z$. By [Lemma 4.2]Has22 (cf. [Proposition 6.3]Bir19), there exist a positive integer $q$ depending only on $d$ and $m$ and a choice $^Z$ of the moduli part of $f: (X,B,)arrow Z$, such that
$$q(K_X+B+_X) qf^*(K_Z+B_Z+^Z_Z)$$
and $q^Z$ is nef$/U$. Since $f: (X,B,)arrow Z$ satisfies Property $(*)$, $Z$ is smooth and $B_Z$ is reduced. In particular, $q(K_X+B+_X)$ is Cartier.
By Theorem [thm: a special b-semiampleness], $$ descends to $X$ and $_X$ is semi-ample$/U$. By Proposition [prop: weak cbf gfq],
$$_X K_+B^h+_X_ZK_X+B+_X$$
is semi-ample$/U$, where $$ is the foliation induced by $f$. Since $Z$ is smooth and $q(K_X+B+_X)$ is Cartier, $q_X$ and $q(K_+B^h+_X)$ are Cartier, and we may let $I:=q$. By Theorem [thm: bpf induced gfq](3), $_X(nI(K_+B^h+_X))=_X(nI_X)$ is globally generated$/U$ for any integer $n 0$.
Let $(X,B,)/U$ be an lc g-pair, $G 0$ an $$-Cartier $$-divisor on $X$, and $f: Xarrow Z$ an equi-dimensional contraction$/U$. Assume that
- $G$ is vertical$/Z$,
- $f: (X,B+G,)arrow Z$ satisfies Property $(*)$,
- $(X,B+G,)$ is BP semi-stable$/Z$,
- $K_X+B+_X_ R,Z0$,
- there exists an ample$/U$ $$-divisor $H$ such that either $B^h H$ or $- H$ is nef$/U$, where $B^h$ the horizontal$/Z$ part of $B$, and
- either $X$ is $$-factorial klt or $$ is NQC$/U$.
Let $$ be the moduli part of $f: (X,B,)arrow Z$. Then:
- $$ descends to $X$ and $_X$ is semi-ample$/U$.
- Suppose that there exists a positive integer $m$ such that $mB^h$ is a Weil divisor, $m$ is $$-base-point-free$/U$, and $X$ is of Fano type over $Z$. Then there exists a positive integer $I$ depending only on $ X$ and $m$, such that $I_X$ is Cartier and $_X(nI_X)$ is globally generated$/U$ for any integer $n 0$.
For any prime divisor $D$ on $Z$, we let
$$t_D:=\{t 0 G-tf^*D 0\}$$
and let
$$G_0:=G-_D D is a prime divisor on Zt_D^*D.$$
Then $G_0 0$ and $G_0$ is very exceptional$/Z$.
Let $$ be the foliation induced by $f$. By Proposition [prop: bp semistable foliation lc], $(X,,B^h,)$ is lc, so $(X,,B^h,;G+B-B^h)/Z$ is weak ACSS. By Proposition [prop: weak cbf gfq], $$K_+B^h+_X_ R,ZK_X+B+G+_X_ R,ZG_ R,ZG_0.$$
By Theorem [thm: mmp very exceptional alg int fol], we may run a $(K_+B^h+_X)$-MMP$/Z$ which terminates with a weak lc model $(X',',(B^h)',)/Z$ of $(X,,B^h,)/Z$, such that $K_'+(B^h)'+_X'_ R,Z0$.
Let $B'$ and $G'$ be the images of $B$ an $G$ on $X'$ respectively, $f': X'arrow Z$ the induced contraction, and let $'$ be the moduli part of $f': (X',B'+G',)arrow Z$. By Lemma [lem: ACSS mmp can run], $(X',B'+G',)/Z$ satisfies Property $(*)$. By Proposition [prop: bp semistable foliation lc], $(X',B'+G',)/Z$ is BP semi-stable. By Proposition [prop: weak cbf gfq], $$K_X'+B'+G'+_X'_ R,ZK_'+B'+_X'_ R,Z0.$$
By Lemma [lem: +a keep under mmp], there exists an ample$/U$ $$-divisor $H' 0$ on $X'$ such that either $(B^h)' H' 0$ or $- H'$ is nef$/U$. By Theorem [thm: a special b-semiampleness], $'$ descends to $X'$ and $'_X'$ is semi-ample$/U$. Moreover, under the condition of (2), there exists a positive integer $I$ depending only on $d$ and $m$ such that $I'_X'$ is Cartier and $_X(nI'_X')$ is globally generated$/U$ for any integer $n 0$.
Let $^Z$ and $'^Z$ be the base moduli part of $f: (X,B,)arrow Z$ and $f': (X',B'+G',)arrow Z$ respectively. Since $'$ descends to $X'$ and $'_X'$ is semi-ample$/U$, $'^Z$ descends to $Z$ and $'^Z_Z$ is semi-ample$/U$. Since the induced birational map $$ is a $G'$-MMP and $G'$ is vertical$/Z$, $$ is an isomorphism over the generic point of $Z$. Thus $f: (X,B,)arrow Z$ and $f': (X',B'+G',)arrow Z$ are crepant over the generic point of $Z$. By Lemma [lem: m preserved under crepant], $^Z='^Z$. Thus $='$, and the theorem follows.
# Proofs of the main theorems
In this section, we prove all theorems that are listed in Sections [sec:Introduction] and [sec: statement of main results]. We recall the theorems that are already proven in the previous parts of the paper.
- Theorems [thm:base-point-freeness intro] and [thm: semi-ampleness intro] were proven in Subsection [subsec: bpf nonnqc].
- Theorem [thm: glc sings are Du Bois] was proven in Subsection [subsec: du bois].
- Theorem [thm: cone theorem gfq] was proven in Subsection [subsec: proof of cone].
- Theorems [thm: lc adjunction foliation nonnqc], [thm: dcc adjunction is dcc], [thm: ACSS model] were proven in Subsection [subsec: proof of adj].
- Theorem [thm: global acc alg int gfq] was proven in Subsection [subsec: global acc].
- Theorem [thm: acc lct alg int gfq] was proven in Subsection [subsec: acc].
[cf. [Conjecture 4.2(1)]CS23a]
Let $(X,,B,)/U$ be a $$-factorial F-dlt gfq. Then $(X,,B,)$ is ACSS.
Let $h: Yarrow X$ be a foliated log resolution of $(X,,B,)$ such that $a(D,,B,)>-_(D)$ for any prime $h$-exceptional divisor $D$. Let $_Y:=h^-1$ and $B_Y:=h^-1_*B+((h))^_Y$, then $(Y,_Y,B_Y,)$ is $$-factorial ACSS and $K__Y+B_Y+_Y_ R,XE 0$
for some $h$-exceptional prime divisor $E$ such that $ E=(h)$. By Theorem [thm: mmp very exceptional alg int fol], we may run a $(K_+B+_X)$-MMP$/X$ with scaling of an ample$/U$ divisor $A$ which terminates with a good minimal model $(X',',B',)/X$ of $(X,,B,)/X$, such that $E$ is contracted by this MMP. Thus the induced birational morphism $X'arrow X$ is small. Since $X$ is $$-factorial, $X'arrow X$ is the identity morphism. The theorem follows.
[Proof of Theorem [thm: mmp fdlt]]
It follows from Theorem [thm: fdlt is acss] and Proposition [prop: run mmp with scaling gfq].
[Proof of Theorem [thm: +a gmm fdlt]]
It follows from Theorems [thm: fdlt is acss], [thm: gmm polarized gfq], and Proposition [prop: run mmp get mfs].
[Proof of Theorem [thm: +a abundance fdlt]]
We may assume that $K_+B+A$ is pseudo-effective$/U$. The theorem follows from Theorems [thm: fdlt is acss] and [thm: gmm polarized gfq].
[Proof of Theorem [thm: bpf fdlt]]
It follows from Theorems [thm: fdlt is acss] and [thm: bpf induced gfq].
[Proof of Theorem [thm: eomfs]]
It is a special case of Theorem [thm: existence mfs].
[Proof of Theorem [thm: gmm ai num0]]
First we prove (3). By Theorem [thm: fdlt is acss] and Proposition [prop: projective num 0 mmp], we may run a $(K_+B)$-MMP with scaling of an
ample $$-divisor, and any such MMP terminates with a log minimal model $(X',',B')$ of $(X,,B)$ such that $K_'+B' 0$. By [Theorem 1.4]DLM23, $K_'+B'_ 0$.
(2) follows from (3) and Theorem [thm: ACSS model]. (1) follows from (2).
[Proof of Theorem [thm: abundance num 0 no restriction to f]]
Let $(Y,_Y, B_Y;G)/Z$ be a proper ACSS model of $(X,,B)$ with induced birational morphism $g: Yarrow X$, whose existence is guaranteed by Theorem [thm: property * induction]. Let $K__Y+B_Y:=g^*(K_+B)$ and $K_Y+B'_Y:=g^*(K_X+B)$. Since $(X,B)$ is lc, the coefficient of any component of $B'_Y$ is $ 1$. In particular, any coefficient of $B$ is $ 1$. We let
$$ B_Y:=g^-1_*B+((g))^_Y$$
and $E:=B_Y- B_Y$. Then $E 0$ and $E$ is exceptional$/X$.
Suppose that $K__Y+ B_Y$ is not pseudo-effective. We let
$$F:=_D D is a g-exceptional prime divisorD.$$
Then $G F$. Since $(Y, B_Y+G)$ is lc and $G F$, $(Y, B_Y+F)$ is lc. By [Theorem 5.3]ACSS21, $K_Y+ B_Y+F$ is not pseudo-effective. For any prime $f$-exceptional divisor $D$ such that $D$ is not $_Y$-invariant, we have $_D B_Y=1$. Therefore,
$$ B_Y+F=g^-1_*B+(g).$$
Since the coefficient of any component of $B'_Y$ is $ 1$, we have
$$E':=g^-1_*B+(g)-B'_Y 0$$
and $E'$ is exceptional$/X$. Therefore,
a contradiction. Thus $K__Y+ B_Y$ is not pseudo-effective. Since
$$0_(K__Y+ B_Y)_(K__Y+B_Y)=_(K_+B)=0,$$
we have $_(K__Y+ B_Y)=0$. By Theorem [thm: gmm ai num0](1), $_(K__Y+ B_Y)=0$, so
$$0=_(K__Y+ B_Y) _(K__Y+B_Y)= _(K_+B) _(K_+B)=0.$$
Thus $_(K_+B)=0$ and we are done.
[Proof of Theorem [thm: cs23 4.2(1)]]
It immediately follows from Theorem [thm: fdlt is acss].
Let $(X,,B,)$ be a $$-factorial lc generalized foliated quadruple such that $$ is algebraically integrable. Assume that there exists a foliated log resolution $h: Yarrow X$ such that $a(D,,B,)>-1$ for any $h$-exceptional prime divisor $D$. Then $$ is induced by an almost holomorphic map.
Let $_Y:=h^-1$ and let $B_Y:=h^-1_*B+((h))^_Y$, then $(Y,_Y,B_Y,)$ is $$-factorial ACSS and $K__Y+B_Y+_Y_ R,XE 0$ for some $h$-exceptional prime divisor $E$. Let $F$ be the sum of all non-$_Y$-invariant prime $h$-exceptional divisors. By assumption, $F E$.
By Theorem [thm: mmp very exceptional alg int fol], we may run a $(K_+B+_X)$-MMP$/X$ with scaling of an ample$/U$ divisor $A$ which terminates with a good minimal model $(X',',B',)/X$ of $(X,,B,)/X$, such that $E$ is contracted by this MMP. Then $F$ is contracted by this MMP, and $(X',',B',)/Z$ is ACSS for some contraction $f': X'arrow Z$. Since $X$ is $$-factorial, The induced morphism $g: X'arrow X$ only extracts $'$-invariant divisors, so $g$ is an isomorphism over the generic point of $Z$. In particular,
$$f:=f' g^-1: X Z$$
is an almost holomorphic map which induces $$.
[Proof of Theorem [thm: canonical almost holomorphic]]
It is a special case of Theorem [thm: almost holomorphic strong].
[Proof of Theorem [thm: cone theorem nonnqc gpair]]
It follows from Theorems [thm: cone theorem gfq] and [thm: cont thm gpair].
[Proof of Theorem [thm: eof nonnqc]]
It is a special case of Theorem [thm: existence of q-factorial glc flips].
[Proof of Theorem [thm: qfact nonnqc mmp can run intro]]
It follows from Theorems [thm: cone theorem nonnqc gpair] and [thm: eof nonnqc].
[Proof of Theorem [thm: kod vanishing gpair intro]]
It immediately follows from Theorem [thm: kod vanishing with lc strata](2) by letting $U=\{pt\}$.
[Proof of Theorem [thm: kv vanishing gpair intro]]
It immediately follows from Theorem [thm: kod vanishing with lc strata](2).
[Proof of Theorem [thm: subadj intro]] It is a special case of Definition-Lemma [deflem: subadj minimal lc center].
[Proof of Theorem [thm: cbf gfq]]
(1-4) follow from Definition-Theorem [defthm: cbf lctrivial morphism]. (5) follows from Definition-Theorem [defthm: cbf lctrivial morphism] and Proposition [prop: gfq cbf preserve sing]. (6) follows from Proposition [prop: gfq cbf preserve sing]. (7) follows from Lemma [lem: td=bd]. (8) follows from Lemma [lem: m preserved under crepant gfq] and Definition-Lemma [deflem: cbf finite]. (9) follows from Definition-Lemma [deflem: cbf gfq](3) and Definition-Lemma [deflem: cbf finite](6).
[Proof of Theorem [thm: fol adj intro]]
It is a special case of Theorem [thm: lc adjunction foliation nonnqc].
[Proof of Corollary [cor: global acc rank 1 gfq]]
If $K_$ is pseudo-effective, then $K_ B_X 0$. By Lemma [lem: trivial trace nef imply trivial], $0$ so there is nothing left to prove. So we may assume that $K_$ is not pseudo-effective. Since $=1$, by Theorem [thm: subfoliation algebraic integrable], $$ is algebraically integrable. The corollary follows from Theorem [thm: global acc alg int gfq].
[Proof of Theorem [thm: uniform rational polytope gfq]]
It immediately follows from Theorem [thm: uniform rational polytope].
[Proof of Theorem [thm: gfq mmp very exceptional intro]]
It is a special case of Theorem [thm: mmp very exceptional alg int fol].
[Proof of Theorem [thm: ps intro]]
It follows from Theorem [thm: a special b-semiampleness].
[Proof of Theorem [thm: main mmp foliation]]
(1) follows from Theorem [thm: fdlt is acss], Proposition [prop: weak cbf gfq], Theorem [thm: cone theorem gfq], and the contraction theorem and the existence of flips for lc pairs. (2) is a special case of Theorem [thm: bpf fdlt]. (3) is a special case of Theorem [thm: +a gmm fdlt]. (4) follows from Theorems [thm: fdlt is acss] and [thm: bpf induced gfq].
[Proof of Theorem [thm: main mmp gpair]]
(1) follows from Theorem [thm: cone theorem nonnqc gpair] and [thm: eof nonnqc] and (2) follows from Theorem [thm: semi-ampleness intro].
99
[AK00]AK00 D. Abramovich and K. Karu, Weak semistable reduction in characteristic 0, Invent. Math. 139 (2000), no. 2, 241--273.
[Amb03]Amb03 F. Ambro, Quasi-log varieties, Tr. Mat. Inst. Steklova 240 (2003), Biratsion. Geom. Linein. Sist. Konechno Porozhdennye Algebry, 220--239; translation in Proc. Steklov Inst. Math. 240 (2003), no. 1, 214--233.
[Amb05]Amb05 F. Ambro, The moduli b-divisor of an lc-trivial fibration, Compos. Math. 141 (2005), no. 2, 385--403.
[ACSS21]ACSS21 F. Ambro, P. Cascini, V. V. Shokurov, and C. Spicer, Positivity of the moduli part, arXiv:2111.00423.
[AD13]AD13 C. Araujo and S. Druel, On Fano foliations, Adv. Math., 238 (2013), 70--118.
[ABBDILW23]ABBDILW23 K. Ascher, D. Bejleri, H. Blum, K. DeVleming, G. Inchiostro, Y. Liu, and X. Wang, Moduli of boundary polarized Calabi-Yau pairs, arXiv:2307.06522.
[Ber23]Ber23 F. Bernasconi, Counterexamples to the MMP for 1-foliations in positive characteristic, arXiv:2309.13978.
[Bir12]Bir12 C. Birkar, Existence of log canonical flips and a special LMMP, Pub. Math. IHES., 115 (2012), 325--368.
[Bir19]Bir19 C. Birkar, Anti-pluricanonical systems on Fano varieties, Ann. of Math. (2), 190 (2019), 345--463.
[Bir20]Bir20 C. Birkar, On connectedness of non-klt loci of singularities of pairs, arXiv:2010.08226v2, to appear in J. Differential Geom.
[Bir21]Bir21 C. Birkar, Generalised pairs in birational geometry, EMS Surv. Math. Sci. 8 (2021), no. 1--2, 5--24.
[BZ16]BZ16 C. Birkar and D.-Q. Zhang, Effectivity of Iitaka fibrations and pluricanonical systems of polarized pairs, Pub. Math. IHES., 123 (2016), 283--331.
[BM16]BM16 F. Bogomolov and F. McQuillan, Rational curves on foliated varieties, In: Foliation theory in algebraic
geometry, Simons Symp. Springer, Cham (2016), 21--51.
[Bru02]Bru02 M. Brunella, Foliations on complex projective surfaces, arXiv:math/0212082.
[Bru15]Bru15 M. Brunella, Birational geometry of foliations, IMPA Monographs 1 (2015), Springer, Cham.
[BCHM10]BCHM10
C. Birkar, P. Cascini, C. D. Hacon and J. M, Existence of minimal models for varieties of log general type, J. Amer. Math. Soc. 23 (2010), no. 2, 405--468.
[Che20]Che20 G. Chen, Boundedness of $n$-complements for generalized pairs, arXiv:2003.04237.
[CHL23]CHL23 G. Chen, J. Han, and J. Liu, On effective Iitaka fibrations and existence of complements, arXiv:2301.04813.
[Che22]Che22 Y.-A. Chen, ACC for foliated log canonical thresholds, arXiv:2202.11346.
[Che23]Che23 Y.-A. Chen, Log canonical foliation singularities on surfaces, Math. Nachr. 00 (2023), 1--35.
[CP19]CP19 F.~Campana and M. P, Foliations with positive slopes and birational stability of orbifold cotangent bundles, Pub. Math. IHES., 129 (2019), 1--49.
[Can04]Can04 F. Cano, Reduction of the singularities of codimension one singular foliations in dimension three, Ann. Math. (2) 160 (2004), no. 3, 907--1011.
[CS20]CS20 P. Cascini and C. Spicer, On the MMP for rank one foliations on threefolds, arXiv:2012.11433.
[CS21]CS21 P.~Cascini and C. Spicer, MMP for co-rank one foliations on threefolds, Invent. math. 225 (2021), 603--690.
[CS23a]CS23a P. Cascini and C. Spicer, On the MMP for algebraically integrable foliations, to appear in Shokurov's 70th birthday's special volume, arXiv:2303.07528.
[CS23b]CS23b P. Cascini and C. Spicer, Foliation adjunction, arXiv:2309.10697.
[CD23]CD23 P. Chaudhuri and O. Das, A basepoint free theorem for algebraically integrable foliations, arXiv:2307.03530v1.
[CLX23]CLX23 B. Chen, J. Liu, and L. Xie, Vanishing theorems for generalized pairs, arXiv:2305.12337.
[DH23]DH23 O. Das and C. D. Hacon, On the Minimal Model Program for K\"ahler 3-folds, arXiv:2306.11708.
[DHY23]DHY23 O. Das, C. D. Hacon, and J. Y\'a\~nez, MMP for generalized pairs on K\"ahler 3-folds, arXiv:2305.00524.
[DLM23]DLM23 O. Das, J. Liu, and R. Mascharak, ACC for lc thresholds for algebraically integrable foliations, arXiv:2307.07157.
[DO23a]DO23a O. Das and W. Ou, On the Log Abundance for Compact K\"ahler 3-folds, Manuscripta Math. (2023)
[DO23b]DO23b O. Das and W. Ou, On the Log Abundance for Compact K\"ahler threefolds II, arXiv:2306.00671.
[dFKX17]dFKX17 T. de Fernex, J. Koll\'ar, and C. Xu, The dual complex of singularities, in Higher dimensional algebraic geometry: in honor of Professor Yujiro Kawamata’s sixtieth birthday, Adv. Stud. Pure Math., 74 (2017), Math. Soc. Japan, Tokyo, 103--129.
[Dru17]Dru17 S. Druel, On foliations with nef anti-canonical bundle, Trans. Amer. Math. Soc., 369 (2017), no. 11, 7765--7787.
[Dru21]Dru21 S. Druel, Codimension 1 foliations with numerically trivial canonical class on singular spaces, Duke Math. J., 170 (2021), no. 1, 95--203.
[Eck04]Eck04 T. Eckl, Numerically trivial foliations, Ann. Inst. Fourier (Grenoble) 54 (2004), 887--938.
[Fil19]Fil19 S. Filipazzi, Generalized pairs in birational geometry, 2019. PhD thesis, University of Utah.
[Fil20]Fil20 S. Filipazzi, On a generalized canonical bundle formula and generalized adjunction, Ann. Sc. Norm. Super. Pisa Cl. Sci. (5) Vol. XXI (2020), 1187--1221.
[FS23]FS23 S. Filipazzi and R. Svaldi, On the connectedness principle and dual complexes for generalized pair, Forum Math. Sigma 11 (2023), E33.
[Flo14]Flo14 E. Floris, Inductive approach to effective b-semiampleness, Int. Math. Res. Not. 6 (2014), 1465--1492.
[Fuj11]Fuj11 O. Fujino, Fundamental theorems for the log minimal model program, Publ. Res. Inst. Math. Sci. 47 (2011), no. 3, 727--789.
[Fuj17]Fuj17 O. Fujino, Foundations of the minimal model program, MSJ Memoirs, 35, Mathematical Society of Japan, Tokyo (2017).
[FM00]FM00 O. Fujino and S. Mori, A canonical bundle formula, J. Differential Geom. 56 (2000), no. 1, 167--188.
[FG12]FG12 O. Fujino and Y. Gongyo, On canonical bundle formulas and subadjunctions, Michigan Math. J. 61 (2012), 255--264.
[FG14]FG14 O. Fujino and Y. Gongyo, On the moduli b-divisors of lc-trivial fibrations, Ann. Inst. Fourier (Grenoble), 64 (2014), no. 4, 1721--1735.
[Gon11]Gon11 Y. Gongyo, On the minimal model theory for dlt pairs of numerical Kodaira dimension zero, Math. Rest. Lett. 18 (2011), no. 5, 991--1000.
[HL21a]HL21a C. D. Hacon and J. Liu, Existence of flips for generalized lc pairs, arXiv:2105.13590, to appear in Camb. J. Math.
[HMX14]HMX14 C. D. Hacon, J. M, and C. Xu, ACC for log canonical thresholds, Ann. of Math. 180 (2014), no. 2, 523--571.
[HX13]HX13 C. D. Hacon and C. Xu, Existence of log canonical closures, Invent. Math. 192 (2013), no. 1, 161--195.
[HL22]HL22 J. Han and Z. Li, Weak Zariski decompositions and log terminal models for generalized polarized pairs, Math. Z. 302 (2022), 707--741.
[HLS19]HLS19 J. Han, J. Liu, and V. V. Shokurov, ACC for minimal log discrepancies of exceptional singularities, arXiv:1903.04338.
[HL21b]HL21b J. Han and W. Liu, On a generalized canonical bundle formula for generically finite morphisms, Ann. Inst. Fourier (Grenoble), 71 (2021), no. 5, 2047--2077.
[Har77]Har77 R. Hartshorne, Algebraic geometry, Springer-Verlag, New York-Heidelberg (1977), Graduate Texts in Mathematics, no. 52.
[Has22]Has22 K. Hashizume, Iitaka fibrations for dlt pairs polarized by a nef and log big divisor, Forum Math. Sigma. 10 (2022), Article No. 85.
[HH20]HH20 K. Hashizume and Z. Hu, On minimal model theory for log abundant lc pairs, J. Reine Angew. Math., 767 (2020), 109--159.
[Hu20]Hu20 Z. Hu, Log abundance of the moduli b-divisors for lc-trivial fibrations, arXiv:2003.14379.
[KMM87]KMM87 Y. Kawamata, K. Matsuda, and K. Matsuki, Introduction to the minimal model problem, Algebraic geometry, Sendai (1985), 283--360, Adv. Stud. Pure Math., 10, North-Holland, Amsterdam (1987).
[JLX22]JLX22 J. Jiao, J. Liu, and L. Xie, On generalized lc pairs with b-log abundant nef part, arXiv:2202.11256.
[Kaw98]Kaw98 Y. Kawamata, Subadjunction of log canonical divisors, II, Amer. J. Math. 120 (1998), no. 5, 893--899.
[Kod64]Kod64 K. Kodaira, On the structure of compact complex analytic surfaces, I, Amer. J. Math. 86 (1964), 751--798.
[Kol07]Kol07 J. Koll\'ar, Kodaira’s canonical bundle formula and adjunction, In: Flips for 3-folds and 4-folds, Ed. by A. Corti. 35. Oxford Lecture Series in Mathematics and its Applications. Oxford: Oxford University Press (2007), Chap. 8, 134--162.
[Kol13]Kol13 J. Koll\'ar, Singularities of the minimal model program, Cambridge Tracts in Math. 200 (2013), Cambridge Univ. Press. With a collaboration of S\'andor Kov\'acs.
[Kol23]Kol23 J. Koll\'ar, Families of varieties of general type, Cambridge Tracts in Math. 231 (2023), Cambridge Univ. Press. With the collaboration of Klaus Altmann and S\'andor Kov\'acs.
[Kol$^+$92]Kol+92 J. Koll\'ar et al., Flip and abundance for algebraic threefolds. Ast\'erisque no. 211, (1992).
[KM98]KM98 J. Koll\'ar and S. Mori, Birational geometry of algebraic varieties, Cambridge Tracts in Math. 134 (1998), Cambridge Univ. Press.
[Kov99]Kov99 S. J. Kov\'acs, Rational, log canonical, Du Bois singularities: on the conjectures of Koll\'ar and Steenbrink, Compos. Math. 118 (1999), no. 2, 123--133.
[Kov11]Kov11 S. J. Kov\'acs, DB pairs and vanishing theorems, Kyoto Journal of Mathematics, Nagata Memorial Issue 51 (2011), no. 1, 47--69.
[Kov12]Kov12 S. J. Kov\'acs, The splitting principle and singularities, Compact moduli spaces and vector bundles, Contemp. Math. 564 (2012), Amer. Math. Soc. Providence, RI, 195--204.
[LT22]LT22 V. Lazi\'c and N. Tsakanikas, Special MMP for log canonical generalised pairs (with an appendix joint with Xiaowei Jiang), Sel. Math. New Ser. 28 (2022), Article No. 89.
[LLM23]LLM23 J. Liu, Y. Luo, and F. Meng, On global ACC for foliated threefolds, arXiv:2303.13083, to appear in Trans. of Amer. Math. Soc.
[LMX23a]LMX23a J. Liu, F. Meng, and L. Xie, Complements, index theorem, and minimal log discrepancies of foliated surface singularities, arXiv:2305.06493.
[LMX23b]LMX23b J. Liu, F. Meng, and L. Xie, Uniform rational polytope of foliated threefolds and the global ACC, arXiv:2306.00330.
[LX23a]LX23a J. Liu and L. Xie, Relative Nakayama-Zariski decomposition and minimal models of generalized pairs, Peking Math. J. (2023).
[LX23b]LX23b J. Liu and L. Xie, Semi-ampleness of generalized pairs, Adv. Math. 427 (2023), 109126.
[McQ98]McQ98 M. McQuillan, Diophantine approximation and foliations, Pub. Math. IHES. 87 (1998), 121--174.
[McQ08]McQ08 M. McQuillan, Canonical models of foliations, Pure Appl. Math. Q. 4 (2008), no. 3, Special Issue: In honor of Fedor Bogomolov, Part 2, 877--1012.
[Miy87]Miy87 Y. Miyaoka, Deformations of a morphism along a foliation and applications, Algebraic geometry, Bowdoin, Proc. Sympos. Pure Math. 46 (1985) (Brunswick, Maine, 1985), Amer. Math. Soc., Providence, RI (1987), 245--268.
[Nak16]Nak16 Y. Nakamura, On minimal log discrepancies on varieties with fixed Gorenstein index, Michigan Math. J. 65 (2016), no. 1, 165--187.
[Nak04]Nak04 N. Nakayama, Zariski-decomposition and abundance, MSJ Memoirs, 14 (2004), Mathematical Society of Japan, Tokyo.
[PS09]PS09 Y.G. Prokhorov and V. V. Shokurov, Towards the second main theorem on complements, J. Algebraic Geom., 18 (2009), no. 1, 151--199.
[Roc97]Roc97 R. T. Rockafellar, Convex analysis (1997), vol. 11, Princeton University Press.
[Sei68]Sei68 A. Seidenberg, Reduction of singularities of the differential equation A dy = B dx, Amer. J. Math. 90 (1968), 248--269.
[Sho00]Sho00 V. V. Shokurov, Complements on surfaces, J. Math. Sci. (New York) 102 (2000), no. 2, 3876--3932.
[Siu10]Siu10 Y.-T. Siu, Abundance conjecture, in Geometry and analysis, no. 2, Ed. by L. Ji, 271--317. Advanced Lectures in Mathematics. Boston International Press.
[Spi20]Spi20 C. Spicer, Higher dimensional foliated Mori theory, Compos. Math. 156 (2020), no. 1, 1--38.
[SS22]SS22 C. Spicer and R. Svaldi, Local and global applications of the Minimal Model Program for co-rank 1 foliations on threefolds, J. Eur. Math. Soc. 24 (2022), no. 11, 3969--4025.
[Sza94]Sza94 E. Szab\'o, Divisorial log terminal singularities, J. Math. Sci. Univ. Tokyo, 1 (1994), no. 3, 631--639.
[TX23]TX23 N. Tsakanikas and L. Xie, Remarks on the existence of minimal models of log canonical generalized pairs, arXiv:2301.09186.
[Xie22]Xie22 L. Xie, Contraction theorem for generalized pairs, arXiv:2211.10800.
[Xu23]Xu23 Z. Xu, Abundance for threefolds in positive characteristic when $=2$, arXiv:2307.03938.