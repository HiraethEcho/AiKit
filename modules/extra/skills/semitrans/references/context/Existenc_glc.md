of flips for generalized lc pairs
D. Hacon and Jihao Liu
of Mathematics, The University of Utah, Salt Lake City, UT 84112, USA
@math.utah.edu
of Mathematics, The University of Utah, Salt Lake City, UT 84112, USA
@math.utah.edu
[2020]14E30,14C20.14E05,14J17,14J30,14J35
We prove the existence of flips for $$-factorial NQC generalized lc pairs, and the cone and contraction theorems for NQC generalized lc pairs. This answers a question of C. Birkar which was conjectured by J. Han and Z. Li. As an immediate application, we show that we can run the minimal model program for $$-factorial NQC generalized lc pairs. In particular, we complete the minimal model program for $$-factorial NQC generalized lc pairs in dimension $ 3$ and pseudo-effective $$-factorial NQC generalized lc pairs in dimension $4$.
# Introduction
We work over the field of complex numbers $ C$, however many of the results also hold over any algebraically closed field $k$ of characteristic zero.
The main purpose of this paper is to prove the following theorem:
Let $(X,B,)/U$ be an NQC glc g-pair and $U^0 U$ a non-empty open subset. Let $X^0:=X_UU^0$, $B^0:=B_UU^0$, and $^0:=_UU^0$ (see Definition [defn: b divisor restriction over an open subset] below). Assume that
- the morphism $Xarrow U$ is a projective morphism between normal quasi-projective varieties,
- $(X^0,B^0,^0)/U^0$ has a good minimal model,
- all glc centers of $(X,B,)$ intersect $X^0$, and
- $ ^0$ descends to $X^0$ and $^0_X^0_ R,U^00$.
Then $(X,B,)/U$ has a good minimal model.
Here ``glc g-pair" stands for ``generalized lc pair" and ``NQC" stands for ``nef $$-Cartier combination". We remark that NQC generalized pairs in our paper exactly correspond to the original generalized pairs defined in [BZ16]. See Definition [defn: g-pairs] for more details.
As an immediate application of Theorem [thm: existence of glc closure], we show the existence of flips for $$-factorial NQC generalized lc pairs:
[Existence of generalized lc flips]
Let $(X,B,)/U$ be a $$-factorial NQC glc g-pair and $f: Xarrow Z$ a $(K_X+B+_X)$-flipping contraction over $U$. Then the flip $f^+: X^+arrow Z$ of $f$ exists.
In fact, we will also show that $X^+$ is $$-factorial and $(X)=(X^+)$, and hence the flip $X X^+$ is compatible with the minimal model program for generalized pairs. See Theorem [thm: existence glc flip with m r cartier] below.
As a complement to Theorem [thm: existence of q-factorial glc flips], we prove the cone and contraction theorems for NQC generalized lc pairs, thus completely answering Birkar's question on the existence of contractions and flips [6.1]Bir20b which was originally conjectured by Han-Li [Conjectures 3.1, 3.3]HL18.
[Cone and contraction theorems for generalized lc pairs]
Let $(X,B,)/U$ be an NQC glc g-pair and $: Xarrow U$ the associated morphism. Let $\{R_j\}_j$ be the set of $(K_X+B+_X)$-negative extremal rays in $(X/U)$ that are rational. Then:
- $$(X/U)=(X/U)_K_X+B+_X 0+_j R_j.$$
In particular, any $(K_X+B+_X)$-negative extremal ray in $(X/U)$ is rational.
- Each $R_j$ is spanned by a rational curve $C_j$ such that $(C_j)=\{pt\}$ and
$$0<-(K_X+B+_X) C_j 2 X.$$
- For any ample$/U$ $$-divisor $A$ on $X$,
$$_A:=\{j R_j(X/U)_K_X+B+_X+A<0\}$$
is a finite set. In particular, $\{R_j\}_j$ is countable, and is a discrete subset in $(X/U)_K_X+B+_X+A<0$. Moreover, we may write
$$(X/U)=(X/U)_K_X+B+_X+A 0+_j_AR_j.$$
- Assume that $_X$ is $$-Cartier. Let $R$ be a $(K_X+B+_X)$-negative extremal ray in $(X/U)$. Then $R$ is a rational extremal ray. In particular, there exists a projective morphism $_R: Xarrow Y$ over $U$ satisfying the following.
- For any integral curve $C$ such that $(C)$ is a point, $_R(C)$ is a point if and only if $[C] R$.
- $_Y(_R)_*_X$. In other words, $_R$ is a contraction.
- Let $L$ be a line bundle on $X$ such that $L R=0$. Then there exists a line bundle $L_Y$ on $Y$ such that $L f^*L_Y$.
An immediate corollary of Theorems [thm: existence of q-factorial glc flips] and [thm: cone and contraction theorem glc pair] is that we can run minimal model programs (MMPs) for $$-factorial NQC glc g-pairs:
We can run the MMP for $$-factorial NQC glc g-pairs. More precisely, for any $$-factorial NQC glc g-pair $(X,B,)/U$, there exists a sequence of $(K_X+B+_X)$-flips and divisorial contractions over $U$. Moreover, any such sequence ends either with a Mori fiber space, or a minimal model, or an infinite sequence of flips over $U$.
Therefore, as long as we know the termination of flips, we can completely establish the minimal model program for $$-factorial NQC glc g-pairs. In particular, we have:
The MMP for $$-factorial NQC glc g-pairs in dimension $ 3$ holds, and the MMP for pseudo-effective $$-factorial NQC glc g-pairs in dimension $4$ holds. More precisely, for any $$-factorial NQC glc g-pair $(X,B,)/U$ such that either $ X 3$ or $ X=4$ and $K_X+B+_X$ is pseudo-effective$/U$, there exists a sequence of $(K_X+B+_X)$-flips and divisorial contractions over $U$. Moreover, any such sequence ends either with a Mori fiber space or a minimal model over $U$.
The theory of generalized pairs (g-pairs for short) was introduced by C. Birkar and D.-Q. Zhang in [BZ16] to tackle the effective Iitaka fibration conjecture. Some embryonic forms of this theory can be found in [Bir12b,BH14], and can even be traced back to the early studies on the moduli part of the canonical bundle formula and sub-adjunctions [Kaw98,FM00]. Although, seemingly technical, in recent years, the theory of generalized pairs has proven to be a powerful tool in birational geometry. In particular, this theory has been essentially used in the proof of the Borisov-Alexeev-Borisov conjecture [Bir19,Bir21a]. For other results closely related to the theory of generalized pairs, we refer the reader to [HX15,Fil18a,Mor18,HL18, Fil18b,Bir18,HH19,HL19,LT19,HM20,HL20a,HL20b,HL20d,LP20a,LP20b,Li20,Hu20,FS20a,Fil20,Bir20a,HL20c,CX20,Bir20c,FS20b,FW20,BDCS20,CT20,Sho20,Has20,Li21,Liu21,LX21,Hu21,Jia21,Bir21b,FH21]. We also refer the reader to [Bir20b] for a more detailed introduction to the theory of generalized pairs.
It has recently become apparent that the minimal model program (MMP) for generalized pairs is closely related to the minimal model program for usual pairs and varieties. In particular, generalized pairs have been used to prove the termination of pseudo-effective fourfold flips [Mor18,HL18,HM20,CT20]. For this, and other reasons, it is important to study the minimal model program for generalized pairs. For gklt (generalized klt) g-pairs or $$-factorial gdlt (generalized dlt) g-pairs, the corresponding theory is very similar to the case of the usual klt or $$-factorial dlt pairs (cf. [Lemma 4.4]BZ16, [Lemma 3.5]HL18). However, when studying the MMP for glc g-pairs, we encounter several non-trivial issues. Before discussing these, let us first recall the main features of the usual minimal model program.
1. We start with a $$-factorial projective pair $(X,B)$ with at worst lc singularities.
2. If $K_X+B$ is nef, i.e. $(X,B)$ is a minimal model then we are done. Otherwise, by the cone and the contraction theorems, we contract a $(K_X+B)$-negative extremal ray and get a contraction $f: Xarrow Z$.
3. If $f$ is a Mori fiber space, then we are done. If $f$ is a divisorial contraction, then we replace $X$ with $Z$ and continue. If $f$ is a flipping contraction and the flip $f^+: X^+arrow Z$ of $f$ exists, then we replace $X$ with $X^+$ and continue. Note that the $$-factorial condition, which usually follows from the cone and the contraction theorems, needs to be preserved.
4. If there does not exist an infinite sequence of flips, then the MMP terminates with either a minimal model or a Mori fiber space, and we are done.
In summary, to complete a minimal model program, we need
- the cone and the contraction theorems,
- the existence of flips, and
- the termination of flips.
For the usual lc pairs, (1) and (2) are completely known. In fact, the cone and contraction theorems for projective klt pairs appear in [Kaw84] and are completed in [Kol84], the relative versions are proven in [KMM87], the cone and contraction theorems for lc pairs are proven in [Amb03,Fuj11] by using the theory of quasi-log varieties, the existence of klt flips is proven in [BCHM10], and the existence of lc flips is proven in [Bir12a,HX13]. The difficult part for the minimal model program for usual pairs is (3): we only know the termination of flips in full generality, in dimension $ 3$ [Kaw92,Sho96]. In dimension $4$, some special cases have been proven: the terminal case in [KMM87], klt anti-effective case and some other special cases in [AHK07], canonical case with rational coefficients in [Fuj04,Fuj05], effective case in [Bir07,HMX14], and pseudo-effective case [Mor18,HL18,HM20,CT20] as we mentioned earlier.
For glc pairs that are neither gklt nor $$-factorial gdlt, the situation is completely different. First of all, we usually need to add the NQC condition for technical reasons (cf. [Example 3.15]HL18), however this is a natural assumption and is contained in the original definition of generalized pairs in [BZ16]. Under the NQC assumption, the known results on the termination of flips are similar to the usual pair case (in particular, in full generality in dimension $ 3$ [CT20] and in the pseudo-effective case in dimension $4$ [HM20,CT20]). However, the cone and contraction theorems and the existence of flips seem to be far more challenging even in dimension $3$, and we only know some partial results when $$ descends to $X$, i.e., $_X$ is nef [LP20a,LP20b]. We remark that for curves and surfaces, there are no flips, and the cone and contraction theorems follow from the usual cone and contraction theorems as $_X$ is always nef.
Very recently, there has been some progress towards the existence of flips for generalized pairs. K. Hashizume has shown the non-vanishing theorem for glc pairs with a polarization [Theorem 1.1]Has20, and also investigated the termination of a special MMP for glc pairs [Theorem 1.3]Has20, which has a close connection with the existence of glc flips. Recently, Z. Hu proved the finiteness of B-representations for some special glc pairs [Theorem 1.5]Hu21, a generalized pair version of [Theorem 1.1]FG14 and [Theorem 1.2]HX16. This result induces the generalized pair version of [Theorem 1.4]FG14 and [Theorem 1.4]HX16 ([Thereom 1.9]Hu21), and [Theorem 1.7]Bir12a and [Corollary 1.5]HX16 ([Thereom 1.10]Hu21), which are important theorems in the proof of the existence of lc flips. In this paper, we will prove the existence of flips for $$-factorial NQC glc g-pairs, which solves (2). Although it turns out that we do not need K. Hashizume's result and Z. Hu's result to prove the existence of glc flips, their results motivated us. We also expect that the methods in [Hu21] can be applied to the termination of flips under the setting of [Theorem 1.3]Has20.
To guarantee that we can run the minimal model program for $$-factorial glc g-pairs, we are only left to prove the corresponding cone and contraction theorems. We can prove the cone theorem by combining results of F. Ambro and O. Fujino on the cone and contraction theorems of non-lc pairs [Amb03,Fuj11] and recent results of J. Han and W. Liu on generalized sub-adjunction [HL19]. Although we cannot prove the base-point-free theorem in the same generality as in [Amb03,Fuj11], fortunately for us, we are able to prove the contraction theorem for extremal rays by using the special properties of extremal rays. Combining with the cone theorem, we solve (1). We remark that O. Fujino has a recent paper [Fuj21] on related topics, where he considers the cone and contraction theorems for quasi-log schemes. Note that any quasi-lc pair is a generalized lc pair (cf. [Remark 1.9]Fuj18).
of the proof. We first sketch our proof on the existence of flips (Theorem [thm: existence of q-factorial glc flips]). Notice that for a $$-factorial generalized pair $(X,B,)/U$ equipped with a flipping contraction $f: Xarrow Z$ over $U$, we can always assume that $_X C<0$ for any flipping curve, otherwise $f$ is a $(K_X+B)$-flipping contraction and the existence of the flip just follows from the existence of flips for lc pairs. Notice that on the complement of the flipping locus, we have $_X_0$ as a $$-divisor over $Z$. In other words, $_X|_f^-1(Z^0)_,Z^00$ over some non-empty open subset $Z^0$ of $Z$. However, in this situation, we can pick $0 G_,Z_X$ such that $(X,B+G)$ is lc and have some additional good properties. The existence a good minimal model of $(X,B,)/U$ follows from the existence of a good minimal model of $(X,B+G)$ which is preserved by [HX13,Has19].
Now we sketch a proof of the cone theorem. Possibly perturbing the generalized pair $(X,B,)/U$ with an ample divisor, we may assume that $K_X+B+_X_,UK_X+$ for some pair $(X,)$. $(X,)$ is not necessary lc; however, we may assume that the non-lc locus of $(X,)$ is exactly the non-gklt locus of $(X,B,)$. Now we want to apply the results of F. Ambro [Amb03] and O. Fujino [Fuj11]. Since we have a generalized pair structure, a key observation is that we can do sub-adjunction to any non-lc center of $(X,B,)$ and still have a generalized lc pair structure after the sub-adjunction [HL19]. Applying induction on the dimension, we immediately get the cone theorem.
We can use the cone theorem to deduce the contraction theorem. Assume that $_X$ is $$-Cartier. To prove the contraction theorem for any $(K_X+B+_X)$-negative extremal ray $R$, we only need to prove some special base-point-freeness theorems for any supporting function $L$ of a $(K_X+B+_X)$-negative extremal ray. We can always assume that $_X R<0$. In this case, possibly replacing $$ with $(1-)$ for $0< 1$, we may assume that $(X,B,)=(X,B)=(X,)$ and $(X,)$ does not contain any curve $C$ such that $[C] R$. By the cone theorem and Kleiman's Criterion, we know that $L|_(X,)$ is ample. Now we can apply the results of F. Ambro [Amb03] and O. Fujino [Fuj11] to prove the base-point-freeness theorem for $L$.
Finally, together with the existence of flips we just proved, we know that we can run MMP for any $$-factorial NQC glc g-pair (Theorem [thm: can run gpair mmp]). In other words, for $$-factorial NQC glc g-pairs, whenever we know the termination of flips, we will have the complete MMP, and Theorem [thm: gpair mmp 3fold and pe fourfold] follows from [HM20,CT20].
of the paper. In Section 2, we introduce some notation and tools for generalized pairs and MMPs which will be used in this paper. In Section 3, we study different models for generalized pairs. In Section 4, we proof prove Theorem [thm: existence of glc closure]. In Section 5, we prove the base-point-free theorem, contraction theorem, and cone theorem for generalized lc pairs, which implies Theorem [thm: cone and contraction theorem glc pair]. In Section 6, we prove the rest of our main theorems, i.e. Theorems [thm: existence of q-factorial glc flips], [thm: can run gpair mmp], and [thm: gpair mmp 3fold and pe fourfold].
. After the first version of our paper appeared, we were informed by Haidong Liu and Zhengyu Hu that there are some troubles with [Theorem 1.9]Hu21, a result we used in the proofs of Theorems 7.5 and 9.1 of the first version of the paper. Therefore some of the corresponding proofs in the first version of this paper are incomplete. Fortunately for us, we could avoid using [Hu21] and still prove all our main results except Theorem [thm: cone and contraction theorem glc pair](4): without applying [Hu21], we could only contract $(K_X+B+_X)$-negative extremal rays rather than faces, and we need to assume that $_X$ is $$-Cartier. Nevertheless, this modification does not affect the other main results of the paper. Indeed, the current Theorem [thm: cone and contraction theorem glc pair](4.c) is even comparably stronger than that of the first version from the perspective of running the minimal model program: for example, the current Theorem [thm: cone and contraction theorem glc pair](4.c) will imply the $$-factorial glc version of Lemma [lem: still an mmp under perturbation] while the first version did not. We were later informed by Nikolaos Tsakanikas that he and Vladimir Lazi\'c have obtained some results on the minimal model program for generalized pairs [LT21] based on the main theorems of our paper, which require the current version of Theorem [thm: cone and contraction theorem glc pair](4.c).
After the second version of this paper appeared, we were informed by Kenta Hashizume that Theorem 1.1 can be immediately implied by Claim 7.6 of the second version of our paper on the arXiv. This greatly simplifies our proof. Comparing to the second version, we completely remove Sections 5,6, most parts of Sections 4,7,8, and a part of Section 2. The main theorems are not changed.
We thank Kenta Hashizume, Zhengyu Hu, Haidong Liu, and Nikolaos Tsakanikas for these discussions.
. The second author would like to thank Jingjun Han, Junpeng Jiao, and Yuchen Liu for useful discussions. The authors are partially supported by NSF research grants no: DMS-1801851, DMS-1952522 and by a grant from the Simons Foundation; Award Number: 256202.
# Preliminaries
We will freely use the notation and definitions from [KM98,BCHM10]. For generalized pairs, we will follow the definitions in [HL18] but follow the notation as in [FS20b,Has20] (see Remarks [rem: difference in definition of g-pair], [rem: difference in definition of gdlt], [rem: difference in notation of g-pair] below).
## Divisors
Let $a$ be a real number, $X$ a normal variety, and $D=_i d_iD_i$ an $$-divisor on $X$, where $D_i$ are the irreducible components of $D$. We define $D^ a:=_i d_i a d_iD_i$, $D^=a:=_i d_i=a d_iD_i$, $D^ a:=_i d_i a d_iD_i$, $ D:=_i d_i D_i$, and $\{D\}:=_i\{d_i\}D_i$.
Let $: X Y$ be a birational map. We let $()$ be the union of the exceptional divisors of $$, and usually identify $()$ with the reduced exceptional divisor of $$.
The following lemma and its proof are taken verbatim from [Lemma 3.2.1]BCHM10.
[cf. [Lemma 3.2.1]BCHM10]
Let $ K= Q$ or $ R$. Let $: Xarrow U$ be a projective morphism between normal quasi-projective varieties. Let $D$ be a $ K$-Cartier $ K$-divisor on $X$ and let $D'$ be its restriction to the generic fiber of $$.
If $D'_ K B' 0$ for some $ K$-divisor $B'$ on the generic fiber of $$, then $D_ K,UB 0$ for some $ K$-divisor $B$, such that $B'$ is the restriction of $B$ to the generic fiber of $$.
Taking the closure of the generic points of $B'$, we may assume that there exists a $ K$-divisor $B_1 0$ such that $B'$ is the restriction of $B_1$ to the generic fiber of $$. Since $D'-B'_ K 0$, $(D-B_1)|_^-1(U_1)_ K 0$ for some non-empty proper open subset $U_1$ of $U$. Then there exists a $ K$-divisor $G$ on $X$ such that $D-B_1_ K G$ and $Z:=( G)$ is a proper closed subset of $U$. Since $U$ is quasi-projective, there exists an ample $ K$-divisor $H 0$ on $U$ which contains $Z$, such that $F:=^*H -G$. Thus $D_ K,U B_1+F+G 0$. By our construction, $F$ and $G$ are vertical over $U$, so $B'$ is the restriction of $B:=B_1+F+G$ to the generic fiber of $$.
## Rational maps
[Contraction and birational contraction]
A contraction is a projective morphism $f: Xarrow Y$ such that $f_*_X=_Y$. In particular, $f$ has connected fibers, and if $Xarrow Zarrow Y$ is the Stein factorization of $f$, then $Zarrow Y$ is an isomorphism. Moreover, if $X$ is normal, then $Y$ is normal.
Let $: X Y$ be a proper birational map between normal varieties. Then $$ is called a birational contraction if $$ does not extract any divisors.
For any birational contraction $: X Y$ and $$-Cartier $$-divisor $D$ on $X$, let $p: Warrow X$ and $q: Warrow Y$ be a common resolution such that $q= p$, and let $D_Y:=_*D$. Then $f$ is called
- $D$-trivial if $D_Y$ is $$-Cartier and $p^*D=q^*D_Y$,
- $D$-non-positive if $D_Y$ is $$-Cartier, and $p^*D=q^*D_Y+E$ for some $E 0$ that is exceptional over $Y$, and
- $D$-negative if $D_Y$ is $$-Cartier, $p^*D=q^*D_Y+E$ for some $E 0$ that is exceptional over $Y$, and $() (p_*E)$.
Let $: Xarrow U$ be a projective morphism such that $X$ is normal. Let $D$ be an $$-Cartier $$-divisor on $X$, $: X Y$ a birational contraction over $U$ such that $$ is $D$-trivial, and $D_Y:=_*D$. Then for any non-empty open subset $U^0 U$, $D^0:=D_UU^0$ is semi-ample$/U^0$ if and only if $D_Y^0:=D_Y_UU^0$ is semi-ample$/U^0$.
Let $p: Warrow X$ and $q: Warrow Y$ be a common resolution such that $q= p$. Since $$ is $D$-trivial, $D_W:=p^*D=q^*D_Y$. Let $D_W^0:=D_W_UU^0$ and $W^0:=W_UU^0$. Then
$$(p|_W^0)^*D^0=(p^*D)|_W^0=D_W^0=(q^*D_Y)|_W^0=(q|_W^0)^*D^0_Y,$$
and the lemma follows.
## Semi-stable reduction
A pair $(X,B)$ is called quasi-smooth if $X$ is $$-factorial and $(X,B)$ is toroidal.
Let $(X,B)$ be a dlt pair and $: Xarrow U$ a projective surjective morphism over a normal variety $U$. Then there exists a commutative diagram of projective morphisms
$
Y@->[r]^f@->[d]_' & X@->[d]^
V@->[r]^ & U
$
such that
- $f,$ are birational morphisms, $'$ is an equidimensional contraction, $Y$ only has $$-factorial toroidal singularities, and $V$ is smooth, and
- there exist two $$-divisors $B_Y$ and $E$ on $Y$, such that
- $K_Y+B_Y=f^*(K_X+B)+E$,
- $B_Y 0$, $E 0$, and $B_Y E=0$,
- $(Y,B_Y)$ is lc quasi-smooth, and any lc center of $(Y,B_Y)$ on $X$ is an lc center of $(X,B)$.
This result follows from [AK00], see also [Theorem B.6]Hu20, [Theorem 2]Kaw15 and [Step 2 of Proof of Lemma 3.2]Has19.
## $$-divisors
[$$-divisors] Let $X$ be a normal quasi-projective variety. We call $Y$ a birational model over $X$ if there exists a projective birational morphism $Y X$.
Let $X X'$ be a birational map. For any valuation $$ over $X$, we define $_X'$ to be the center of $$ on $X'$. A $$-divisor $$ over $X$ is a formal sum $=_ r_$ where $$ are valuations over $X$ and $r_ R$, such that $_X$ is not a divisor except for finitely many $$. If in addition, $r_$ for every $$, then $$ is called a $$-$$-divisor. The trace of $$ on $X'$ is the $$-divisor
$$_X':=__i,X' is a divisorr_i_i,X'.$$
If $_X'$ is $$-Cartier and $_Y$ is the pullback of $_X'$ on $Y$ for any birational model $Y$ of $X'$, we say that $$ descends to $X'$, and also say that $$ is the closure of $_X'$, and write $=_X'$.
Let $Xarrow U$ be a projective morphism and assume that $$ is a $$-divisor over $X$ such that $$ descends to some birational model $Y$ over $X$. If $_Y$ is nef$/U$, then we say that $$ is nef$/U$. If $_Y$ is a Cartier divisor, then we say that $$ is $$-Cartier. If $_Y$ is a $$-Cartier $$-divisor, then we say that $$ is $$-$$-Cartier. If $$ can be written as an $_ 0$-linear combination of nef$/U$ $$-Cartier $$-divisors, then we say that $$ is NQC$/U$.
We let $0$ be the $$-divisor $0$.
Let $Xarrow U$ be a projective morphism such that $X$ is a normal quasi-projective varieties, and let $U^0$ be a non-empty open subset of $U$. Let $$ be a $$-divisor over $X$. We define a $$-divisor $^0:=_UU^0$ in the following way.
For any birational projective morphism $Y^0 X^0=X _UU^0$, we may assume that $Y^0=Y _UU^0$ where $Y X$ is a birational projective morphism. We let $^0 _Y^0= _Y|_Y_0$. It is easy to see that this definition is independent of the choice of $Y$ and defines a $$-divisor.
It is easy to see that if $Warrow X$ is a birational morphism such that $$ descends to $W$, then $^0$ is the closure of $_W_UU^0$. Since base change is compatible with pullbacks, $^0$ is well-defined and independent of the choice of $W$. We also note that if $$ is nef$/U$, then $^0$ is nef$/U^0$, and if $$ is NQC$/U$, then $^0$ is NQC$/U^0$.
## Generalized pairs
[Generalized pairs]
A generalized sub-pair (g-sub-pair for short) $(X,B,)/U$ consists of a normal quasi-projective variety $X$ associated with a projective morphism $Xarrow U$, an $$-divisor $B$ on $X$, and a nef$/U$ $$-divisor $$ over $X$, such that $K_X+B+_X$ is $$-Cartier. If $$ is NQC$/U$, then we say that $(X,B,)/U$ is an NQC g-sub-pair. If $B$ is a $$-divisor and $$ is a $$-$$-divisor, then we say that $(X,B,)/U$ is a $$-g-sub-pair.
If $=0$, a g-sub-pair $(X,B,)/U$ is called a sub-pair and is denoted by $(X,B)$ or $(X,B)/U$.
If $U=\{pt\}$, we usually drop $U$ and say that $(X,B,)$ is projective.
A g-sub-pair (resp. NQC g-sub-pair, $$-g-sub-pair) $(X,B,)/U$ is called a g-pair (resp. NQC g-pair, $$-g-pair) if $B 0$. A sub-pair $(X,B)$ is called a pair if $B 0$.
In the previous definition, if $U$ is not important, we may also drop $U$. This usually happens when we emphasize the structures of $(X,B,)$ that are independent of the choice of $U$, such as the singularities of $(X,B,)$. See Definition [defn: sing of g-pairs] below.
[Singularities of generalized pairs]
Let $(X,B,)/U$ be a g-(sub-)pair. For any prime divisor $E$ and $ R$-divisor $D$ on $X$, we define $_ED$ to be the multiplicity of $E$ along $D$. Let $h:W X$
be any log resolution of $(X, B)$ such that $$ descends to $W$, and let
$$K_W+B_W+_W:=h^*(K_X+B+_X).$$
The log discrepancy of a prime divisor $D$ on $W$ with respect to $(X,B,)$ is $1-_DB_W$ and it is denoted by $a(D,X,B,).$
We say that $(X,B,)$ is (sub-)glc (resp. (sub-)gklt) if $a(D,X,B,)0$ (resp. $>0$) for every log resolution $h: W X$ as above and every prime divisor $D$ on $W$.
We say that $(X,B,)$ is gdlt if $(X,B,)$ is glc, and there exists a closed subset $V X$, such that
- $X V$ is smooth and $B_X V$ is simple normal crossing, and
- for any prime divisor $E$ over $X$ such that $a(E,X,B,)=0$, $_XE V$ and $_XE V$ is an lc center of $(X V,B|_X V)$.
If $=0$ and $(X,B,)$ is (sub-)glc (resp, (sub-)gklt, gdlt), we say that $(X,B)$ is (sub-)lc (resp. (sub-)klt, dlt).
Suppose that $(X,B,)$ is sub-glc. A glc place of $(X,B,)$ is a prime divisor $E$ over $X$ such that $a(E,X,B,)=0$. A glc center of $(X,B,)$ is the center of a glc place of $(X,B,)$ on $X$. The non-gklt locus $(X,B,)$ of $(X,B,)$ is the union of all glc centers of $(X,B,)$. If $=0$, a glc place (resp. a glc center, the non-gklt locus) of $(X,B,)$ will be called an lc place (resp. an lc center, the non-klt locus) of $(X,B)$, and we will denote $(X,B,)$ by $(X,B)$.
We note that the definitions above are independent of the choice of $U$.
The generalized pairs defined in [BZ16] correspond to the NQC generalized pairs defined in Definition [defn: g-pairs].
The definition of gdlt in Definition [defn: sing of g-pairs] is the same as the definition in [Definition 2.2]HL18, and has slight difference with the definitions in [Bir19,Fil18b,FS20b]. This definition is preserved by adjunction (cf. [Proposition 2.8]HL18). We remark that when $X$ is $$-factorial, our definition for gdlt coincides with the definitions in [Bir19,Fil18b,FS20b].
Because of these differences in definitions, for the reader's convenience, we will usually cite [HL18] for generalized pair related results although other references may have similar results.
For the notation related to generalized pairs as above, we generally adopt the same notation as in [FS20b] and [Has20]. We also remark that for log discrepancies of generalized pairs, we use the notation $a(D,X,B,)$ instead of $a(D,X,B+_X)$. This is because $(X,B+_X)$ is a sub-pair, and the log discrepancy of the sub-pair $(X,B+_X)$ may not be equal to the log discrepancy of the generalized pair $(X,B,)$. Our notation is also similar to the notation as in [HL19,HL20d] where they use $(X/U,B+)$ for generalized pairs and $a_D(X/U,B+)$ for log discrepancies. We do not use their notation as well because it is important to notice that log discrepancies of a generalized pair are independent of the base $U$.
## Some results on MMPs for generalized pairs
[Length of extremal rays, [Proposition 3.13]HL18]
Let $(X,B,)/U$ be a $$-factorial glc g-pair such that $X$ is klt, and $R$ a $(K_X+B+_X)$-negative extremal ray over $U$. Then there exists a curve $C X$ such that $[C] R$ and
$$0<-(K_X+B+_X) C 2 X.$$
### Set-up
Let $(X,B,)/U$ be a glc g-pair. We say that a $(K_X+B+_X)$-MMP$/U$: $X X'$ ends with a minimal model if $K_X'+B'+_X'$ is nef$/U$, where $B'$ is the strict transform of $B$ on $X'$. We say that a $(K_X+B+_X)$-MMP$/U$: $X X'$ ends with a Mori fiber space if there exists a $(K_X'+B'+_X')$-Mori fiber space structure $X'arrow Z$ over $U$.
The following result tells us that we can always run the MMP for generalized lc pairs $(X,B,)/U$ when $X$ is $$-factorial klt.
[cf. [Lemma 3.5]HL18]
Let $(X,B,)/U$ be a $$-factorial glc g-pair such that $X$ is klt. Then we can always run a $(K_X+B+_X)$-MMP$/U$. More precisely, there exists a sequence of flips and divisorial contractions over $U$, which ends either with a Mori fiber space, or a minimal model, or an infinite sequence of flips over $U$.
We also make the following remark on MMPs with scaling of relatively ample $$-divisors:
Let $(X,B,)/U$ be a $$-factorial glc g-pair such that $X$ is klt. When we say ``we run a $(K_X+B+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor", we always assume that the choice of the ample$/U$ $$-divisor $A$ on $X$ satisfies that $A 0$, $(X,B+A,)$ is glc, and $K_X+B+A+_X$ is nef$/U$. We remark that for any ample$/U$ $$-divisor $A$ on $X$, one can always choose $A'_,UA$ such that $(X,B+A',)$ is glc.
### MMP for very exceptional divisors
[MMP for very exceptional divisors, cf. [Proposition 3.8]HL18]
Let $(X,B,)/U$ be a $$-factorial glc g-pair such that $X$ is klt and $K_X+B+_X_UD_1-D_2$ (resp. $_ R,UD_1-D_2$) where $D_1 0$, $D_2 0$ have no common components. Suppose that $D_1$ is very exceptional over $U$. Then any $(K_X+B+_X)$-MMP$/U$ with scaling of an ample$/U$ $$-divisor either terminates with a Mori fiber space or contracts $D_1$ after finitely many steps. Moreover, if $D_2=0$, then this MMP terminates with a model $Y$ such that $K_Y+B_Y+_Y_U0$ (resp. $_ R,U0$), where $B_Y$ is the strict transform of $B$ on $Y$.
The numerical equivalence part of the lemma is exactly [Proposition 3.8]HL18. Thus we we assume that $K_X+B+_X_ R,UD_1-D_2$, $D_2=0$, and we only need to show that the MMP terminates with a model $Y$ such that $K_Y+B_Y+_Y_ R,U0$, where $B_Y$ is the strict transform of $B$ on $Y$.
By the numerical equivalence part of the lemma, the MMP contracts $D_1$ after finitely many steps. We may let $: X Y$ be the birational map corresponding to this partial MMP. Since $K_X+B+_X_ R,UD_1$ and $$ contracts $D_1$, we have $K_Y+B_Y+_Y_ R,U0$, where $B_Y$ is the strict transform of $B$ on $Y$, and the lemma is proved.
### MMP with scaling and log minimal models
We refer the reader to [Lemma 3.19, Definition 3.20]HL18 for the definition MMP with scaling for generalized pairs.
We need the following definition for log minimal models. A detailed discussion of log minimal models and other models for g-pairs will be given in Section 3.
[Log minimal models, cf. Definition [defn: models](3) and [Definition 2.9]HL18]
Let $(X,B,)/U$ be a glc g-pair, $: X X'$ a birational map over $U$, and $E:=(^-1)$ the reduced $^-1$-exceptional divisor. A g-pair $(X',B',)/U$ is called a log minimal model of $(X,B,)/U$ if
- $B'=_*B+E$,
- $K_X'+B'+_X'$ is nef$/U$,
- $(X',B',)$ is $$-factorial gdlt, and
- for any prime divisor $D$ on $X$ which is exceptional over $X'$, $a(D,X,B,)<a(D,X',B',)$.
We need the following theorem from [BZ16]:
[cf. [Theorem 4.4(2)]BZ16]
Let $(X,B,)/U$ be a $$-factorial NQC gklt g-pair and $A 0$ an ample$/U$ $$-divisor on $X$, such that
- $K_X+B+_X$ is pseudo-effective$/U$,
- $K_X+B+_X+(1+)B+(1+)_X$ is big$/U$ for some $, 0$,
- $(X,B+A,)$ is glc and $K_X+B+A+_X$ is nef$/U$.
Then we can run a $(K_X+B+_X)$-MMP$/U$ with scaling of $A$, which terminates with a log minimal model $(X',B',)/U$ such that $K_X'+B'+_X'$ is semi-ample$/U$.
We may pick a real number $0< 1$ such that $(1+)(K_X+B+_X)_,UK_X+$ for some klt pair $(X,)$ such that $$ is big$/U$ (see the proof of [Theorem 4.4(2)]BZ16). Then any $(K_X+B+_X)$-MMP$/U$ with scaling of $A$ is also a $(K_X+)$-MMP$/U$ with scaling of $A'_(1+)A$ for some ample$/U$ $$-divisor $A' 0$ such that $(X,+A')$ is klt. By [Corollary 1.4,2]BCHM10, this MMP terminates with a log minimal model $X'$ such that $K_X'+'$ is semi-ample$/U$, where $'$ is the strict transform of $$ on $'$. Thus $(X',B',)/U$ is a log minimal model of $(X,B,)/U$ such that $K_X'+B'+_X'$ is semi-ample$/U$, where $B'$ is the strict transform of $B$ on $X'$.
[[Remark 3.21, Theorem 4.1]HL18]
Let $(X,B,)/U$ be a $$-factorial NQC glc g-pair such that $X$ is klt, $D 0$ an $$-divisor on $X$, and $$ an NQC$/U$ $$-divisor over $X$, such that $(X,B+D,+)$ is glc and $K_X+B+D+_X+_X$ is nef$/U$. Assume that there exists a $(K_X+B+_X)$-MMP$/U$ with scaling of $D+_X$:
$$(X,B,):=(X_1,B_1,) (X_2,B_2,) (X_i,B_i,),$$
and let $_i$ be the $i$-th scaling number of this MMP for each $i$, i.e.
$$_i:=\{t t 0, K_X_i+B_i+tD_i+_X_i+t_X_i is nef/U\},$$
where $D_i$ is the strict transform of $D$ on $X_i$. Then $_i_i+1$ for each $i$, and one of the following holds:
- This MMP terminates after finitely many steps.
- This MMP does not terminate and $_i=_i+1$ for any $i 0$.
- This MMP does not terminate, $:=_iarrow+_i=_j$ for any $j$, and $(X,B+ D,+)/U$ does not have a log minimal model.
Let $(X,B,)/U$ be a $$-factorial NQC glc g-pair such that $X$ is klt, and $A 0$ an ample$/U$ $$-divisor on $X$ such that $(X,B+A,)$ is glc and $K_X+B+A+_X$ is nef$/U$. Let $$(X,B,):=(X_1,B_1,) (X_2,B_2,) (X_i,B_i,)$$
be a $(K_X+B+_X)$-MMP$/U$ with scaling of $A$, and let $_i$ be the $i$-th scaling number of this MMP for each $i$, i.e.
$$_i:=\{t t 0, K_X_i+B_i+tA_i+_X_i is nef/U\},$$
where $A_i$ is the strict transform of $A$ on $X_i$ for each $i$. Then $_i_i+1$ for each $i$, and one of the following holds:
- This MMP terminates after finitely many steps.
- $_iarrow +_i=0$, and $(X,B,)$ does not have a log minimal model.
In particular, if $(X,B,)/U$ is gdlt and has a log minimal model, then this MMP terminates with log minimal model of $(X,B,)/U$.
By Theorem [thm: hl18 4.1], $_i_i+1$ for each $i$, and we may assume that this MMP does not terminate and $_i=_i+1>0$ for any $i 0$. Let $:=_iarrow+_i$, then $>0$. Since $X$ is $$-factorial klt, by [Lemma 3.5]HL18, we may pick
$$0 _ R,UB+_X+2A$$
such that $(X,)$ is klt and $$ is big$/U$. Now this MMP is also a $(K_X+)$-MMP with scaling of $0 A'_ R,U(1-2)A$ for some $A'$ such that $(X,+A')$ is klt. This MMP terminates by [Corollary 1.4.2]BCHM10, a contradiction.
The in particular part follows from the fact that $(X_i,B_i,)$ is $$-factorial gdlt for each $i$ if $(X,B,)$ is gdlt, and $a(D,X,B,)<a(D,X_i,B_i,)$ for any $i$ and any prime divisor $D$ on $X$ that is exceptional over $X_i$.
### Perturbation of MMPs
Let $Xarrow U$ be a projective morphism such that $X$ is normal quasi-projective. Let $D,A$ be two $$-Cartier $$-divisors on $X$ and let $: X X'$ be a partial $D$-MMP$/U$. Then there exists a positive real number $t_0$, such that for any $t (0,t_0]$, $$ is also a partial $(D+tA)$-MMP$/U$. Note that $A$ is not necessarily effective.
We let
$$X:=X_1 X_2 X_n=X'$$
be this partial MMP, and $D_i,A_i$ the strict transforms of $D$ and $A$ on $X_i$ respectively. Let $X_iarrow Z_i$ be the $D_i$-negative extremal contraction of a $D_i$-negative extremal ray $R_i$ in this MMP for each $i$, then $D_i R_i<0$ for each $i$. Thus there exists a positive real number $t_0$, such that $(D_i+t_0A_i) R_i<0$ for each $i$. In particular, $(D_i+tA_i) R_i<0$ for any $i$ and any $t (0,t_0]$. Thus $$ is a partial $(D+tA)$-MMP$/U$ for any $t (0,t_0]$.
[[Lemma 3.17]HL18]
Let $(X,B+A,)/U$ be a $$-factorial NQC glc g-pair such that $X$ is klt, $(X,B,)$ is glc, and $K_X+B+_X$ is nef$/U$. Then there exists a positive real number $t_0$, such that for any $t (0,t_0]$, any partial $(K_X+B+tA+_X)$-MMP$/U$ is $(K_X+B+_X)$-trivial. Note that $A$ is not necessarily effective.
## Rational polytopes for generalized pairs
In some situations, we need to perturb the coefficients of NQC g-pairs in order to use the results for $$-g-pairs. The key ideas are simple: First, we have a rational polytope (Shokurov-type polytope) for NQC glc pairs with nef generalized log canonical divisors ([3.3]HL18). Second, for usual pairs, Han-Liu-Shokurov establishes a complete state-of-the-art theory for rational polytopes [Section 5]HLS19 with many important applications in birational geometry. Therefore, we will adopt the ideas in [HLS19] to prove Theorem [thm: shokurov polytope gpair] (cf. [3.3]HL18) which also addresses some additional properties of generalized pairs. We remark that although there are many works and results in this direction ([HL18,HL19,HL20d,Che20]), directly applying these results is not sufficient for our purposes.
First we prove an easy lemma.
Let $n,c$ be two non-negative integers, and let $_1,,_c+1 Q^n$ be $c+1$ rational points. Let $ R^n$ is a point which is contained in the interior of the convex hull of $_1,,_c+1$. Then there exist real numbers $a_1,,a_c+1 (0,1]$, such that $_i=1^c+1a_i=1$ and $_i=1^c+1a_i_i=$.
Let $_i':=_i-$ for each $i$. Then $0$ is contained in the interior of the convex hull spanned by $_1',,_c+1'$. Thus there exist positive real numbers $a_1',,a_c+1'$ such that $_i=1^c+1a_i'_i'=0$. We may let $a_i:=_i'_j=1^c+1a_j'$ for each $i$.
Some notation in the next theorem is taken from [HLS19] and [Nak16].
Let $c,m,n,l$ be four non-negative integers, $r_1,,r_c$ real numbers such that $1,r_1,,r_c$ are linearly independent over $$, $:=(r_1,,r_c)$, and $s_1,,s_m+n: R^c+1arrow R$ are $$-linear functions, such that $s_j(1,) 0$ for any $j$.
Let $(X,B,)/U$ be an NQC glc g-pair, $B=_j=1^ms_j(1,)B_j$, and $=_j=1^ns_j+m(1,)_j$, where each $B_j 0$ is a $$-divisor and each $_j$ is a nef$/U$ $$-$$-divisor. Let $B():=_j=1^ms_j(1,)B_j$ and $():=_j=1^ns_j+m(1,)_j$ for any $ R^c$. Let $U^0 U$ be a non-empty open subset, $X^0:=X_UU^0$, and let $S_1,,S_l$ be the normalization of the irreducible components of $ B$.
Then there exists an open set $V$ of $ R^c$ (which may depend on $(X,B,)/U$, etc.) satisfying the following. For any $ V$,
- $s_j(1,) 0$ for each $j$,
- $(X,B(),())/U$ is an NQC glc g-pair,
- $(X,B(),())=(X,B,)$,
- if $Xarrow Z$ is a projective surjective morphism over $U$ such that $K_X+B+_X_,Z0$, then $K_X+B()+()_X_,Z0$ for any $ R^c$,
- if $_X|_X^0_,U^00$, then $()_X|_X^0_,U^00$ for any $ R^c$,
- if $_UU^0$ descends to $X^0$, then $()_UU^0$ descends to $X^0$ for any $ R^c$,
- if $K_X+B+_X$ is nef$/U$, then $K_X+B()+()_X$ is nef$/U$,
- if $(K_X+B+_X)|_X^0$ is semi-ample$/U^0$, then $(K_X+B()+()_X)|_X^0$ is semi-ample$/U^0$,
- for any $k$, if $(K_X+B+_X)|_S_k$ is semi-ample$/U$, then $(K_X+B()+()_X)|_S_k$ is semi-ample$/U$.
In particular, there exist positive real numbers $a_1,,a_c+1 (0,1]$ and $$-g-pairs $(X,B^i,^i)/U$, such that
- $_i=1^c+1a_i=1$, $B=_i=1^c+1a_iB^i$, and $=_i=1^c+1a_i^i$,
- $(X,B^i,^i)/U$ is glc for each $i$,
- $(X,B^i,^i)=(X,B,)$ for each $i$,
- if $Xarrow Z$ is a projective surjective morphism over $U$ such that $K_X+B+_X_,Z0$, then $K_X+B^i+^i_X_,Z0$ for each $i$,
- if $_X|_X^0_,U^00$, then $^i_X|_X^0_,U^00$ for each $i$,
- if $_UU^0$ descends to $X^0$, then $^i_UU^0$ descends to $X^0$ for each $i$,
- if $K_X+B+_X$ is nef$/U$, then $K_X+B^i+^i_X$ is nef$/U$ for each $i$,
- if $(K_X+B+_X)|_X^0$ is semi-ample$/U^0$, then $(K_X+B^i+^i_X)|_X^0$ is semi-ample$/U^0$ for each $i$,
- for any $k$, if $(K_X+B+_X)|_S_k$ is semi-ample$/U$, then $(K_X+B^i+^i_X)|_S_k$ is semi-ample$/U$ for each $i$.
We only need to find open subsets $V$ satisfying each individual condition and then take their common intersections. (1) is obvious. (2) and (3) follow from [Theorem 1.4]Che20 and the linearity of log discrepancies. (4) and (5) follow from the proof of [Lemma 5.3]HLS19.
To prove (6), let $^0:=_UU^0$ and $()^0:=()_UU^0$ for any $ R^c$. Let $g: Xarrow X$ be a resolution such that $$ and any $_j$ descend to $ X$, and let $ X^0:= X_UU^0$. Since $^0$ descends to $X^0$, $^0_X^0$ is $$-Cartier. By [Lemma 5.3]HLS19, $()^0_X^0$ is $$-Cartier for any $ R^c$. By the $$-linearity of log discrepancies, there exists a $$-affine function $F: R^carrow_ R( X^0)$, such that for any $ R^c$,
$$()^0_ X^0=(g|_ X^0)^*()^0_X^0+F(),$$
where $F()$ is exceptional over $X^0$. Since $^0$ descends to $X^0$, $F()=0$. Thus $F()=0$ for any $ R^c$, hence $()^0$ descends to $X^0$ for any $ R^c$.
We prove (7). Let $f: Warrow X$ be a gdlt modification of $(X,B,)$ (see Definition-Lemma [deflem: gdlt modification] below) such that
$$K_W+f^-1_*B+E+_W=f^*(K_X+B+_X)$$
where $E:=(f)$. Let $B_j,W$ be the strict transform of $B_j$ on $W$ for each $j$, and $B_W():=_j=1^ms_j(1,)B_j,W+E$ for any $ R^c$. By $$-linearity of log discrepancies, we have
$$K_W+B_W()+()_W=f^*(K_X+B()+()_X)$$
for any $ R^c$. By [Proposition 3.16]HL18, there exists an open subset $V$ such that $K_W+B_W()+()_W$ is nef$/U$ for any $ V$, and this $V$ satisfies (7).
We prove (8). If $(K_X+B+_X)|_X^0$ is semi-ample$/U^0$, then we let $: X^0arrow Y^0$ be the contraction defined by $(K_X+B+_X)|_X^0$ over $U^0$. We have
$$(K_X+B+_X)|_X^0_ R,U^0^*A$$
for some ample$/U^0$ $$-divisor $A$ on $Y^0$. By (5), for any $ R^c$, we have $(K_X+B()+()_X)|_X^0_ R,Y^00$, so $(K_X+B()+()_X)|_X^0_ R,U^0^*A()$ for some $$-divisor $A()$ on $Y^0$. Possibly replacing $A()$, we may assume that $ R^carrow_ R(Y^0)$ given by $ A()$ is an affine function and $A()=A$. Since ampleness is an open condition, there exists an open set $V$ such that $A()$ is ample$/U^0$ for any $ V$.
We prove (9), and finish the proof of the main part of the theorem. For any $k$, let $(S_k,B_S_k,^S_k)$ be the NQC glc g-pair given by the adjunction
$$K_S_k+B_S_k+^S_k_S_k:=(K_X+B+_X)|_S_k,$$
then we may write $B_S_k=_j=1^m_ks^k_j(1,)B_j,S_k$ and $^S_k=_j=1^n_ks_j+m_k(1,)^S_k_j$, where $B_j,S_k 0$ are $$-divisors, $_j^S_k$ are nef$/U$ $$-$$-divisors, and $s_j^k(1,) 0$ for any $j,k$. Let $B_S_k():=_j=1^m_ks^k_j(1,)B_j,S_k$ and $^S_k():=_j=1^n_ks_j+m_k(1,)^S_k_j$ for any $ R^c$, then
$$K_S_k+B_S_k()+^S_k_S_k():=(K_X+B()+_X())|_S_k$$
for any $ R^c$. Thus (9) follows from (8).
To prove the in particular part of the theorem, we let $_1,,_c+1 V Q^c$ be $c+1$ points such that $$ is contained in the interior of the convex hull of $_1,,_c+1$. By Lemma [lem: from polytope to perturbation], we may let $B^i:=B(_i)$ and $^i:=(_i)$ for each $i$, and let $a_1,,a_c+1 (0,1]$ be any real numbers such that $_i=1^c+1a_i=1$ and $_i=1^c+1a_i_i=$.
Let $m,n,l$ be three non-negative integers and $(X,B,)/U$ an NQC glc g-pair. Assume that $B=_i=1^mb_iB_i$ and $=_i=1^n_i_i$, where $b_i,_i 0$, each $B_i 0$ is a $$-divisor and each $_i$ is a nef$/U$ $$-$$-Cartier $$-divisor. Let $c_1,,c_l$ be non-negative real numbers, and let $V R^m+n+l$ be the rational envelope of $_0:=(b_1,,b_m,_1,,_n,c_1,,c_l)$.
For any $=(b_1',,b_m',_1',,_n',c_1',,c_l') R^m+n+l$, we let $B():=_i=1^mb_1'B_i$, and $:=_i=1^n_i'_i$. Then there exists an open subset $V_0$ of $V$ (which may depends on $(X,B,)/U$) satisfying the following:
- $_0 U R_ 0^m+n+l V$.
- For any $ V_0$, $K_X+B()+()_X$ is $$-Cartier, $(X,B(),())/U$ is glc, and $(X,B(),())=(X,B,)$. In particular, for any $ V_0$, $K_X+B()+()_X$ is $$-Cartier,
- If $Xarrow Y$ is a morphism and $K_X+B+_X$ is nef$/Y$ (resp. anti-nef$/Y$), then possibly shrinking $V_0$, for any $ V_0$, $K_X+B()+()_X$ is nef$/Y$ (resp. anti-nef$/Y$).
- If $Xarrow Y$ is a morphism and $K_X+B+_X_,Y0$, then for any $ V_0$, $K_X+B()+()_X_,Y0$. In particular, for any $ V_0$, $K_X+B()+()_X_,Y0$.
- If $U^0 U$ is a non-empty subset such that $^0:=_UU^0$ descends to $X$ and $^0_X^0_,U0$, where $X^0:=X_UU^0$, then possibly shrinking $V_0$, for any $ V_0$, $()^0:=()_UU^0$ descends to $X$ and $()^0_X^0_,U0$. In particular, for any $ V_0$, $()^0_X^0_,U0$.
- If $U^0 U$ is a non-empty subset such that $(K_X+B+_X)|_X^0$ is semi-ample$/U^0$, where $X^0:=X_UU^0$, then possibly shrinking $V_0$, for any $ V_0$, $(K_X+B()+()_X)|_X^0$ is semi-ample$/U^0$.
- If $A=_i=1^lc_iA_i$ is an ample$/U$ $$-divisor and $$ is a finite set of $(K_X+B+_X+A)$-negative extremal rays in $(X/U)$, then possibly shrinking $V_0$, for any $=(b_1',,b_m',_1',,_n',c_1',,c_l') V_0$, $A():=_i=1^lc_i'A_i$ is ample$/U$, and $$ is a finite set of $(K_X+B()+()_X+A())$-negative extremal rays.
# Models
In this sections, we will study different types of models of generalized pairs. For the case of models of usual pairs, we refer the reader to [Section 2]Bir12a, [Section 2]Has19.
## Definitions
[Log smooth model]
Let $(X,B,)/U$ be a glc g-pair and $h: Warrow X$ a log resolution of $(X, B)$ such that $$ descends to $W$. Let $B_W 0$ and $E 0$ be two $$-divisors on $W$ such that
- $K_W+B_W+_W=h^*(K_X+B+_X)+E$,
- $(W,B_W)$ is log smooth dlt,
- $E$ is $h$-exceptional, and
- for any $h$-exceptional prime divisor $D$ such that $a(D,X,B,)>0$, $D$ is a component of $E$.
Then $(W,B_W,)$ is called a log smooth model of $(X,B,)$. If we additionally assume that
- [(5)] for any $h$-exceptional prime divisor $D$ such that $a(D,X,B,)>0$, $D$ is a component of $\{B_W\}$,
then $(W,B_W,)$ is called a proper log smooth model of $(X,B,)$.
[Models]
Let $(X,B,)/U$ be a glc g-pair, $: X X'$ a proper birational map over $U$, and $E:=(^-1)$ the reduced $^-1$-exceptional divisor. Let $B':=_*B+E$.
- $(X',B',)/U$ is called a log birational model of $(X,B,)/U$.
- $(X',B',)/U$ is called a weak glc model of $(X,B,)/U$ if
- $(X',B',)/U$ is a log birational model of $(X,B,)/U$,
- $K_X'+B'+_X'$ is nef$/U$, and
- for any prime divisor $D$ on $X$ which is exceptional over $X'$, $a(D,X,B,) a(D,X',B',)$.
- $(X',B',)/U$ is called a log minimal model of $(X,B,)/U$ if
- $(X',B',)/U$ is a weak glc model of $(X,B,)/U$,
- $(X',B',)$ is $$-factorial gdlt, and
- for any prime divisor $D$ on $X$ which is exceptional over $X'$, $a(D,X,B,)<a(D,X',B',)$.
- $(X',B',)/U$ is called a good minimal model of $(X,B,)/U$ if
- $(X',B',)/U$ is a log minimal model of $(X,B,)/U$, and
- $K_X'+B'+_X'$ is semi-ample$/U$.
[Gdlt modification, [Proposition 3.9]HL18]
Let $(X,B,)/U$ be a glc g-pair. Then there exists a birational morphism $f: Yarrow X$ and a glc g-pair $(Y,B_Y,)/U$, such that
- $(Y,B_Y,)$ is $$-factorial gdlt,
- $K_Y+B_Y+_Y=f^*(K_X+B+_X)$, and
- any $f$-exceptional divisor is a component of $ B_Y$.
For any birational morphism $f$ and $(Y,B_Y,)$ which satisfies (1-3), $f$ will be called a gdlt modification of $(X,B,)$, and $(Y,B_Y,)$ will be called a gdlt model of $(X,B,)$.
As the definition of gdlt follows from [HL18] and is different from [Bir20a] and [FS20b], we do not define the gdlt modifications for g-pairs that are not glc here.
Log birational models, weak glc models, log minimal models, and good minimal models depend on the base $U$, so in the definitions, we have the notation ``$/U$". On the other hand, log smooth models and gdlt models do not depend on the base $U$, so in the definitions, we do not have the notation ``$/U$".
## Proper log smooth models
Let $(X,B,)/U$ be a glc g-pair and $h: Warrow X$ a log resolution of $(X, B)$ such that $$ descends to $W$. Then $(X,B,)$ has a proper log smooth model $(W,B_W,)$ for some $$-divisor $B_W$ on $W$.
Assume that
$$K_W+h^-1_*B++_W=h^*(K_X+B+_X),$$
then $$ is $h$-exceptional. Let $E=(h)$ be the reduced $h$-exceptional divisor. Then there exists a real number $ (0,1)$, such that for any component $D$ of $E$, if $_D<1$, then $_D<1-$. We let $$B_W:=h^-1_*B+^=1+(1-)E,$$
then $(W,B_W,)$ is a proper log smooth model of $(X,B,)$.
Let $(X,B,)/U$ be a glc g-pair and $(W,B_W,)$ a proper log smooth model of $(X,B,)$ with induced morphism $h: Warrow X$. Assume that
$$K_W+B_W+_W=h^*(K_X+B+_X)+E,$$
then:
- $ B_W= h^-1_*B(h)$.
- For any prime divisor $D$ on $W$ that is exceptional over $X$, $D$ is a component $E$ if and only if $a(D,X,B,)>0$.
- Any glc place of $(W,B_W,)$ is a glc place of $(X,B,)$. In particular, the image of any glc center of $(W,B_W,)$ on $X$ is a glc center of $(X,B,)$.
First we prove (1). By construction, $ B_W h^-1_*B(h)$ and $ h^-1_*B B_W$. Let $D$ be a component of $(h)$. If $a(D,X,B,)=0$, then since $E 0$, $D$ is a component of $B_W$. If $a(D,X,B,)>0$, by Definition [defn: log smooth models](5), $E$ is a component of $\{B_W\}$, hence a component of $B_W$. Thus $(h) B_W$, and we have (1).
We prove (2). Let $D$ be a prime divisor on $W$. If $a(D,X,B,)>0$, then $D$ is a component of $E$ by Definition [defn: log smooth models](4). If $a(D,X,B,)=0$, then
$$0=a(D,X,B,)=a(D,W,B_W-E,) a(D,W,B_W,) 0,$$
which implies that $a(D,W,B_W-E,)=a(D,W,B_W,)$, hence $_DE=0$. Thus we have (2).
We prove (3). Let $D$ be a glc place of $(W,B_W,)$. Then the center of $D$ on $W$ is a stratum of $ B_W$. If $_WD E$, then since $B_W+E$ is simple normal crossing, there exists a prime divisor $F$ that is a component of $ B_W$ such that $_WD F$ and $F$ is a component of $E$. By (2), $a(F,X,B,)>0$. By Definition [defn: log smooth models](5), $F$ is a component of $\{B_W\}$, so $F$ cannot be a component of $ B_W$, a contradiction. Thus $_WD E$. Therefore, any glc place of $(W,B_W,)$ is a glc place of of $(W,B_W-E,)$, hence a glc place of $(X,B,)$, and we have (3).
## Models under some birational maps
### Models under resolutions
Let $(X,B,)/U$ be a glc g-pair, $(X',B',)/U$ a weak glc model of $(X,B,)/U$ with birational map $: X X'$, and $p: Warrow X$ and $q: Warrow X'$ a common resolution of $(X,B,)$ and $(X',B',)$ such that $q= p$. Assume that
$$p^*(K_X+B+_X)=q^*(K_X'+B'+_X')+E,$$
then
- $E 0$, and
- $E$ is exceptional over $X'$.
For any prime divisor $D$ that is an irreducible component of $E$, $$_DE=a(D,X',B',)-a(D,X,B,).$$ Thus if $D$ is not exceptional over $X$, then
- if $D$ is not exceptional over $X'$, then $_DE=0$, and
- if $D$ is exceptional over $X'$, then $_DE 0$ by Definition [defn: models](2.c).
Therefore, $p_*E 0$. Since $K_X'+B'+_X'$ is nef$/U$, $q^*(K_X'+B'+_X')$ is nef$/X$, hence $E$ is anti-nef$/X$. By the negativity lemma, $E 0$, which is (1).
We show (2). If $E$ is not exceptional over $X'$, then there exists a component $D$ of $E$ that is not exceptional over $X'$. If $D$ is not exceptional over $X$, then $_DE=0$, a contradiction. Thus $D$ is exceptional over $X$. By the definition of weak glc models, $a(D,X',B',)=0$. Since $E 0$, $a(D,X,B,) a(D,X,B',)=0$. Since $(X,B,)/U$ is a glc g-pair, $a(D,X,B,) 0$. Thus $a(D,X,B,)=0$, which implies that $_DE=0$, a contradiction.
Let $(X,B,)/U$ be a glc g-pair, $(X_1,B_1,)/U$ and $(X_2,B_2,)/U$ two weak glc models of $(X,B,)/U$ with induced birational map $: X_1 X_2$, and $g_1: Warrow X_1$ and $g_2: Warrow X_2$ a common resolution such that $ g_1=g_2$. Then:
- $$g_1^*(K_X_1+B_1+_X_1)=g_2^*(K_X_2+B_2+_X_2).$$
In particular, if $K_X_2+B_2+_X_2$ is ample$/U$, then $$ is a morphism.
- If $K_X_1+B_1+_X_1$ is semi-ample$/U$, then for any weak glc model $(X',B',)/U$ of $(X,B,)/U$, $K_X'+B'+_X'$ is semi-ample$/U$.
Let $_1: X X_1$ and $_2: X X_2$ be the induced birational maps. Possibly replacing $W$, we may assume that the induced birational map $h: Warrow X$ is a morphism. Let $$E_i:=h^*(K_X+B+_X)-g_i^*(K_X_i+B_i+_X_i)$$
for $i\{1,2\}$. By Lemma [lem: g-pair version bir12 2.6], $E_i 0$ and is exceptional over $X_i$ for $i\{1,2\}$. Thus $g_1,*(E_2-E_1) 0$ and $E_1-E_2$ is nef$/X_1$, and $g_2,*(E_1-E_2) 0$ and $E_2-E_1$ is nef$/X_2$. By the negativity lemma, $E_2-E_1 0$ and $E_1-E_2 0$. Thus $E_1=E_2$, which implies (1). (2) immediately follows from (1).
Let $(X,B,)/U$ be a glc g-pair, $h: Warrow X$ a log resolution of $(X, B)$ such that $$ descends to $W$, and $(W,B_W,)$ a log smooth model of $(X,B,)$. Then any weak glc model (resp. log minimal model, good minimal model) of $(W,B_W,)/U$ is a weak glc model (resp. log minimal model, good minimal model) of $(X,B,)/U$.
Since $(W,B_W,)$ is a log smooth model of $(X,B,)$, we may write
$$K_W+B_W+_W=h^*(K_X+B+_X)+E$$
for some $E 0$ that is $h$-exceptional.
Let $(X',B',)/U$ be a weak glc model of $(W,B_W,)/U$. Then $a(D,X,B,) a(D,X',B',)$ for any prime divisor $D$ over $X$.
Let $_W: W X'$ be the induced birational map, and let $p: Varrow W$ and $q: Varrow X'$ be a common resolution such that $q=_W p$. By Lemma [lem: g-pair version bir12 2.6],
$$p^*(K_W+B_W+_W)=q^*(K_X'+B'+_X')+F$$
for some $F 0$ that is exceptional over $X'$. Then we have
$$p^*h^*(K_X+B+_X)=q^*(K_X'+B'+_X')+F-p^*E,$$
thus
$$p^*E-F_,Xq^*(K_X'+B'+_X')$$
is nef$/X$. Since $h_*p_*(F-p^*E)=h_*p_*F 0$, by the negativity lemma, $F p^*E$. Thus $a(D,X,B,) a(D,X',B',)$ for any prime divisor $D$ over $X$ or $X'$.
of Lemma [lem: g-pair version bir12 2.8] continued. First we prove the weak glc model case. Let $(X',B',)/U$ be a weak glc model of $(W,B_W,)/U$ with induced birational map $_W: W X'$. We check Definition [defn: models](2) for $(X,B,)/U$ and $(X',B',)/U$. Definition [defn: models](2.b) holds by construction. For any prime divisor $D$ on $X$ which is exceptional over $X'$, $h^-1_*D$ is a prime divisor on $W$ which is exceptional over $X'$. Thus
$$a(D,X,B,)=a(D,W,B_W,) a(D,X',B',),$$
and we have Definition [defn: models](2.c). Thus we only need to show that $(X',B',)/U$ is a log birational model of $(X,B,)/U$. Let $: X X'$ be the induced morphism and $B'':=_*B+(^-1)$, then we only need to show that $B'=B''$. By construction, $B'=(_W)_*B_W+(_W^-1)$. Let $D$ be a prime divisor on $X'$. There are three cases:
1. $D$ is not exceptional over $X$. In this case,
so $_DB'=_DB''$.
2. $D$ is exceptional over $W$. In this case, $D$ is a component of $(_W^-1)$ and a component of $(^-1)$, hence
$$_DB'=1=_DB''.$$
3. $D$ is exceptional over $X$ but not exceptional over $W$. In this case,
$$1-_DB'=a(D,X',B',)=a(D,W,B_W,).$$
Since $E 0$,
$a(D,W,B_W,) a(D,X,B,).$
By Claim [claim: log smooth model log discrepancy compare],
$a(D,X,B,) a(D,X',B',).$
Thus
$$a(D,X,B,)=a(D,X',B',)=a(D,W,B_W,).$$
By Definition [defn: log smooth models](4), $$a(D,X,B,)=a(D,X',B',)=a(D,W,B_W,)=0,$$
which implies that
$$_DB'=1=_D(^-1)=_DB''.$$
Thus $B'=B''$, so $(X',B',)/U$ is a log birational model of $(X,B,)/U$, and we have proved the weak glc model case.
Next we prove the log minimal model case. Let $(X',B',)/U$ be a log minimal model of $(W,B_W,)/U$. We check Definition [defn: models](3) for $(X,B,)/U$ and $(X',B',)/U$. Definition [defn: models](3.a) follows from (1). Definition [defn: models](3.b) is immediate from the construction. For any prime divisor $D$ on $X$ which is exceptional over $X'$, $f^-1_*D$ is a prime divisor on $W$ which is exceptional over $X'$. Thus
$$a(D,X,B,)=a(D,W,B_W,)<a(D,X',B',).$$
so we get Definition [defn: models](3.c), and we have the log minimal model case.
The good minimal model case follows immediately from the log minimal model case.
### Models under the MMP
Let $(X,B,)/U$ be a glc g-pair and $X Y$ a partial $(K_X+B+_X)$-MMP$/U$. Let $B_Y$ be the strict transform of $B$ on $Y$. Then any weak glc model (resp. log minimal model, good minimal model) of $(Y,B_Y,)/U$ is a weak glc model (resp. log minimal model, good minimal model) of $(X,B,)/U$.
Since $X Y$ is a partial $(K_X+B+_X)$-MMP$/U$, $X Y$ does not extract any divisor, $a(D,X,B,) a(D,Y,B_Y,)$ for any prime divisor $D$ over $X$ or $Y$, and $a(D,X,B,)<a(D,Y,B_Y,)$ for any prime divisor $D$ on $X$ that is exceptional over $Y$.
Assume that $(X',B',)/U$ is a weak glc model of $(Y,B_Y,)/U$, and $: X X'$ and $_Y: Y X'$ are the induced birational maps. Then $B'=(_Y)_*B_Y+(_Y^-1)$. Let $B'':=_*B+(^-1)$ and let $D$ be a prime divisor on $X'$. There are three possibilities:
1. $D$ is not exceptional over $X$ and $Y$. In this case,
so $_DB'=_DB''$.
2. $D$ is exceptional over $X$ and $Y$. In this case, $D$ is a component of $(_Y^-1)$ and a component of $(^-1)$, hence
$$_DB'=1=_DB''.$$
3. $D$ is exceptional over $Y$ but not exceptional over $X$. In this case, $D$ is a component of $B'$ and $a(D,X',B',)=0$. By Lemma [lem: g-pair version bir12 2.6],
$$a(D,X,B,) a(D,Y,B_Y,) a(D,X',B',)=0,$$
so $a(D,X,B,)=0$, hence $$_DB''=1-a(D,X',B'',)=1-a(D,X,B,)=1=_DB'.$$
Thus $B'=B''$, hence $(X',B',)$ is a log birational model of $(X,B,)$. By Lemma [lem: g-pair version bir12 2.6](1),
$$a(D,X,B,) a(D,Y,B_Y,) a(D,X',B',)$$
for any prime divisor $D$ over $X$. Since $K_X'+B'+_X'$ is nef over $U$, by Definition [defn: models](2), $(X',B',)/U$ is a weak glc model of $(X,B,)/U$, and we have proven the weak glc model case of the lemma.
Now assume that $(X',B',)/U$ is a log minimal model of $(Y,B_Y,)/U$. By the weak glc model case of the lemma, $(X',B',)/U$ is a weak glc model of $(X,B,)/U$. For any prime divisor $D$ on $X$ which is exceptional over $X'$, if $D$ is exceptional over $Y$, then $$a(D,X,B,)<a(D,Y,B_Y,) a(D,X',B',),$$
and if $D$ is not exceptional over $Y$, then
$$a(D,X,B,)=a(D,Y,B_Y,)<a(D,X',B',).$$
Thus $(X',B',)/U$ is a log minimal model of $(X,B,)/U$ by Definition [defn: models](3), and we have proven the log minimal model case of the lemma. The good minimal model case of the lemma follows from the log minimal case.
### Models under gdlt modifications
Let $(X,B,)/U$ be a glc g-pair and $(Y,B_Y,)$ a gdlt model of $(X,B,)$. Then any log birational model (resp. weak glc model, log minimal model, good minimal model) of $(Y,B_Y,)/U$ is a log birational model (resp. weak glc model, log minimal model, good minimal model) of $(X,B,)/U$.
We begin by proving the log birational model case. Let $(X',B',)/U$ be a log birational model of $(Y,B_Y,)/U$ with induced birational maps $_Y: Y X'$ and $: X X'$. Let $B'':=_*B+(^-1)$, then for any prime divisor $D$ on $X'$, there are three cases:
1. $D$ is not exceptional over $X$. In this case,
so $_DB'=_DB''$.
2. $D$ is exceptional over $Y$. In this case, $D$ is a component of $(_Y^-1)$ and a component of $(^-1)$, hence
$$_DB'=1=_DB''.$$
3. $D$ is exceptional over $X$ but not exceptional over $Y$. In this case, $a(D,X,B,)=a(D,Y,B_Y,)=0$. Thus
$$_DB'=1-a(D,X',B',)=1-a(D,Y,B_Y,)=1=_D(^-1)=_DB''.$$
Thus $B'=B''$, so $(X',B',)/U$ is a log birational model of $(X,B,)/U$.
The remainder of the lemma now follows easily. In particular, notice that as $a(D,X,B,)=a(D,Y,B_Y,)$ for any prime divisor $D$ over $X$ and $X Y$ does not contract any divisor, properties (2.c) and (3.c) of Definition [defn: models] follow immediately.
## Models under pullbacks
The goal of this subsection is the following theorem, which will be proven at the end of this subsection.
Let $(X,B,)/U$ and $(Y,B_Y,)/U$ be two NQC glc g-pairs and let $f: Yarrow X$ be a projective birational morphism such that
$$K_Y+B_Y+_Y=f^*(K_X+B+_X)+E$$
for some $E 0$ that is exceptional over $X$. Then $(X,B,)/U$ has a weak glc model (resp. log minimal model, good minimal model) if and only if $(Y,B_Y,)/U$ has a weak glc model (resp. log minimal model, good minimal model).
We prove several lemmas before proving Theorem [thm: existence good minimal model under pullbacks].
Let $(X,B,)/U$ be a glc g-pair. If $(X,B,)/U$ has a weak glc model, then $(X,B,)/U$ has a log minimal model.
Let $(X',B',)/U$ be a weak glc model of $(X,B,)/U$. Let $h: Warrow X$ be a log resolution of $(X, B)$ such that the induced map $_W: Warrow X'$ is a morphism, and $$ descends to $W$. We may write
$$K_W+B_W+_W=h^*(K_X+B+_X)+E$$
for some log smooth pair $(W,B_W)$, such that $B_W:=h^-1_*B+(h)$ and $E 0$ is exceptional over $X$. Then $(W,B_W,)$ is a log smooth model of $(X,B,)$. By Lemma [lem: g-pair version bir12 2.6], we have
$$h^*(K_X+B+_X)=_W^*(K_X'+B'+_X')+G$$
where $G 0$ is exceptional over $X'$. Thus
$$K_W+B_W+_W_ R,X'G+E.$$
$E$ is exceptional over $X'$.
Let $D$ be a component of $E$. By construction, $a(D,X,B,)>0$ and $D$ is exceptional over $X$.
Assume that $D$ is not exceptional over $X'$. Since $(X',B',)/U$ is a log birational model of $(X,B,)/U$, $a(D,X',B',)=0$. Since $G 0$, $a(D,X,B,) a(D,X',B',)$. Thus $a(D,X,B,)=0$, hence $D$ is not a component of $E$, a contradiction.
of Lemma [lem: g-pair weak glc imply lmm] continued. By Claim [claim: wglc to lmm E exceptional], $G+E$ is exceptional over $X'$. By Lemma [lem: rlinear version of hl18 3.8], we may run a $(K_W+B_W+_W)$-MMP$/X'$ with scaling of a general ample$/X'$ divisor, which terminates with a model $Y$ such that $K_Y+B_Y+_Y_,X'0$, where $B_Y$ is the strict transform of $B$ on $Y$. Applying the negativity lemma twice, we have that $K_Y+B_Y+_Y$ is the pullback of $K_X'+B'+_X'$. Thus $K_Y+B_Y+_Y$ is nef$/U$. Since $(W,B_W,)$ is $$-factorial gdlt and $W Y$ is a $(K_W+B_W+_W)$-MMP$/X'$, $(Y,B_Y,)$ is $$-factorial gdlt. Thus $(Y,B_Y,)/U$ is a log minimal model of $(W,B_W,)/U$. The lemma follows from Lemma [lem: g-pair version bir12 2.8].
Let $(X,B,)/U$ and $(Y,B_Y,)/U$ be two glc g-pairs, and $f: Yarrow X$ a projective birational morphism such that
$$K_Y+B_Y+_Y=f^*(K_X+B+_X)+E$$
for some $E 0$ that is exceptional over $X$. Then any weak glc model of $(X,B,)/U$ is a weak glc model of $(Y,B_Y,)/U$.
Let $(X',B',)/U$ be a weak glc model of $(X,B,)/U$, $: X X'$ the induced birational map, and $_Y:= f$. Let $p: Warrow Y$ and $q: Warrow X'$ be a common resolution and let $h:=f p$.
$
W@->[d]_p@/^2pc/[ddr]_q@/_2pc/[dd]_h
Y@->[d]_f@-->[dr]^_Y&
X@-->[r]^& X'
$
By Lemma [lem: g-pair version bir12 2.6],
$$h^*(K_X+B+_X)=q^*(K_X'+B'+_X')+F$$
for some $F 0$ that is exceptional over $X'$. Thus
$$p^*(K_Y+B_Y+_Y)=q^*(K_X'+B'+_X')+p^*E+F.$$
Thus $a(D,Y,B_Y,) a(D,X',B',)$ for any prime divisor $D$ over $X'$. In particular, if $a(D,X',B',)=0$, then $a(D,Y,B_Y,)=0$.
Since $(X',B',)/U$ is a log birational model of $(X,B,)/U$, $B'=_*B+(^-1)$. Let $B'':=(_Y)_*B_Y+(_Y^-1)$. For any prime divisor $D$ on $X'$, there are two cases:
1. $D$ is not exceptional over $X$. In this case,
so $_DB'=_DB''$.
2. $D$ is exceptional over $X$. In this case,
$$a(D,X',B',)=1-_DB'=0.$$
Since $a(D,Y,B_Y,) a(D,X',B',)$, $a(D,Y,B_Y,)=0$. Thus if $D$ is not exceptional over $Y$, then
$$_DB''=_DB_Y=1-a(D,Y,B_Y,)=1=_DB',$$
and if $D$ is exceptional over $Y$, then
$$_DB''=_D(_Y^-1)=1=_DB'.$$
Thus $B'=B''$, hence $(X',B',)/U$ is a log birational model of $(Y,B_Y,)/U$. Since $K_X'+B'+_X'$ is nef$/U$, and
$a(D,Y,B_Y,) a(D,X',B',)$ for any prime divisor $D$ over $X'$, $(X',B',)/U$ is a weak glc model of $(Y,B_Y,)/U$.
Let $(X,B,)/U$ and $(Y,B_Y,)/U$ be two glc g-pairs, and $f: Yarrow X$ a projective birational morphism such that
$$K_Y+B_Y+_Y=f^*(K_X+B+_X)+E$$
for some $E 0$ that is exceptional over $X$. If $(X,B,)/U$ has a weak glc model (resp. log minimal model, good minimal model), then $(Y,B_Y,)/U$ has a weak glc model (resp. log minimal model, good minimal model).
Let $(X',B',)/U$ be a weak glc model (resp. log minimal model, good minimal model) of $(X,B,)/U$. By Lemma [lem: same weak glc model under pullback], $(X',B',)/U$ is a weak glc model of $(Y,B_Y,)/U$. By Lemma [lem: g-pair weak glc imply lmm], $(Y,B_Y,)/U$ has a log minimal model $(Y',B_Y',)/U$. By Lemma [lem: g-pair version bir12 2.7], if $K_X'+B'+_X'$ is semi-ample$/U$, then $K_Y'+B_Y'+_Y'$ is semi-ample$/U$, and we finish the proof.
Let $(X,B,)/U$ and $(Y,B_Y,)/U$ be two $$-factorial NQC gdlt g-pairs, and $f: Yarrow X$ a projective birational morphism such that
$$K_Y+B_Y+_Y=f^*(K_X+B+_X)+E$$
for some $E 0$ that is exceptional over $X$. Assume that
- $$ descends to $Y$,
- $(Y,B_Y+(f))$ is log smooth, and
- $(Y,B_Y,)/U$ has a weak glc model.
Then $(X,B,)/U$ has a weak glc model.
By our assumption, $K_Y+B_Y+_Y$ and $K_X+B+_X$ are pseudo-effective$/U$. Since $(X,B,)$ is gdlt, we may pick an ample$/U$ $$-divisor $A 0$ on $X$ such that $(X,B+A,)$ is glc, and $K_X+B+A+_X$ and $A+ B$ are ample. Since $(X,B,)$ is gdlt, $(X,\{B\},)$ is gklt, so we may pick an ample$/U$ $$-divisor $0 A'_ R,UA+ B$ such that $(X,:=\{B\}+A',)$ is gklt and $f$ is a log resolution of $(X,B+A)$. Since $_,UB+A$, $K_X++_X$ is big$/U$. We may write
$$K_Y++_Y=f^*(K_X++_X)+F$$
for some $ 0$, $F 0$ such that $ F=0$. By our construction, $$ descends to $Y$, $(Y,B_Y+(f))$ is log smooth, $(Y,)$ is log smooth, $(Y,,)$ is gklt, and $K_Y++_Y$ is big$/U$. We let
$$_t:=t+(1-t)B_ R,UB+tA$$
and
$$_t:=t+(1-t)B_Y$$
for any real number $t$. Then $(X,_t,)$ and $(Y,_t,)$ are gklt for any $t (0,1]$, and $K_X+_t+_X$ and $K_Y+_t+_Y$ are big$/U$ for any $t (0,1]$.
Since $(Y,B_Y,)/U$ has a weak glc model, by Lemma [lem: g-pair weak glc imply lmm], $(Y,B_Y,)/U$ has a log minimal model. Since $Y$ is klt, by Theorem [thm: mmp with scaling gpair terminates assuming gmm], we may run a $(K_Y+B_Y+_Y)$-MMP$/U$ with scaling of a general ample$/U$ divisor $H$, which terminates with a log minimal model $(Y',B_Y',)/U$ with induced birational map $: Y Y'$.
We let $'_t$ be the strict transform of $_t$ on $Y'$ for any $t$. By Lemmas [lem: still an mmp under perturbation] and [lem: trivial mmp under perturbation], there exists $t_0 (0,1)$, such that
- $$ is also a $(K_Y+_t_0+_Y)$-MMP$/U$, and
- for any $t (0,t_0]$, any partial $(K_Y'+'_t+_Y')$-MMP$/U$ is $(K_Y'+B_Y'+_Y')$-trivial.
Thus $(Y',_t_0',)$ is gklt and $K_Y'+'_t_0+_Y'$ is big$/U$. By Theorem [thm: bz16 4.4(2)], we may run a $(K_Y'+'_t_0+_Y')$-MMP$/U$, which terminates with a log minimal model $(Y'',''_t_0,)/U$ of $(Y','_t_0,)/U$. We let $''_t$ be the strict transform of $_t$ on $Y''$ for any $t$ and $B_Y''$ the strict transform of $B_Y$ on $Y''$. Since the induced birational map $': Y' Y''$ is $(K_Y'+B_Y'+_Y')$-trivial, $K_Y''+B_Y''+_Y''$ is nef$/U$. Moreover, the induced map $': Y Y''$ does not extract any divisor, and is both $(K_Y+B_Y+_Y)$-non-positive and $(K_Y+_t_0+_Y)$-non-positive. Thus $(Y'',B_Y'',)/U$ is a weak glc model of $(Y,B_Y,)/U$ and $(Y'',''_t_0,)/U$ is a weak glc model of $(Y,_t_0,)/U$, hence $(Y'',''_t,)/U$ is a weak glc model of $(Y,_t,)/U$ for any $t [0,t_0]$.
By Theorem [thm: can run mmp for gklt pair], we can run a $(K_X+B+_X)$-MMP$/U$ with scaling of $A$:
$$(X,B,):=(X_1,B_1,) (X_2,B_2,) (X_i,B_i,).$$
Let $A_i,_i,_t,i$ be the strict transforms of $A,,_t$ on $X_i$ for any $t,i$ respectively, and let
$$_i:=\{t t 0, K_X_i+B_i+tA_i+_X_i is nef/U\}$$
be the scaling numbers. If this MMP terminates, then there is nothing left to prove as we already get a log minimal model for $(X,B,)/U$. Thus we may assume that this MMP does not terminate. By Theorem [thm: mmp with scaling gpair terminates assuming gmm], $_iarrow+_i=0$.
In particular, there exists a positive integer $n$ such that $_n<_n-1 t_0$. Since $_t,i_ R,UB_i+tA_i$ for any $t$, $(X_n,__n-1,n,)/U$ is a weak glc model of $(X,__n-1,)/U$ and $(X_n,__n,n,)/U$ is a weak glc model of $(X,__n,)/U$. Since
$$K_Y+_t+_Y=f^*(K_X+_t+_X)+tF+(1-t)E$$
for any $t$, by Lemma [lem: same weak glc model under pullback], $(X_n,__n-1,n,)/U$ is a weak glc model of $(Y,__n-1,)/U$ and $(X_n,__n,n,)/U$ is a weak glc model of $(Y,__n,)/U$. By our construction, $(Y'',''__n-1,)/U$ is a weak glc model of $(Y,__n-1,)/U$ and $(Y'',''__n,)/U$ is a weak glc model of $(Y,__n,)/U$.
We let $p: Warrow X_n$ and $q: Warrow Y''$ be a resolution of indeterminacy.
$
Y@->[d]_f@-->[r]^& Y'@-->[r]^' & Y''& W@->[d]^p@->[l]_q
X@-->[r]& X_2@-->[r] & @-->[r] & X_n
$
By Lemma [lem: g-pair version bir12 2.7](1),
$$p^*(K_X_n+__n-1,n+_X_n)=q^*(K_Y''+''__n-1+_Y'').$$
and
$$p^*(K_X_n+__n,n+_X_n)=q^*(K_Y''+''__n+_Y'').$$
Thus
$$p^*(K_X_n+t_i+(1-t)B_i+_X_n)=q^*(K_Y''+t''_1+(1-t)B_Y''+_Y'')$$
when $t\{_n-1,_n\}$. Since $_n-1=_n$, we have
$$p^*(K_X_n+t_i+(1-t)B_i+_X_n)=q^*(K_Y''+t''_1+(1-t)B_Y''+_Y'')$$
for any $t$. In particular,
$$p^*(K_X_n+B_n+_X_n)=q^*(K_Y''+B_Y''+_Y'')$$
is nef$/U$, hence $K_X_n+B_n+_X_n$ is nef$/U$, and $_n=0$, a contradiction.
[Proof of Theorem [thm: existence good minimal model under pullbacks]]
First we prove the weak glc model case. By Lemma [lem: same weak glc model under pullback], we only need to prove that if $(Y,B_Y,)/U$ has a weak glc model, then $(X,B,)/U$ has a weak glc model. Let $g: Xarrow X$ be a gdlt modification of $(X,B,)$ such that
$$K_ X+ B+_ X=g^*(K_X+B+_X),$$
and let $p: Warrow Y$ and $q: Warrow X$ be a resolution of indeterminacy, such that $$ descends to $W$, $p$ is a log resolution of $(Y,(B_Y+E))$, and $q$ is a log resolution of $( X, B)$. By Lemma [lem: existence of proper log smooth model], we may find a proper log smooth model $(W,B_W,)$ of $(Y,B_Y,)$. We have
$$K_W+B_W+_W=p^*(K_Y+B_Y+_Y)+F=(p f)^*(K_X+B+_X)+p^*E+F$$
for some $p$-exceptional $$-divisor $F 0$.
Let $D$ be a component of $p^*E+F$. Then $a(D,W,B_W,)<a(D,X,B,)$ and $D$ is exceptional over $X$. If $D$ is not exceptional over $ X$, then $a(D,W,B_W,)<a(D,X,B,)=0$, which is not possible. Thus $p^*E+F$ is exceptional over $ X$.
By Lemma [lem: same weak glc model under pullback], $(W,B_W,)/U$ has a weak glc model. Since $p^*E+F$ is exceptional over $ X$, $$ descends to $W$, $(W,B_W+p^*E+F)$ is log smooth, by Lemma [lem: existence good minimal model under pullbacks weak glc case], we have that $( X, B,)/U$ has a weak glc model. By Lemma [lem: model keep under gdlt modification], $(X,B,)/U$ has a weak glc model, and we have proven the weak glc model case.
Now we prove the general case. By Lemma [lem: existence good minimal model under pullback], we only need to prove that if $(Y,B_Y,)/U$ has a weak glc (resp. log minimal model, good minimal model), then $(X,B,)/U$ has a weak glc (resp. log minimal model, good minimal model). The weak glc case has just been proven, and the log minimal model case follows from the weak glc model case and Lemma [lem: g-pair weak glc imply lmm]. Assume that $(Y,B_Y,)/U$ has a good minimal model. By the log minimal model case, we may assume that $(X',B',)/U$ is a log minimal model of $(X,B,)/U$. By Lemma [lem: same weak glc model under pullback], $(X',B',)/U$ is also a weak glc model of $(Y,B_Y,)/U$. By Lemma [lem: g-pair version bir12 2.7](2), $K_X'+B'+_X'$ is semi-ample$/U$, hence $(X',B',)/U$ is a good minimal model of $(X,B,)/U$, and the proof is concluded.
Let $(X,B,)/U$ be an NQC glc g-pair and $X X'$ a partial $(K_X+B+_X)$-MMP$/U$. Let $B'$ be the strict transform of $B$ on $X'$. Then $(X,B,)/U$ has a weak glc model (resp. log minimal model, good minimal model) if and only if $(X',B',)/U$ has a weak glc model (resp. log minimal model, good minimal model).
Let $p: Warrow X$ and $q: Warrow X'$ be a resolution of indeterminacy of $X X'$ such that $$ descends to $W$. Let $(W,B_W,)$ be a log smooth model of $(X,B,)$, then $(W,B_W,)$ is also a log smooth model of $(X',B',)$. By Theorem [thm: existence good minimal model under pullbacks], $(X,B,)/U$ has a weak glc model (resp. log minimal model, good minimal model) if and only if $(W,B_W,)/U$ has a weak glc model (resp. log minimal model, good minimal model) if and only if $(X',B',)/U$ has a weak glc model (resp. log minimal model, good minimal model).
# Proof of Theorem [thm: existence of glc closure]
Let Let $(X,B,)/U$ be a $$-factorial NQC gdlt g-pair. Assume that there exists a non-empty open subset $U^0 U$, such that
- the image of any strata of $S:= B$ in $U$ intersects $U^0$, and
- $^0:=_UU^0$ descends to $X^0:=X_UU^0$ and $^0_X^0_,U^00$.
Then there exists an $$-divisor $G _,U _X$ such that $(X,B+G)$ is lc and $(X,B+G)=(X,B,)$.
By Theorem [thm: shokurov polytope gpair], we may assume that $(X,B,)$ is a $$-g-pair. Possibly shrinking $U^0$, we may assume that $U^0$ is affine.
By [Proposition 6-1-3, Remark 6-1-4]KMM87 (see also [Lemma 6]Nak86) and Theorem [thm: has19 weak semistable reduction], we may let $f: X' X$ be a resolution with morphisms $': X'arrow U'$ and $: U'arrow U$, such that
- $$ descends to $X'$,
- we may write
$$K_X'+B_X'+_X'=f^*(K_X+B+_X)+E_X',$$
where $B_X',E_X' 0$, $B_X' E_X'=0$, $(X', Supp(B_X'+E_X'))$ is quasi-smooth, and
- $p:= f=': X' U$ where $U'$ is smooth, $'$ and $$ are projective, $f$ is birational, and $'$ has connected equidimensional fibers.
$
X'@->[r]^'@->[d]_f@->[dr]^p & U'@->[d]^
X@->[r]^ & U
$
We show that there is a $$-nef $ Q$-divisor $M_U'$ on $U'$ such that $_X'_,U'^*M_U'$. By our construction, $_X'|_X'__0$ where $X'_$ is the generic fiber of $p$. Thus $_X'_0$ over the generic point $_U'$ of $U'$. By Lemma [lem: lift equivalence from generic fiber], $_X'_,U' D$ where $D 0$ is vertical over $U'$. Since $'$ is equidimensional, $'(D)$ is a $$-divisor on $U'$. Since $U'$ is smooth, for any prime divisor $P$ on $U'$, we may define
$$_P:=\{ 0, D-'^*P 0\},$$
then $_P>0$ for only finitely many prime divisors $P$ on $U'$. Let $D':=D-'^*(_P_PP)$, then $_X'_,U' D' 0$ and $D'$ is very exceptional over $U$. By the general negativity lemma [Lemma 3.3]Bir12a, $_X'_,U'0$. In particular, since $_X'$ is nef$/U$, $_X'_,U'^*M_U'$ for some $$-divisor $M_U'$ that is nef$/U$.
Let $X'^0:=X'_UU^0$ and $U'^0:=U'_UU^0$. Since $_X'|_X'^0 _,U^00$, we have that $M_U'^0:=M_U'|_U'^0_,U^00$.
To prove the claim it suffices to show that for a general element $G' | _X'/U|_$, the pair
$(X',B_X'+G')$ is lc and its lc centers coincide with the lc centers of $(X',B_X')$, i.e. the strata of $ B_X'$. If this is the case, then $(X',B_X'-E_X'+G')$ is sub-lc and $K_X'+B_X'-E_X'+G' _ f^*(K_X+B+G)$ where $G=f_* G' | _X/U|_$ and $(X,B+G)$ is log canonical and its log canonical places coincide with the glc places of $(X,B,)$.
Let $E 0$ be an effective divisor on $U'$ such that $-E$ is ample over $U$ (note that $E$ is not necessarily exceptional, but its support can be chosen to avoid any point not in the exceptional locus). It follows that $|M_U'/U|_ |M_U'- E/U|_+ E$.
Since $M_U'- E$ is ample over $U$, for a general element $G' | _X'/U|_$
we have that
the set of nklt places of $(X',B_X'+G')$ are contained in the set of nklt places of $(X',B_X'+ '^*E)$. Thus, the only non-klt centers of $(X',B_X'+G')$ are strata of $ B_X' $.
To prove the claim, it suffices to show that the support of a general element $G' | _X'/U|_$ does not contain any stratum $S'$ of $ B_X' $ or equivalently that there exist one element $G' | _X'/U|_$ whose support does not contain any given stratum $S'$ of $ B_X' $. Note that $f(S')$ is a glc center of $(X,B,)$. As $(X,B,)$ is gdlt, its glc centers are the strata of $ B$ which intersect $X^0$ by assumption. Pick a point $x f(S') X^0$ and let $u= (x) U^0$. Since $M_U'^0 _ ,U^00$, we have $$M_U'^0=(h)+(|_U^0)^*(H_0),$$
where $ Q$, $h$ is a rational function on $U$, and $H_0$ is a $$-divisor on $U^0$. Since $U^0$ is affine, possibly replacing $H_0$ and $(h)$, we may assume that $H_0 0$ and $u H_0$. Now we may pick a sufficiently ample divisor $H 0$ on $U$, such that $H|_U^0 H_0$ and $u H$, and hence $M_U'_,UF:=^*H$. Then $F 0$ is a $$-divisor whose support does not intersect the fiber $^-1(u)$, so $ '^*F |_X'/U|_$ and its support does not contain $S'$.
Let $(X,B,)/U$ and $(X,B',')/U$ be two NQC glc g-pairs, $f: Yarrow X$ a birational morphism, $K_Y+B_Y+_Y:=f^*(K_X+B+_X)$ and $K_Y+B_Y'+'_Y:=f^*(K_X+B'+'_X)$, such that $Y$ is $$-factorial klt and $(Y,B_Y,)/U$ and $(Y,B_Y',')/U$ are glc g-pairs.
Assume that there exists a positive real number $r$ such that $K_X+B+_X_,Ur(K_X+B'+'_X)$. Then $(X,B,)/U$ has a good minimal model if and only if $(X,B',')$ has a good minimal model.
Let $A_Y$ be a general ample$/U$ divisor on $Y$ such that $(Y,B_Y+A_Y,)/U$ and $(Y,B'_Y+A_Y,')/U$ are glc, and $K_Y+B_Y+A_Y+_Y$ and $K_Y+B'_Y+rA_Y+'_Y$ are nef$/U$.
Without lost of generality, we may assume that $(X,B,)/U$ has a good minimal model and only need to show that $(X,B',')/U$ has a good minimal model. By Theorem [thm: existence good minimal model under pullbacks], $(Y,B_Y,)/U$ has a good minimal model. By Theorem [thm: mmp with scaling gpair terminates assuming gmm] and Lemma [lem: g-pair version bir12 2.7](2), we may let $: Y Z$ be a $(K_Y+B_Y+_Y)$-MMP$/U$ with scaling of $A_Y$, such that $(Z,B_Z,)/U$ is a weak glc model of $(Y,B_Y,)/U$ and $K_Z+B_Z+_Z$ is semi-ample$/U$, where $B_Z$ is the strict transform of $B_Y$ on $Z$. Then $$ is also a $(K_Y+B'_Y+'_Y)$-MMP$/U$ with scaling of $rA_Y$. We let $B_Z'$ be the strict transform of $B'_Y$ on $Z$, then $K_Z+B_Z+_Z_,Ur(K_Z+B'_Z+'_Z)$. Thus $(Z,B'_Z,')/U$ is a weak glc model of $(Y,B_Y',')/U$ and $K_Z+B'_Z+'_Z$ is semi-ample$/U$. By Lemmas [lem: g-pair weak glc imply lmm] and [lem: g-pair version bir12 2.7](2), $(Y,B_Y',')$ has a good minimal model. By Theorem [thm: existence good minimal model under pullbacks], $(X,B',')/U$ has a good minimal model.
[Proof of Theorem [thm: existence of glc closure]]
By Definition-Lemma [deflem: gdlt modification] and Theorem [thm: existence good minimal model under pullbacks], possibly replacing $(X,B,)$ with a gdlt modification, we may assume that $(X,B,)$ is $$-factorial gdlt. By Theorem [thm: reduce special gpair to pair], we may find an $$-divisor $0 G_ R_X$ such that $(X,B+G)$ is lc and $(X,B+G)=(X,B,)$. By [Theorem 1.2]Has19 (see also [Theorem 1.1]HX13), $(X,B+G)/U$ has a good minimal model. By Lemma [lem: rlin equivalent good minimal model], $(X,B,)/U$ has a good minimal model.
# Base-point-free, contraction, and cone theorems for generalized pairs
In this section, we prove Theorem [thm: cone and contraction theorem glc pair]. For the reader's convenience, we will prove Theorem [thm: cone and contraction theorem glc pair](1)(2)(3) (the cone theorem) and Theorem [thm: cone and contraction theorem glc pair](4) (the contraction theorem) separately, and we will also prove a base-point-free theorem. More precisely, we will prove the following three theorems:
[Cone theorem for glc g-pairs]
Let $(X,B,)/U$ be an NQC glc g-pair and $: Xarrow U$ the associated projective morphism. Let $\{R_j\}_j$ be the set of $(K_X+B+_X)$-negative extremal rays in $(X/U)$ that are rational. Then:
- $$(X/U)=(X/U)_K_X+B+_X 0+_j_j.$$
In particular, any $(K_X+B+_X)$-negative extremal ray in $(X/U)$ is rational.
- Each $R_j$ is spanned by a rational curve $C_j$ such that $(C_j)=\{pt\}$ and $$0<-(K_X+B+_X) C_j 2 X.$$
- For any ample$/U$ $$-divisor $A$ on $X$,
$$_A:=\{j R_j(X/U)_K_X+B+_X+A<0\}$$
is a finite set. In particular, $\{R_j\}_j$ is countable, and is a discrete subset in $(X/U)_K_X+B+_X+A<0$. Moreover, we may write
$$(X/U)=(X/U)_K_X+B+_X+A 0+_j_AR_j.$$
- Let $F$ be a $(K_X+B+_X)$-negative extremal face in $(X/U)$. Then $F$ is a rational extremal face.
[Base-point-free theorem for glc g-pairs]
Let $(X,B,)/U$ be an NQC glc g-pair and $: Xarrow U$ the associated projective morphism. Assume that $_X$ is $$-Cartier. Let $L$ be a $$-nef Cartier divisor on $X$ that is the supporting function of a $(K_X+B+_X)$-negative extremal ray. Then $mL$ is $$-generated for any integer $m 0$.
[Contraction theorem for glc g-pairs]
Let $(X,B,)/U$ be an NQC glc g-pair and $: Xarrow U$ the associated projective morphism. Assume that $_X$ is $$-Cartier. Let $R$ be a $(K_X+B+_X)$-negative extremal ray. Then there exists a projective morphism $_R: Xarrow Y$ over $U$ satisfying the following:
- Let $C$ be an integral curve such that $(C)$ is a point. Then $_R(C)$ is a point if and only if $[C] R$.
- $_Y(_R)_*_X$. In other words, $_R$ is a contraction.
- Let $L$ be a line bundle on $X$ such that $L C=0$ for every curve $C$ such that $[C] R$. Then there exists a line bundle $L_Y$ on $Y$ such that $L f^*L_Y$.
- In Theorem [thm: base-point-free theorem for glc pairs], it is easy to check that the condition ``$qL-(K_X+B+_X+A)$ is $$-ample" is equivalent to the condition ``$qL-(K_X+B+_X+A)$ is $$-nef", and is also equivalent to the condition ``$qL-(K_X+B+_X)$ is $$-ample". We choose to use ``$qL-(K_X+B+_X+A)$ is $$-ample" because this is the most convenient condition when applying induction on the dimension.
- There are some technical difficulties if we want to replace ``$L$ is $$-semi-ample" with ``$mL$ is $$-generated for any $m 0$ when $L$ is Cartier" in Theorem [thm: base-point-free theorem for glc pairs], or if we want to replace ``$L_^*L_Y$" with ``$L f^*L_Y$ for some Cartier divisor $L_Y$ when $L$ is Cartier" in Theorem [thm: contraction theorem glc g-pairs]. Nevertheless, our theorems are still strong enough for us to run the minimal model program.
## Preliminary results on non-lc pairs
We begin by recalling some results on non-lc pairs.
Let $(X,)$ be a sub-pair. A non-lc place of $(X,)$ is a prime divisor $D$ over $X$ such that $a(D,X,)<0$. A non-lc center of $(X,)$ is the center of a non-lc place of $(X,)$ on $X$. The non-lc locus $(X,)$ of $(X,)$ is the union of all non-lc centers of $(X,)$.
Some of the notation and results below are adopted from the theory of quasi-log varieties. Although there are many papers in this direction, we will only use the results in [Amb03,Fuj11], and we will always translate them into the language of (not necessarily lc) pairs. To make these translations valid, we only need to recall the following result:
[cf. [Example 4.3.1]Amb03]
Let $(X,)$ be a pair. Then $(X,)$ can be considered as a quasi-log variety $[X,K_X+]$, such that $(X,)$ is exactly the non-qlc locus of $[X,K_X+]$.
[cf. [Definition 5.2]Amb03, [Theorem 4.5.2(1), Definition 6.7.1]Fuj11]
Let $(X,)$ be a (not necessarily lc) pair. We define
$$(X/U)_(X,):=(((X,)/U)arrow(X/U)).$$
[cf. [Definition 5.3]Amb03, [Definition 6.7.2]Fuj11]
Let $(X,)$ be a (not necessarily lc) pair and $: Xarrow U$ a projective morphism. Let $F$ be an extremal face of $(X/U)$.
- A supporting function of $F$ is a $$-nef $$-divisor $H$ such that $F=(X/U) H^$. If $H$ is a $$-divisor, we say that $H$ is a rational supporting function. Since $F$ is an extremal face of $(X/U)$, $F$ always has a supporting function.
- For any $$-Cartier $$-divisor $D$ on $X$, we say that $F$ is $D$-negative if $$F(X/U)_D 0=\{0\}.$$
- We say that $F$ is rational if $F$ has a rational supporting function.
- We say that $F$ is relatively ample at infinity with respect to $(X,)$ if $$F(X/U)_(X,)=\{0\}.$$ Equivalently, $H|_(X,)$ is $|_(X,)$-ample for any supporting function $H$ of $F$.
- We say that $F$ is contractible at infinity with respect to $(X,)$ if $F$ has a rational supporting function $H$ and $H|_(X,)$ is $|_(X,)$-semi-ample.
[Cone theorem for not necessarily lc pairs, cf. [Theorem 5.10]Amb03, [Theorems 4.5.2, 6.7.4]Fuj11]
Let $(X,)$ be a (not necessarily lc) pair and $: Xarrow U$ a projective morphism. Let $\{R_j\}_j$ be the set of $(K_X+)$-negative extremal rays in $(X/U)$ that are rational and relatively ample at infinity with respect to $(X,)$. Then:
- $$(X/U)=(X/U)_K_X+ 0+(X/U)_(X,)+_j R_j.$$
- Each $R_j$ is spanned by a rational curve $C_j$ such that $(C_j)=\{pt\}$ and $$0<-(K_X+) C_j 2 X.$$
- For any $$-ample $$-divisor $A$ on $X$,
$$_A:=\{j R_j(X/U)_K_X++A<0\}$$
is a finite set. In particular, $\{R_j\}_j$ is a discrete subset in $(X/U)_K_X+<0$, and we may write
$$(X/U)=(X/U)_K_X++A 0+(X/U)_(X,)+_j_AR_j.$$
- Let $F$ be a $(K_X+)$-negative extremal face in $(X/U)$ that is relatively ample at infinity with respect to $(X,)$. Then $F$ is a rational extremal face, and is contractible at infinity with respect to $(X,)$.
[Base-point-free theorem for not necessarily lc pairs, cf. [Theorem 5.3]Amb03, [Theorems 4.5.5, 6.5.1]Fuj11]
Let $(X,)$ be a (not necessarily lc) pair and $: Xarrow U$ a projective morphism. Let $L$ be a $$-nef Cartier divisor on $X$. Assume that
- $qL-(K_X+)$ is $$-ample for some real number $q>0$, and
- $mL|_(X,)$ is $|_(X,)$-generated for any $m 0$,
then $mL$ is $$-generated for any $m 0$. In particular, $L$ is $$-semi-ample.
We also include the following contraction theorem for the sake of completeness.
[Contraction theorem for not necessarily lc pairs, cf. [Theorem 5.6, Lemma 6.3]Amb03, [Theorems 4.5.2(4), 6.7.3]Fuj11]
Let $(X,)$ be a (not necessarily lc) pair and $: Xarrow U$ a projective morphism. Let $H$ be a $$-nef Cartier divisor on $X$, $F:=(X/U) H^$ an extremal face of $(X/U)$, such that $F$ is $(K_X+)$-negative and contractible at infinity with respect to $(X,)$. Then there exists a projective morphism $_F: Xarrow Y$ over $U$ satisfying the following:
- Let $C$ be an integral curve such that $(C)$ is a point. Then $_F(C)$ is a point if and only if $[C] F$.
- $_Y(_F)_*_X$. In other words, $_F$ is a contraction.
- Let $L$ be a line bundle on $X$ such that $L C=0$ for every curve $C$ such that $[C] F$. Assume that $L^ m|_(X,)$ is $_F|_(X,)$-generated for every $m 0$. Then there exists a line bundle $L_Y$ on $Y$ such that $L(_F)^*L_Y$.
## Sub-adjunction
We need the following sub-adjunction result for NQC glc g-pairs:
[Generalized sub-adjunction, cf. [Theorem 5.1]HL19]
Let $(X,B,)/U$ be an NQC glc g-pair, $ W$ a glc center of $(X,B,)$, and $W$ the normalization of $ W$. Let $: Warrow X$ be the induced morphism. Then there exists an NQC glc g-pair $(W,B_W,^W)/U$ on $W$, such that
$$K_W+B_W+^W_W_^*(K_X+B+_X).$$
Note that the fact that $(W,B_W,_W)/U$ is NQC is not written down in the statement of [Thereom 5.1]HL19, but it is stated on line -3 of Page 25 of [HL19].
## Proof of the cone theorem
In this subsection, we prove the cone theorem (Theorem [thm: cone theorem glc g-pairs]). We first prove a useful lemma which allows us to associate a generalized lc pair with a (not necessarily lc) pair.
Let $(X,B,)/U$ be a glc g-pair and $A$ a nef and big$/U$ $$-divisor on $X$. Then there exists a pair $(X,)$, such that
- $_,UB+_X+A$, and
- $(X,)=(X,B,)$.
Let $h: Warrow X$ be a log resolution of $(X, B)$ such that $$ descends to $W$, and suppose that
$$K_W+B_W+_W=h^*(K_X+B+_X)$$
for some sub-glc g-sub-pair $(W,B_W,)/U$. Since $_W$ is nef$/U$, $_W+h^*A$ is nef and big$/U$. Thus there exists an $$-divisor $E 0$ such that
$$_W+h^*A=H_n+1nE$$
for any positive integer $n$ and some ample$/U$ $$-divisors $H_n$ on $W$. Since $h: Warrow X$ is a log resolution of $(X, B)$, we may pick $n 0$ such that $(W,B_W+1nE) B_W^=1$. In particular, for any positive real number $$, $(W,B_W+ B_W^=1+1nE)= B_W^=1$.
Now we may pick a real number $0<_0 1$ such that $H_n-_0 B_W^=1$ is ample$/U$. Then we may pick $0 A_W_,UH_n-_0 B_W^=1$ such that $(W,_W:=B_W+_0 B_W^=1+1nE+A_W)$ is a sub-pair and $(W,_W)= B_W^=1$.
$(X,:=h_*_W)$ satisfies our requirements.
Let $d 2$ be an integer. Assume Theorem [thm: cone theorem glc g-pairs] in dimension $ d-1$.
Let $(X,B,)/U$ be an NQC glc g-pair of dimension $d$ and $: Xarrow U$ the associated projective morphism. Let $A$ be an ample$/U$ $$-divisor on $X$ and $\{R_j\}_j'_A$ the set of $(K_X+B+_X+A)$-negative extremal rays (that are not necessarily rational) in $(X/U)$. Then:
- $'_A$ is a finite set. In particular,
$$(X/U)=(X/U)_K_X+B+_X+A 0+_j'_AR_j.$$
- For any $j_A'$, $R_j$ is spanned by a rational curve $C_j$ such that $(C_j)=\{pt\}$ and
$$0<-(K_X+B+_X+A) C_j 2 X.$$
By Lemma [lem: perturb gpair to make nlc locus ngklt locus], we may pick $0_,UB+_X+A$ such that $(X,)=(X,B,)$.
For any glc center $ W$ of $(X,B,)$ with normalization $W$, we let $(W,B_W,^W)/U$ be the NQC glc g-pair given by the sub-adjunction
$$K_W+B_W+^W_W_(K_X+B+_X)|_W$$
as in Theorem [thm: gpair subadjunction], and let $A_W:=A|_W$. By Theorem [thm: cone theorem glc g-pairs] in dimension $ d-1$, we have
$$(W/U)=(W/U)_K_W+B_W+^W_W+A_W 0+_j_A_WR_j,W,$$
where $\{R_j,W\}_j_A_W$ is the set of $(K_W+B_W+^W_W+A_W)$-negative extremal rays in $(W/U)$ that are rational, where $_A_W$ is a finite set. For any $j_A_W$, we let $R_j$ be the image of $R_j,W$ in $X$ under the map
$$_W(W/U)arrow((X,)/U)arrow(X/U)$$
and let $^0_A:=_W_A_W$. Then $^0_A$ is a finite set. Finally, we let $\{R_j\}_j^1_A$ be the set of $(K_X+B+_X+A)$-negative extremal rays in $(X/U)$ that are relatively ample at infinity with respect to $(X,)$. By Theorem [thm: cone theorem for not necessarily lc pairs](3), $_A^1$ is a finite set.
$$(X/U)=(X/U)_K_X+B+_X+A 0+_j^0_AR_j+_j^1_AR_j.$$
For simplicity, we let $$V:=(X/U)_K_X+B+_X+A 0+_j^0_AR_j+_j^1_AR_j.$$
For any curve $C$ on $X$, we will write $[C]$ for its class in $(X/U)$, and for any glc center $ W$ of $(X,B,)$ with normalization $W$, if $C W$, then we will write $[C]_W$ for its class in $(W/U)$.
Suppose that $(X/U)=V.$ By Theorem [thm: cone theorem for not necessarily lc pairs](1), we have
$$(X/U)=(X/U)_K_X+B+_X+A 0+(X/U)_(X,)+_j^1_AR_j.$$
Thus there exists an integral curve $C(X,)=(X,B,)$, such that $[C]$ is not contained in $V$. We may write
$$C=_W W is a glc center of (X,B,)C_W,$$
where each $C_W$ is an integral curve in $W$. For any $C_W$, we have
$$[C_W]_W=c^0_WR^0_W+_j_A_Wc_j,WR_j,W$$
where $c^0_W$ and each $c_j,W$ are non-negative real numbers, and $R_W^0 (W/U)_K_W+B_W+^W_W+A_W 0$. Since the image of $R^0_W$ in $X$ is contained in $(X/U)_K_X+B+_X+A 0$, $[C_W]$ is contained in $(X/U)_K_X+B+_X+A 0+_j^0_AR_j$. Thus $[C_W]$ is contained in $V$, hence $[C]$ is contained in $V$, a contradiction.
of Lemma [lem: low dimension gpair cone theorem imply finite extremal rays] continued. By Claim [claim: gpair necone spanned by images first step], any $(K_X+B+_X+A)$-negative extremal ray in $(X/U)$ must be contained in $\{R_j\}_j^0_A^1_A$, so $'_A^0_A^1_A$. Since $^0_A^1_A$ is a finite set, $'_A$ is a finite set, and we get (1).
By Theorem [thm: cone theorem glc g-pairs] in dimension $ d-1$, for any $j_A_W$, $R_j,W$ is spanned by a rational curve $C_j$ such that the image of $C_j$ in $U$ is a point, and
$$0<-(K_W+B_W+^W_W+A_W) C_j 2 W<2 X.$$
Therefore, for any $j^0_A=_W_A_W$, $R_j$ is spanned by the curve $C_j$ such that $(C_j)=\{pt\}$ and
$$0<-(K_X+B+_X+A) C_j 2 X.$$
By Theorem [thm: cone theorem for not necessarily lc pairs](2), for any $j^1_A$, $R_j$ is spanned by a rational curve $C_j$ such that $(C_j)=\{pt\}$ and
$$0<-(K_X+B+_X+A) C_j 2 X.$$
Thus (2) holds and the proof is complete.
Let $d 2$ be an integer. Assume Theorem [thm: cone theorem glc g-pairs] in dimension $ d-1$.
Let $(X,B,)/U$ be an NQC glc $$-g-pair of dimension $d$ and $: Xarrow U$ the associated projective morphism. Let $A$ be an ample$/U$ $$-divisor on $X$ and $\{R_j\}_j_A$ the set of $(K_X+B+_X+A)$-negative extremal rays in $(X/U)$ that are rational. Then $_A$ is a finite set, and
$$(X/U)=(X/U)_K_X+B+_X+A 0+_j_AR_j.$$
We may assume that $_^1(X/U) 2$, otherwise there is nothing to prove.
By Lemma [lem: low dimension gpair cone theorem imply finite extremal rays], the number of $(K_X+B+_X+A)$-negative extremal rays in $(X/U)$ is a finite set, so $_A_A'$ is a finite set.
For simplicity, we let $V:=(X/U)_K_X+B+_X+A 0+_j_AR_j$. Suppose that $V=(X/U)$. Since $_^1(X/U) 2$, there exists a Cartier divisor $N$ on $X$ satisfying the following:
- $N$ is not numerically equivalent to a multiple of $K_X+B+_X+A$ over $U$,
- $N$ is positive on $V\{0\}$, and
- $N z_0<0$ for some $z_0(X/U)$.
Let $Q$ be the dual cone of $(X/U)_K_X+B+_X+A 0$, i.e.,
$$Q=\{D N^1(X/U) D z 0 for any z(X/U)_K_X+B+_X+A 0\},$$
then $Q$ is generated by $$-nef divisors and $K_X+B+_X+A$. Since $N$ is positive on $(X/U)_K_X+B+_X+A 0\{0\}$, $N$ is in the interior of $Q$. By Kleiman's Criterion, there exists an ample$/U$ $$-divisor $H$ on $X$ and a positive real number $p$, such that
$$N=H+p(K_X+B+_X+A).$$
Since $N z_0<0$ and $H$ is ample$/U$, we may let
$$t:=\{s H+s(K_X+B+_X+A) is nef/U\}.$$
Then $0<t<p$. Since $(H+t(K_X+B+_X+A)) z 0$ for any $z(X/U)_K_X+B+_X+A 0$, by Lemma [lem: low dimension gpair cone theorem imply finite extremal rays],
$$t=\{s (H+s(K_X+B+_X+A)) R_j 0, j_A'\}$$
where $\{R_j\}_j'_A$ the set of $(K_X+B+_X+A)$-negative extremal rays in $(X/U)$ and is a finite set. Thus $t$ is a rational number. Since $N$ is not a multiple of $K_X+B+_X+A$, $H+t(K_X+B+_X+A)$ is a rational supporting function of a $(K_X+B+_X+A)$-negative extremal face $F_N$, which is spanned by $(K_X+B+_X+A)$-negative extremal rays. By Lemma [lem: low dimension gpair cone theorem imply finite extremal rays], $F_N$ is spanned by finitely many $(K_X+B+_X+A)$-negative extremal rays $R^1,,R^n$ in $(X/U)$ for some positive integer $n$. In particular, we may pick a Cartier divisor $L$ on $X$ such that $L R^1>0$ and $L R^i<0$ for any $i 2$. Since $H$ is ample$/U$ and $N$ is not numerically equivalent to a multiple of $K_X+B+_X+A$ over $U$, we may pick a rational number $ (0,1)$ such that
- $N_:=(H- L)+p(K_X+B+_X+A)$ is not numerically equivalent to a multiple of $K_X+B+_X+A$ over $U$ for any $ (0,_0)$,
- $H-_0 L$ is ample$/U$, and
- $N__0 z_0<0$.
Thus $N_$ is positive on $(X/U)_K_X+B+_X+A 0$. Since $_A$ is a finite set and $N R_j>0$ for any $j_A$, we may pick a rational number $_1 (0,_0)$ such that $N__1 R_j>0$ for any $j_A$. In particular, $N__1$ is positive on $V\{0\}$. Now we let
$$t_1:=\{s H-_1L+s(K_X+B+_X+A) is nef/U\}.$$
By our construction,
$$t_1=(H-_1L) R^1-(K_X+B+_X+A) R^1$$
is a rational number, $0<t_1<t<p$, and $H-_1L+t_1(K_X+B+_X+A)$ is a rational supporting function of $R^1$. Thus $R^1_A$, and so $N__1 R^1>0$. Therefore, $p<t_1$, a contradiction.
Let $d 2$ be an integer. Assume Theorem [thm: cone theorem glc g-pairs] in dimension $ d-1$.
Let $(X,B,)/U$ be an NQC glc $$-g-pair of dimension $d$ and $: Xarrow U$ the associated projective morphism. Let $A$ be an ample$/U$ $$-divisor on $X$ and $\{R_j\}_j_A$ the set of $(K_X+B+_X+A)$-negative extremal rays in $(X/U)$ that are rational. Then $_A$ is a finite set, and
$$(X/U)=(X/U)_K_X+B+_X+A 0+_j_AR_j.$$
In particular, any $(K_X+B+_X+A)$-negative extremal ray in $(X/U)$ is rational.
Let $F$ be a $(K_X+B+_X+A)$-negative extremal face in $(X/U)$ that is rational and of dimension $ 2$. By Theorem [thm: contraction theorem glc g-pairs], there exists a contraction $_F: Xarrow Y$ of $F$ over $U$. Let $\{G_j\}_j_F$ be the rational proper $(K_X+B+_X+A)$-negative extremal faces in $(X/Y)$, then $_F$ is a finite set for each $F$, and
$$(X/Y)=_j_FG_j.$$
Each $G_j$ is also a $(K_X+B+_X+A)$-negative extremal face in $(X/U)$, and $ G_j< F$ for any $F$. By induction on the dimension of extremal faces and Lemma [lem: gpair cone theorem spanned by extremal faces rational case], we get the desired result.
Let $d 2$ be an integer. Assume Theorem [thm: cone theorem glc g-pairs] in dimension $ d-1$.
Let $(X,B,)/U$ be an NQC glc g-pair of dimension $d$ and $: Xarrow U$ the associated projective morphism. Let $A$ be an ample$/U$ $$-divisor on $X$ and $\{R_j\}_j_A$ the set of $(K_X+B+_X+A)$-negative extremal rays in $(X/U)$ that are rational. Then $_A$ is a finite set, and
$$(X/U)=(X/U)_K_X+B+_X+A 0+_j_AR_j.$$
In particular, any $(K_X+B+_X+A)$-negative extremal ray in $(X/U)$ is rational.
Let $\{R_j\}_j_A'$ be the set of $(K_X+B+_X+A)$-negative extremal rays (that are not necessarily rational) in $(X/U)$. By Lemma [lem: low dimension gpair cone theorem imply finite extremal rays], $_A'$ is a finite set, and we have
$$(X/U)=(X/U)_K_X+B+_X+A 0+_j'_AR_j.$$
By Theorem [thm: shokurov polytope gpair], there exist real numbers $a_1,,a_k (0,1]$, such that
- $_i=1^ka_i=1$,
- $K_X+B=_i=1^k a_i(K_X+B^i)$ and $=_i=1^ka_i^i$, and
- $(X,B^i,^i)/U$ is a glc $$-g-pair for each $i$.
Let $A=_i=1^cr_iA_i$, where $r_1,,r_c>0$ are real numbers such that $r_1,,r_c$ are linearly independent over $$, and $A_1,,A_c$ are ample$/U$ $$-divisors.
Since $_A'$ is a finite set, we may pick rational numbers $ a_1,, a_k (0,1]$ and $ r_1,, r_c>0$, such that $_i=1^k a_i=1$, each $ a_i$ is sufficiently close to $a_i$ and each $ r_i$ is sufficiently close to $r_i$, such that
- $(X, B:=_i=1^k a_iB_i,:=_i=1^k a_i^i)$ is glc,
- $ A:=_i=1^c r_iA_i$ is ample, and
- $(K_X+ B+ _X+ A) R_j<0$ for any $j_A'$.
By Lemma [lem: gpair cone theorem spanned by extremal rays rational case], we have
$$(X/U)=(X/U)_K_X+ B+ _X+ A+_j R_j,$$
where $\{R_j\}_j$ is the set of $(K_X+ B+ _X+ A)$-negative extremal rays in $(X/U)$. Moreover, $R_j$ is rational for any $j$. By our construction, $_A'$. Thus $R_j$ is rational for any $j_A'$, hence $_A=_A'$ and we are done.
[Proof of Theorem [thm: cone theorem glc g-pairs]]
We apply induction on dimension of $X$. The $ X=1$ case is obviously true. So we may assume that $ X=d$ where $d 2$ is an integer and Theorem [thm: cone theorem glc g-pairs] holds in dimension $ d-1$.
For any $(K_X+B+_X)$-negative extremal ray $R$ in $(X/U)$, $R$ is also a $(K_X+B+_X+A)$-negative extremal ray for some ample$/U$ $$-divisor $A$ on $X$. By Lemma [lem: gpair cone theorem spanned by extremal rays real case], $R$ is rational. By Lemma [lem: low dimension gpair cone theorem imply finite extremal rays](2), $R$ is generated by a rational curve $C$ such that $(C)=\{pt\}$ and $$0<-(K_X+B+_X+A) C 2 X.$$ Since $R$ is also a $(K_X+B+_X+ A)$-negative extremal ray for any $ (0,1)$, by Lemma [lem: low dimension gpair cone theorem imply finite extremal rays](2) again, we may assume that $$0<-(K_X+B+_X+ A) C 2 X$$ for any $ (0,1)$. Thus
$$0<-(K_X+B+_X) C 2 X,$$
and we get (2). (3) follows from Lemma [lem: gpair cone theorem spanned by extremal rays real case] and the fact that $$\{R_j\}_j_n=1^+\{R_j\}_j_1nA$$ for any ample$/U$ $$-divisor $A$ on $X$. (1) follows from (3).
We now prove (4). For any $(K_X+B+_X)$-negative extremal face $F$ in $(X/U)$, $F$ is also a $(K_X+B+_X+A)$-negative extremal face for some ample$/U$ $$-divisor $A$ on $X$. Let $V:=F^ N^1(X/U)$. Then since $F$ is spanned by a subset of $\{R_j\}_j_A$, $V$ is defined over $$. We let
$$W_F:=(X/U)_K_X+B+_X+A 0+_j j_A,R_j FR_j.$$
Then $W_F$ is a closed cone, $(X/U)=W_F+F$, and $W_F F=\{0\}$. The supporting functions of $F$ are the elements in $V$ that are positive on $W_F\{0\}$, which is a non-empty open subset of $V$, and hence contains a rational element $H$. In particular, $F=H^ (X/U)$, hence $F$ is rational, and we get (4).
## Proof of the base-point-free theorem and the contraction theorem
Now we prove the base-point-free theorem (Theorem [thm: base-point-free theorem for glc pairs]) for glc g-pairs. First we prove an auxiliary lemma.
Let $(X,B,)/U$ be a glc g-pair such that $_X$ is $$-Cartier and $(X,B,)=(X,B)$. Then there exists a birational morphism $h: Warrow X$ such that $$ descends to $W$ and $(h^*_X-_W)=(h)$.
Let $f: Yarrow X$ be a log resolution of $(X,B)$ such that $$ descends to $Y$. Let $F=(f)$ be the reduced exceptional divisor. Write $K_Y+f^-1_*B+G=f^*(K_X+B)$ and $ M_Y+E=f^* M_X$. Write $ E=_i E_i$. Note that $E=f^-1(f(E))$. If this is not the case, then since the fibers of $f$ are connected, there is a curve $C$ contained in a fiber $f^-1(x)$ such that $C$ intersects the support of $E$ but is not contained in the support of $E$. But then $-E C<0$ contradicting the fact that $-E$ is nef over $X$. Let $Y^0=Y E$ and let $X^0=X f( E)$, then $Y^0=f^-1(X^0)$.
Since $(X,B,)=(X,B)$, the support of $E$ does not contain any strata of $G^=1$. In particular $E G^=1=0$, and any element in $(X,B, M)$ is contained in $X X^0$.
We now consider the generalized pair
$$
(Y,f^-1_*B+e G^=1+(1-e)F+_is_iE_i, t M_Y)/X
$$
where $0<s_i e 1$, $t 1$, and the real numbers $s_i$ are sufficiently general (i.e. their representatives in $ R/ Q$ are sufficiently general).
We have
$$K_Y+f^-1_*B+eG^=1+(1-e)F+_is_iE_i+t M_Y_ R,XeG^=1 +(1-e)F-G-tE+_is_iE_i _ R,X F'-E'$$
where the coefficients of $E'$ are sufficiently general real numbers,
$ Supp E'= Supp E$, and $ Supp F'$ consists of the set of exceptional divisors not contained in the support of $E G^=1$.
We will now apply Theorem [thm: existence of glc closure] to this generalized pair. To check the hypothesis, we consider the open subset $Y^0$ and $X^0$ defined above. (1) clearly holds, (3) has been checked above, and (4) holds since $ M _Y|_Y^0=(f|_Y^0)^* M_X|_X^0$ as $E|_Y^0=0$. For (2), we must check that
$$
(Y^0, (f^-1_*B+e G^=1+(1-e)F+_is_iE_i)|_Y^0, t M_Y|_Y^0)=(Y^0, (f^-1_*B+e G^=1+(1-e)F)|_Y^0, 0)
$$
has a good minimal model over $X^0$. Since $K_Y^0+(f^-1_*B+e G^=1+(1-e)F)|_Y^0 _ R, X^0 F'|_Y^0$ where $ F'|_Y^0$ is effective and exceptional over $X^0$, by Lemma [lem: rlinear version of hl18 3.8], $(Y^0, (f^-1_*B+e G^=1+(1-e)F)|_Y^0)/X^0$ has a good minimal model and (2) holds.
Therefore, by Theorems [thm: existence of glc closure] and [thm: mmp with scaling gpair terminates assuming gmm],
we can run a $(K_Y+f^-1_*B+e G^=1+(1-e)F+_is_iE_i+t M_Y)$-MMP/$X$: $Y Z$ which contracts $F'$ and get a good minimal model$/X$.
By [Lemma 4.4(3)]BZ16, $_Y$ descends to $Z$, hence $$ descends to $Z$. Let $E_Z$, $E'_Z$ be the strict transforms of $E$, $E'$ on the minimal model $Z$ respectively. Then $-E'_Z$ is
semi-ample/$X$ and we can then take the corresponding ample model $g: Z W$ of $-E'_Z/X$.
Since $-E'_W$ is ample over $X$, the only $h:W X$ exceptional divisors are the components of $-E'_W$.
Since the coefficients of
$E'_Z$ are sufficiently general, no component of $ E'_Z= E_Z$ is contracted by $h:Z W$. To see this, note that if $E'_Z C = 0$ for any curve $C$ over $X$, then the same is true for every component of $E'_Z$ (since the coefficients of
$E'_Z$ are sufficiently general).
Since $E'_Z_W 0$, it follows that $P _W 0$ for any component $P$ of the support of $E'_Z$. By the negativity lemma, $P$ is not exceptional.
Note that $g: Z W$ is also the ample model of any small perturbation of $-E'_Z$ and so $g_*P$ is $ Q$-Cartier and $P=g^*g_*P$.
But then $_Z_,X-E_Z=-g^*(E_W)$ where $E_W=g_*E_Z$. Thus $_Z=g^*g_*_Z=g^*_W$, so $$ descends to $W$.
Therefore, $W$ satisfies our requirements.
[Proof of Theorem [thm: base-point-free theorem for glc pairs]]
Let $R$ be the $(K_X+B+_X)$-negative extremal ray such that $L$ is the supporting function of $R$. Then $R$ is also a $(K_X+B+(1-)_X)$-negative extremal ray for some $0< 1$. Possibly replacing $$ with $(1-)$, we may assume that $(X,B,)=(X,B)$. Let $A$ be an ample$/U$ $$-divisor on $X$ such that $R$ is also $(K_X+B+_X+A)$-negative extremal ray.
If $_X R 0$, then $(K_X+B) R<0$, and the theorem immediately follows from Theorem [thm: base-point-free theorem for not necessarily lc pairs]. Therefore, we may assume that $_X R<0$.
Let $f: Yarrow X$ be a birational morphism such that $$ descends to $Y$. By the negativity lemma, we may assume that $_Y=f^*_X-E$ for some $E 0$ that is exceptional over $X$.
By Lemma [lem: special extraction], we may then assume that $(f)= E$.
Let $K_Y+B_Y:=f^*(K_X+B)$. By our construction, $(f)= E$ does not contain any lc place of $(X,B)$. Thus we may pick $E' 0$ on $Y$ such that $-E'$ is ample$/X$ and $E'$ does not contain any lc place of $(X,B)$. Since $(X,B,)=(X,B)$, we may find $0< 1$ such that $f^*A- E'$ is ample$/U$ and $(Y,B_Y+ E')$ is sub-lc. In particular, we may find an ample$/U$ $$-divisor $0 H_Y_,U_Y+f^*A- E'$ on $Y$ such that $(Y,B_Y+H_Y+ E')$ is sub-lc. Let $:=B+f_*H_Y$, then $(X,)$ is lc and $_,UB+_X+A$. In particular, $R$ is a $(K_X+)$-negative extremal ray, and the theorem follows from Theorem [thm: base-point-free theorem for not necessarily lc pairs].
The contraction theorem (Theorem [thm: contraction theorem glc g-pairs]) immediately follows from the base-point-free theorem:
[Proof of Theorem [thm: contraction theorem glc g-pairs]]
By Theorem [thm: cone theorem glc g-pairs], $R$ has a supporting function $H$ that is a $$-nef Cartier divisor. By Theorem [thm: base-point-free theorem for glc pairs], $H$ is semi-ample$/U$, hence defines a contraction $_R: Xarrow Y$ over $U$. (1) and (2) immediately follow.
Since $-(K_X+B+_X)$ is ample$/Y$, for any line bundle $L$ on $X$ such that $L R=0$, $L-(K_X+B+_X)$ is ample$/Y$. By Theorem [thm: base-point-free theorem for glc pairs], $mL$ is $_R$-generated and $mL_Y0$ for any $m 0$. Therefore, $_R$ is defined by $|mL|$ and $|(m+1)L|$ over $Y$ for any $m 0$, which implies that $mL f^*L_Y,m$ and $(m+1)L f^*L_Y,m+1$ for some line bundles $L_Y,m$ and $L_Y,m+1$ on $Y$. We may let $L_Y:=L_Y,m+1-L_Y,m$, and we obtain (3).
[Proof of Theorem [thm: cone and contraction theorem glc pair]] It immediately follows from Theorems [thm: contraction theorem glc g-pairs] and [thm: cone theorem glc g-pairs].
## Corollaries With the cone and contraction theorems proven, we can prove the following three corollaries, which guarantee that negative extremal contractions associated with NQC glc g-pairs behave similarly to negative extremal contractions associated with usual pairs. The statements and proofs are similar to [Corollaries 3.17, 3.18]KM98. These corollaries are necessary for us to run the minimal model program.
Let $(X,B,)/U$ be a $$-factorial NQC glc g-pair and $f: Xarrow Z$ a contraction of a $(K_X+B+_X)$-negative extremal ray $R$ over $U$. Then $(X)=(Z)+1$.
$R$ is generated by a curve $C$ by Theorem [thm: cone theorem glc g-pairs](2). We consider the maps
$$0arrow(Z) f^*D(X) (L C) Z.$$
We show that the sequence above is an exact sequence.
By Theorem [thm: contraction theorem glc g-pairs](2), $f$ is a contraction, so $f_*f^*D=D$ for any $D(Z)$, hence $(Z) f^*D(X)$ is an injection. By Theorem [thm: contraction theorem glc g-pairs](3), for any $L(X)$, if $L C=0$, then $L f^*L_Y$ for some line bundle $L_Y$ in $Y$. In particular, $L$ and $f^*L_Y$ correspond to the same element in $(X)$. Thus the sequence above is exact, and we have $(X)=(Z)+1$.
Let $(X,B,)/U$ be a $$-factorial NQC glc g-pair and $f: Xarrow Z$ a contraction of a $(K_X+B+_X)$-negative extremal ray $R$ over $U$. Assume that $f$ is a divisorial contraction, i.e. $ X= Z$ and the exceptional locus of $f$ is an irreducible divisor. Then $Z$ is $$-factorial.
Let $D_Z$ be an $$-divisor on $Z$ and $E$ the exceptional divisor of $f$. Let $D$ be the strict transform of $D_Z$ on $X$. Then there exists a real number $t$ such that $(E+tD) R=0$. By Theorem [thm: contraction theorem glc g-pairs](3), $E+tD_^*H$ for some $$-Cartier $$-divisor $H$ on $Z$. Thus $D_Z_1tH$ is $$-Cartier. Therefore, $Z$ is $$-factorial.
Let $(X,B,)/U$ be a $$-factorial NQC glc g-pair and $f: Xarrow Z$ a contraction of a $(K_X+B+_X)$-negative extremal ray $R$ over $U$. Assume that $f$ is a Fano contraction, i.e. $ X> Z$. Then $Z$ is $$-factorial.
Let $D_Z$ be a divisor on $Z$ and $Z^0$ the smooth locus of $Z$. Let $D$ be the closure of $f^-1(D_Z|_Z_0)$. Then $D$ does not intersect any general fiber of $f$, hence $D R=0$. By Theorem [thm: contraction theorem glc g-pairs](3), $D_^*H$ for some $$-Cartier $$-divisor $H$ on $Z$. Thus $D_Z_$ is $$-Cartier. Therefore, $Z$ is $$-factorial.
The following corollary will allow us to run $$-factorial generalized MMP with scaling (once the existence of flips is proven in the next section). It is similar to [Lemma 3.19]HL18.
Let $(X,B,)/U$ be a $$-factorial NQC glc g-pair, $D 0$ an $$-divisor on $X$, and $$ an NQC$/U$ $$-divisor over $X$, such that $(X,B+D,+)$ is glc and $K_X+B+D+_X+_X$ is nef$/U$. Then either $K_X+B+_X$ is nef$/U$, or there exists an extremal ray $R$ of $(X/U)$, such that $(K_X+B+_X) R<0$ and $(K_X+B+tD+_X+t_X) R=0$, where
$$t:=\{s 0 K_X+B+sD+_X+s_X is nef/U\}.$$
In particular, $K_X+B+tD+_X+t_X$ is nef$/U$.
Let $:=B+D$ and $:=+$. By Theorem [thm: shokurov polytope gpair], we may write $K_X+B+_X=_i=1^ka_i(K_X+B^i+_X^i)$ and $K_X++_X=_i=1^lc_i(K_X+^i+_X^i)$, such that
- each $a_i,c_i (0,1]$ and $_i=1^ka_i=1$, $_i=1^lc_i=1$,
- $=_i=1^ka_i^i$ and $=_i=1^lc_i^i$,
- each $(X,B^i,^i)$ is glc, each $(X,^i,^i)$ is glc, and
- each $K_X+^i+^i_X$ is nef$/U$.
Let $m$ be a positive integer such that $m(K_X+B^i+^i_X)$ and $m(K_X+^i+_X^i)$ are Cartier for any $i$.
If $K_X+B+_X$ is nef then there is nothing left to prove. Therefore, we may assume that $K_X+B+_X$ is not nef. By Theorem [thm: cone and contraction theorem glc pair], we may let $\{R_j\}_j$ be the set of $(K_X+B+_X)$-negative extremal rays in $(X/U)$, and $C_j$ a curve which generates $R_j$ such that $$-2 X (K_X+B+_X) C_j<0$$
for each $j$. Then for each $j$, we have
$$-2 X (K_X+B+_X) C_j=_i=1^k_in_i,jm<0$$
and
$$(K_X++_X) C_j=_i=1^l_in'_i,jm 0,$$
where $n_i,j,n_i,j'$ are integers, each $n_i,j -2m X$, and each $n_i,j' 0$. Therefore, $:=\{(K_X+B+_X) C_j j\}$ and $':=\{(K_X++_X) C_j j\}$ are DCC sets.
For any $j$, let $t_j$ be the real number such that $(K_X+B+_X+t_j(D+_X)) C_j=0$. Let $_j:=(K_X+B+_X) C_j$ and $_j:=(K_X++_X) C_j$, then $_j$, $_j'$, $_j<0$, $_j 0$, and
$$t_j=-_j_j-_j=11+_j-_j.$$
Thus $\{t_j\}_j$ is an ACC set, hence
$$t=\{s 0 K_X+B+sD+_X+s_X is nef/U\}=_j\{t_j\}=_j\{t_j\}=t_j_0$$
for some $j_0$. We may pick $R=R_j_0$.
# Proof of Theorems [thm: existence of q-factorial glc flips], [thm: can run gpair mmp], and [thm: gpair mmp 3fold and pe fourfold]
Now we are ready to prove the rest of our main theorems. We start with Theorem [thm: existence of q-factorial glc flips]. In fact, we can prove a slightly stronger result only assuming that $_X$ is $$-Cartier. Before we give the proof, let us recall the definitions of flipping contractions and flips.
[Flipping contraction]
Let $Xarrow U$ be a projective morphism such that $X$ is normal quasi-projective and $D$ an $$-Cartier $$-divisor on $X$. A $D$-flipping contraction over $U$ is a contraction $f: Xarrow Z$ over $U$ satisfying the following:
- $f$ is the contraction of a $D$-negative extremal ray $R$ in $(X/U)$. In particular, $(X/Z)=1$.
- $f$ is small, i.e. $ X= Z$ and the exceptional locus of $f$ is of codimension $ 2$ in $X$.
[Flip]
Let $X$ be a normal quasi-projective variety, $D$ an $$-Cartier $$-divisor on $X$, and $f: Xarrow Z$ a $D$-flipping contraction. A $D$-flip is a birational contraction $f^+: X^+arrow Z$ satisfying the following.
- $D^+$ is $$-Cartier and ample$/Z$, where $D^+$ is the strict transform of $D$ on $X^+$.
- $f^+$ is small.
Let $(X,B,)/U$ be an NQC glc g-pair and $f: Xarrow Z$ a $(K_X+B+_X)$-flipping contraction over $U$. Assume that $_X$ is $$-Cartier. Then the flip $f^+: X^+arrow Z$ of $f$ exists.
In particular, $_X^+$ is $$-Cartier, and if $X$ is $$-factorial, then $X^+$ is $$-factorial and $(X)=(X^+)$.
We prove the theorem in three steps. In Step 1, we construct the morphism $f^+: X^+arrow Z$. In Step 2, we show that the morphism $f^+$ constructed in Step 1 is a $(K_X+B+_X)$-flip. In Step 3, we prove the in particular part of the theorem.
1. In this step, we construct the morphism $f^+: X^+arrow Z$.
Let $h: Xarrow X$ be a birational morphism such that $$ descends to $ X$. Since $_X$ is $$-Cartier and $_ X$ is nef$/X$, we have
$$_ X+E=h^*_X$$
for some $E 0$ that is exceptional over $X$. Let $T X$ be the flipping locus and let $C$ be any flipping curve contracted by $f$. There are two cases:
1. $_X C 0$. Then $(K_X+B) C<0$, and $f$ is also a $(K_X+B)$-flipping contraction. Thus there exists an ample$/Z$ $$-divisor $A 0$ on $X$ such that $K_X+B+A_,Z0$ and $(X,B+A)$ is lc. By [Theorem 1.1]Has19, $(X,B)/U$ has a good minimal model. By Theorem [thm: contraction theorem glc g-pairs](3), we have $K_X+B_,Zr(K_X+B+_X)$ for some positive real number $r$. We let $g: Yarrow X$ be a dlt modification of $(X,B)$ and let $K_Y+B_Y=g^*(K_X+B)$, then $K_Y+B_Y+_Y=g^*(K_X+B+_X)$, and $(Y,B_Y,)/U$ and $(Y,B_Y,0)/U$ are glc g-pairs such that $Y$ is $$-factorial klt. By Lemma [lem: rlin equivalent good minimal model], $(X,B,)/Z$ has a good minimal model $(X',B',)/Z$, and we may let $X'arrow X^+$ be the contraction induced by $K_X'+B'+_X'$ over $Z$ and let $f^+: X^+arrow Z$ be the induced morphism.
2. $_X C<0$. In this case, $C h(E)$, hence $T h(E)$. Let $Z^0:= Z\{f(h(E))\}$, $X^0:=X_ZZ^0$, $B^0:=B_ZZ^0$, and $^0:=_ZZ^0$. Since $_XE$ does not contain any glc center of $(X,B,(1-))$, for any $ (0,1)$,
- all glc centers of $(X,B,(1-))$ intersect $X^0$,
- $(X^0,B^0,(1-)^0)/Z^0$ is a good minimal model of itself (this is because $X^0 Z^0$), and
- $^0$ descends to $X^0$ and $^0_X^0_,Z^00$.
Let $_0 (0,1)$ be a real number such that $f$ is also a $(K_X+B+(1-_0)_X)$-flipping contraction. By Theorem [thm: existence of glc closure], $(X,B,(1-_0))/Z$ has a good minimal model. Since $(X/Z)=1$, there exists a positive real number $r$ such that $K_X+B+_X_Zr(K_X+B+(1-_0)_X)$. By Theorem [thm: contraction theorem glc g-pairs](3), $K_X+B+_X_,Zr(K_X+B+(1-_0)_X)$. Let $g: Yarrow X$ be a dlt modification of $(X,B)$ and let $K_Y+B_Y:=g^*(K_X+B)$, then $K_Y+B_Y+(1-_0)_Y=g^*(K_X+B+(1-_0)_X)$ and $K_Y+B_Y+_Y=g^*(K_X+B+_X)$, and $(Y,B_Y,(1-_0))/U$ and $(Y,B_Y,)/U$ are glc g-pairs such that $Y$ is $$-factorial klt. By Lemma [lem: rlin equivalent good minimal model], $(X,B,)/Z$ has a good minimal model $(X',B',)/Z$, and we may let $X'arrow X^+$ be the contraction induced by $K_X'+B'+_X'$ over $Z$ and let $f^+: X^+arrow Z$ be the induced morphism.
We prove the following claim:
In Case 2, for any $$-Cartier $$-divisor $D$ on $X$ such that $D_Z0$, we have $D_,Z0$.
Since $(X/Z)=1$, and since $_X$ is $$-Cartier, pseudo-effective but not numerically trivial over $Z$, there exists an ample$/Z$ $$-divisor $A 0$ on $X$ and a positive real number $s$, such that
- $sA_Zs_X_Z-(K_X+B+_X)$,
- $(X,B+(1+s)A,)$ is glc, and
- all glc centers of $(X,B+(1+s)A,)$ are glc centers of $(X,B,)$.
For any $$-Cartier $$-divisor $D$ on $X$ such that $D_Z0$, since $A+D$ is ample$/Z$, we may pick $0 A_D_,ZA+D$, such that
- $sA_D_Zs_X_Z-(K_X+B+_X)$,
- $(X,B+(1+s)A_D,)$ is glc, and
- all glc centers of $(X,B+(1+s)A_D,)$ are glc centers of $(X,B,)$.
Fix a real number $ (0,1)$ and consider the generalized pair $(X,B+(+s)A_D,(1-))/Z$. By our construction, for any $D$ such that $D_Z0$,
- all glc centers of $(X,B+(+s)A_D,(1-))$ intersect $X^0$,
- $(X^0,B^0+(+s)A^0_D,(1-)^0)/Z^0$ is a good minimal model of itself, where $A^0_D:=A_D_ZZ^0$, and
- $^0$ descends to $X^0$ and $^0_X^0_,Z^00$.
By Theorem [thm: main theorem in section], $(X,B+(+s)A_D,(1-))/Z$ has a good minimal model. Since $K_X+B+(+s)A_D+(1-)_X_Z0$, $(X,B+(+s)A_D,(1-))/Z$ is a weak glc model of itself. By Lemma [lem: g-pair version bir12 2.7](2), $K_X+B+(+s)A_D+(1-)_X$ is semi-ample$/Z$, hence $K_X+B+(+s)A_D+(1-)_X_,Z0$ for any $D$. In particular, $$D_,ZA_D-A=1+s((K_X+B+(+s)A_D+(1-)_X)-(K_X+B+(+s)A+(1-)_X))_,Z0.$$
2. In this step, we show that the $f^+$ we constructed in Step 1 is a $(K_X+B+_X)$-flip. Let $B^+$ be the strict transform of $B$ on $X^+$. We only need to check the following two conditions by the definition of a flip:
- [(I)] $K_X^++B^++_X^+$ is $$-Cartier and ample$/Z$.
- [(II)] $f^+$ is small.
(I) is immediate from our construction. Since $f$ is small, to prove (II), we only need to show that the rational map $X X^+$ does not extract any divisor.
Let $p:W X$ and $q:W X'$ be a resolution of indeterminacy of $X X'$. By Lemma [lem: g-pair version bir12 2.6], $p^*(K_X+B+_X)=q^*(K_X'+B'+_X')+F$ where $F 0$ is exceptional over $X'$. Let $D$ be a prime divisor on $X'$ that is exceptional over $X$ and $D_W$ its strict transform on $W$. Then $D_W$ is covered by a family of $p$-vertical curves $ _t$ such that $ _t p^*(K_X+B_X+_X)=0$. Since $F _t 0$, then $ _t q^*(K_X'+B'+_X') 0$.
Let $ '_t=q_* _t$, then $ ' _t (K_X'+B'+_X') 0$ so that $ '_t$ are contracted by $X' X^+$ and hence $D$ is also contracted. Thus $X X^+$ does not extract any divisor, which implies (II). Thus $f^+$ is a $(K_X+B+_X)$-flip.
3. Now we prove the in particular part of the theorem. Pick any $$-divisor $D^+$ on $X^+$, and let $D$ be the strict transform of $D^+$ on $X$.
Assume that $D$ is $$-Cartier. Since $(X/Z)=1$, there exists a real number $t$ such that $D+t(K_X+B+_X)_Z0$. By Theorem [thm: contraction theorem glc g-pairs](3), $D+t(K_X+B+_X)_,Z0$. Thus $D+t(K_X+B+_X)_^*D_Z$ for some $$-Cartier $$-divisor $D_Z$ on $Z$. Therefore, $D^++t(K_X^++B^++_X^+)_(f^+)^*D_Z$. Since $K_X^++B^++_X^+$ is $$-Cartier, $D^+$ is $$-Cartier. Therefore, if $_X$ is $$-Cartier, then $_X^+$ is $$-Cartier, and if $X$ is $$-factorial, then $X^+$ is $$-factorial.
Since $X X^+$ is an isomorphism in codimension $1$, there is a natural isomorphism between the groups of Weil divisors on $X$ and $X^+$. When $X$ and $X^+$ are both $$-factorial, we have $(X)=(X^+)$, and the proof is concluded.
[Proof of Theorem [thm: existence of q-factorial glc flips]] It immediately follows from Theorem [thm: existence glc flip with m r cartier].
[Proof of Theorem [thm: can run gpair mmp]]
It immediately follows from Theorems [thm: existence glc flip with m r cartier], [thm: contraction theorem glc g-pairs], [thm: cone theorem glc g-pairs], and Corollaries [cor: gpair negative extremal contraction picard number compare] and [cor: gpair divisorial contraction q factoriality].
[Proof of Theorem [thm: gpair mmp 3fold and pe fourfold]]
It immediately follows from Theorem [thm: can run gpair mmp] and [Corollary 1]HM20, [Theorems 1.2,1.3]CT20.
[cf. [Lemma 3.17]HL18, Lemma [lem: trivial mmp under perturbation]]
Let $(X,B+A,)/U$ be a $$-factorial NQC glc g-pair, $(X,B,)$ is glc, and $K_X+B+_X$ is nef$/U$. Then there exists a positive real number $t_0$, such that for any $t (0,t_0]$, any partial $(K_X+B+tA+_X)$-MMP$/U$ is $(K_X+B+_X)$-trivial. Note that $A$ is not necessarily effective.
By Theorem [thm: shokurov polytope gpair], we may write $(K_X+B+_X)=_i=1^ka_i(K_X+B^i+^i_X)$, where
- each $a_i (0,1]$ and $_i=1^ka_i=1$, and
- each $(X,B^i,^i)/U$ is a glc $$-g-pair.
Let $m$ be a positive integer such that $m(K_X+B^i+^i_X)$ is Cartier or any $i$. By Lemma [lem: glc pair length of positive extremal ray], we may let $$ be a positive real number, such that for any ray in $(X/U)$ generated by a curve $C$, if $(K_X+B+_X) C>0$, then $(K_X+B+_X) C$. Let $t_0:=122 X+$. Then for any $t (0,t_0]$ and any $(K_X+B+tA+_X)$-negative extremal ray $R$ in $(X/U)$, by Theorem [thm: cone and contraction theorem glc pair](2), there exists a curve $C$ which generates $R$, such that $(K_X+B+A+_X) C -2 X$. Thus
$$0>(1-t)(K_X+B+_X) C+t(K_X+B+A+_X) C -2t X+(1-t)(K_X+B+_X) C,$$
so
$$(K_X+B+_X) C2t X1-t2t_0 X1-t_0<,$$
hence $(K_X+B+_X) C=0$.
99
[AK00]AK00 D. Abramovich and K. Karu, Weak semistable reduction in characteristic 0, Invent. Math. 139 (2000), no. 2, 241--273.
[AHK07]AHK07 V. Alexeev, C. D. Hacon, and Y. Kawamata, Termination of (many) $4$-dimensional log flips, Invent. Math. 168 (2007), no. 2, 433--448.
[Amb03]Amb03 F. Ambro, Quasi-log varieties, Tr. Mat. Inst. Steklova 240 (2003), Biratsion. Geom. Linein. Sist. Konechno Porozhdennye Algebry, 220--239; translation in Proc. Steklov Inst. Math. 2003, no. 1 (240), 214--233.
[Bir07]Bir07 C. Birkar, Ascending chain condition for log canonical thresholds and termination of log flips, Duke Math. J. 136 (2007), no. 1, 173--180.
[Bir12a]Bir12a C. Birkar, Existence of log canonical flips and a special LMMP, Pub. Math. IHES., 115 (2012), 325--368.
[Bir12b]Bir12b C. Birkar, On existence of log minimal models and weak Zariski decompositions, Math. Ann. 354 (2012), no. 2, 787--799.
[Bir18]Bir18 C. Birkar, Log Calabi-Yau fibrations, arXiv: 1811.10709v2.
[Bir19]Bir19 C. Birkar, Anti-pluricanonical systems on Fano varieties. Ann. of Math. (2), 190 (2019), 345--463.
[Bir20a]Bir20a C. Birkar, Geometry and moduli of polarised varieties, arXiv: 2006.11238v1.
[Bir20b]Bir20b C. Birkar, Generalised pairs in birational geometry, arXiv: 2008.01008v2.
[Bir20c]Bir20c C. Birkar, On connectedness of non-klt loci of singularities of pairs, arXiv: 2010.08226v1.
[Bir21a]Bir21a C. Birkar, Singularities of linear systems and boundedness of Fano varieties, Ann. of Math. 193 (2021), no. 2, 347--405.
[Bir21b]Bir21b C. Birkar, Boundedness and volume of generalised pairs, arXiv: 2103.14935v2.
[BCHM10]BCHM10
C. Birkar, P. Cascini, C. D. Hacon and J. M, Existence of minimal models for varieties of log general type, J. Amer. Math. Soc. 23 (2010), no. 2, 405--468.
[BDCS20]BDCS20 C. Birkar, G. Di Cerbo, and R. Svaldi, Boundedness of elliptic Calabi-Yau varieties with a rational section, arXiv: 2010.09769v1.
[BH14]BH14 C. Birkar and Z. Hu, Polarized pairs, log minimal models, and Zariski decompositions, Nagoya Math. J. 215 (2014), 203--224.
[BZ16]BZ16 C. Birkar and D.-Q. Zhang, Effectivity of Iitaka fibrations and pluricanonical systems of polarized pairs, Pub. Math. IHES., 123 (2016), 283--331.
[Che20]Che20 G. Chen, Boundedness of $n$-complements for generalized pairs, arXiv: 2003.04237v2.
[CT20]CT20 G. Chen and N. Tsakanikas, On the termination of flips for log canonical generalized pairs, arXiv: 2011.02236v1.
[CX20]CX20 G. Chen and Q. Xue, Boundedness of $(,n)$-Complements for projective generalized pairs of Fano type, arXiv: 2008.07121v1.
[Cho08]Cho08 R. Choi, The geography of log models and its applications, PhD Thesis, Johns Hopkins University (2008).
[Fil18a]Fil18a S. Filipazzi, Boundedness of Log Canonical Surface Generalized Polarized Pairs, Taiwanese J. Math. 22 (2018), no.4, 813--850.
[Fil18b]Fil18b S. Filipazzi, On a generalized canonical bundle formula and generalized adjunction, arXiv: 1807.04847v3.
[Fil20]Fil20 S. Filipazzi, On the boundedness of $n$-folds with $(X)=n-1$, arXiv: 2005.05508v2.
[FS20a]FS20a S. Filipazzi and R. Svaldi, Invariance of Plurigenera and boundedness for Generalized Pairs, arXiv: 2005.04254v2.
[FS20b]FS20b S. Filipazzi and R. Svaldi, On the connectedness principle and dual complexes for generalized pairs, arXiv: 2010.08018v2.
[FW20]FW20 S. Filipazzi and J. Waldron, Connectedness principle in characteristic $p>5$, arXiv: 2010.08414v2.
[Fuj04]Fuj04 O. Fujino, Termination of $4$-fold canonical flips, Publ. Res. Inst. Math. Sci, 40 (2004), no. 1, 231--237.
[Fuj05]Fuj05 O. Fujino, Addendum to “Termination of $4$-fold canonical flips”, Publ. Res. Inst. Math. Sci. 41 (2005), no. 1, 252--257.
[Fuj10]Fuj10 O. Fujino, On Kawamata’s theorem, Classification of Algebraic Varieties, EMS Ser. of Congr. Rep., Eur. Math. Soc., Z\"urich (2010), 305--315.
[Fuj11]Fuj11 O. Fujino, Foundations of the minimal model program, MSJ Memoirs, 35. Mathematical Society of Japan, Tokyo (2017).
[Fuj12]Fuj12 O. Fujino, Base point free theorems: saturation, B-divisors, and canonical bundle formula, Algebra Number Theory 6 (2012), no. 4, 797--823.
[Fuj13]Fuj13 O. Fujino, A transcendental approach to Koll\'ar’s injectivity theorem II, J. Reine Angew. Math. 681 (2013), 149--174.
[Fuj18]Fuj18 O. Fujino, Fundamental properties of basic slc-trivial fibrations I, to appear in Publ. Res. Inst. Math. Sci., arXiv: 1804.11134v3.
[Fuj19]Fuj19 O. Fujino, Corrigendum: On subadditivity of the logarithmic Kodaira dimension, arXiv: 1904.11639v3.
[Fuj21]Fuj21 O. Fujino, Cone theorem and Mori hyperbolicity, arXiv:2102.11986v1.
[FG14]FG14 O. Fujino and Y. Gongyo, Log pluricanonical representations and abundance conjecture, Compos. Math. 150 (2014), no. 4, 593--620.
[FH21]FH21 O. Fujino and K. Hashizume, Existence of log canonical modifications and its applications, arXiv: 2103.01417.
[FM00]FM00 O. Fujino and S. Mori, A canonical bundle formula, J. Differential Geom. 56 (2000), no. 1, 167--188.
[Fuk96]Fuk96 S. Fukuda, On base point free theorem, Kodai Math. J.19 (1996), no. 2,191--199.
[Gon11]Gon11 Y. Gongyo, On the minimal model theory for dlt pairs of numerical kodaira dimension zero, Math. Rest. Lett. 18 (2011), no. 5, 991--1000.
[HH19]HH19 C. D. Hacon and J. Han, On a connectedness principle of Shokurov-Koll\'ar type, Sci. China Math. 62 (2019), no. 3, 411--416.
[HMX14]HMX14 C. D. Hacon, J. M, and C. Xu, ACC for log canonical thresholds, Ann. of Math. 180 (2014), no. 2, 523--571.
[HM20]HM20 C. D. Hacon and J. Moraga, On weak Zariski decompositions and termination of flips, Math. Res. Lett. 27 (2020), no. 5, 1393--1421.
[HX13]HX13 C. D. Hacon and C. Xu, Existence of log canonical closures, Invent. Math. 192 (2013), no. 1, 161--195.
[HX15]HX15 C. D. Hacon and C. Xu, Boundedness of log Calabi-Yau pairs of Fano type, Math. Res. Lett. 22 (2015), no. 6, 1699--1716.
[HX16]HX16 C. D. Hacon and C. Xu, On finiteness of B-representations and semi-log canonical abundance in Minimal Models and Extremal Rays (Kyoto, 2011), Adv. Stud. Pure Math. 70 (2016), Math. Soc. Japan, Tokyo, 361--378.
[HL18]HL18 J. Han and Z. Li, Weak Zariski decompositions and log terminal models for generalized polarized pairs, arXiv: 1806.01234v2.
[HL20a]HL20a J. Han and Z. Li, On Fujita’s conjecture for pseudo-effective thresholds, Math. Res. Lett. 27 (2020), no. 2, 377--396.
[HL20b]HL20b J. Han and Z. Li, On accumulation points of pseudo-effective thresholds, Manuscripta math (2020).
[HL20c]HL20c J. Han and J. Liu, Effective birationality for sub-pairs with real coefficients, arXiv: 2007.01849v1.
[HLS19]HLS19 J. Han, J. Liu, and V. V. Shokurov, ACC for minimal log discrepancies of exceptional singularities, arXiv: 1903.04338v2.
[HL19]HL19 J. Han and W. Liu, On a generalized canonical bundle formula for generically finite morphisms, arXiv: 1905.12542v3, to appear in Ann. Inst. Fourier (Grenoble).
[HL20d]HL20d J. Han and W. Liu, On numerical nonvanishing for generalized log canonical pairs, Doc. Math. 25 (2020), 93--123.
[Has18]Has18 K. Hashizume, Minimal model theory for relatively trivial log canonical pairs, Ann. Inst. Fourier (Grenoble) 68 (2018), no. 5, 2069--2107.
[Has19]Has19 K. Hashizume, Remarks on special kinds of the relative log minimal model program, Manuscripta Math. 160 (2019), no. 3, 285--314.
[Has20]Has20 K. Hashizume, Non-vanishing theorem for generalized log canonical pairs with a polarization, arXiv: 2012.15038v1.
[HH20]HH20 K. Hashizume and Z. Hu, On minimal model theory for log abundant lc pairs, J. Reine Angew. Math., 767 (2020), 109--159.
[Hu20]Hu20 Z. Hu, Log abundance of the moduli b-divisors for lc-trivial fibrations, arXiv: 2003.14379v3.
[Hu21]Hu21 Z. Hu, An abundance theroem for generalised pairs, arXiv: 2103.11813v1.
[Jia21]Jia21 J. Jiao, On the Boundedness of Canonical Models, arXiv: 2103.13609v1.
[Kaw84]Kaw84 Y. Kawamata, The cone of curves of algebraic varieties, Ann. of Math. 119 (1984), 603--633.
[Kaw92]Kaw92 Y. Kawamata, Termination of log flips for algebraic $3$-folds, Internat. J. Math. 3 (1992), no. 5, 653--659.
[Kaw98]Kaw98 Y. Kawamata, Subadjunction of log canonical divisors, II, Amer. J. Math. 120 (1998), 893--899.
[Kaw15]Kaw15 Y. Kawamata, Variation of mixed Hodge structures and the positivity for algebraic fiber spaces, Advanced Studies in Pure Mathematics, 65 (2015), 27--57.
[KMM87]KMM87 Y. Kawamata, K. Matsuda, and K. Matsuki, Introduction to the minimal model problem, Algebraic geometry, Sendai, 1985, 283--360, Adv. Stud. Pure Math., 10, North-Holland, Amsterdam, 1987.
[Kol84]Kol84 J. Koll\'ar, The cone theorem, Ann. of Math., 120 (1984), 1--5.
[Kol07]Kol07 J. Koll\'ar, “Kodaira’s canonical bundle formula and adjunction. In: Flips for 3-folds and 4-folds. Ed. by A. Corti. Vol. 35. Oxford Lecture Series in Mathematics and its Applications. Oxford: Oxford University Press, 2007. Chap. 8, 134--162.
[Kol14]Kol14 J. Koll\'ar, Semi-Normal Log Centres and Deformations of Pairs, Proc. Edinburgh Math. Soc., 57 (2014), no. 1, 191--199.
[KM98]KM98 J. Koll\'ar and S. Mori, Birational geometry of algebraic varieties, Cambridge Tracts in Math. 134 (1998), Cambridge Univ. Press.
[LP20a]LP20a V. Laz\'ic and T. Peternell, On generalised abundance, I, Publ. Res. Inst. Math. Sci. 56 (2020), no. 2, 353--389.
[LP20b]LP20b V. Laz\'ic and T. Peternell, On generalised abundance, II, Peking Mathematical Journal 3 (2020), 1--46.
[LMT20]LMT20 V. Lazi\'c, J. Moraga, and N. Tsakanikas, Special termination for log canonical pairs, arXiv: 2007.06458v1.
[LT19]LT19 V. Lazi\'c and N. Tsakanikas, On the existence of minimal models for log canonical pairs, to appear in Publ. Res. Inst. Math. Sci., arXiv: 1905.05576v3.
[LT21]LT21 V. Lazi\'c and N. Tsakanikas, Special MMP for log canonical generalised pairs, personal communication.
[Li20]Li20 Z. Li, Boundedness of the base varieties of certain fibrations, arXiv: 2002.06565v2.
[Li21]Li21 Z. Li, Fujita’s conjecture on iterated accumulation points of pseudo-effective thresholds, Selecta Mathematica 27 (2021), no. 9.
[Liu21]Liu21 J. Liu, Sarkisov program for generalized pairs, Osaka J. Math., 58 (2021), no. 4.
[LX21]LX21 J. Liu and L. Xie, Number of singular points on projective surfaces, arXiv: 2103.04522v1.
[Mor18]Mor18 J. Moraga, Termination of pseudo-effective4-fold flips, arXiv: 1802.10202v3.
[Nak86]Nak86 N. Nakayama, Invariance of the plurigenera of algebraic varieties under minimal model conjectures, Topology 25 (1986), no. 2, 237--251.
[Nak16]Nak16 Y. Nakamura, On minimal log discrepancies on varieties with fixed Gorenstein index. Michigan Math. J., 65 (1), 165--187, 2016.
[Nak04]Nak04 N. Nakayama, Zariski-decomposition and abundance, MSJ Memoirs, vol. 14, Mathematical Society of Japan, Tokyo, 2004.
[Sho96]Sho96 V.V. Shokurov, 3-fold log models, J. Math. Sci. 81 (1996), no. 3, 2667--2699.
[Sho20]Sho20 V.V. Shokurov, Existence and boundedness of $n$-complements, arXiv: 2012.06495v1.