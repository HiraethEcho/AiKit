[Weak Zariski decompositions and termination of flips]On weak Zariski decompositions and termination of flips
[C.~Hacon]Christopher Hacon
Department of Mathematics, University of Utah, 155 S 1400 E, JWB 233,
Salt Lake City, UT 84112, USA
@math.utah.edu
[J.~Moraga]Joaqu\'in Moraga
Department of Mathematics, University of Utah, 155 S 1400 E, JWB 321,
Salt Lake City, UT 84112, USA
@math.utah.edu
[2010]Primary 14E30,
Secondary 14F18.
first author was partially supported by NSF research grants no: DMS-1300750, DMS-1265285
and by a grant from the Simons Foundation; Award Number: 256202. He would also like
to thank the Mathematics Department and the Research Institute for Mathematical Sciences,
located Kyoto University.
We prove that termination of lower dimensional flips for generalized klt pairs
implies termination of flips for log canonical generalized pairs with a weak Zariski decomposition.
Under the same hypothesis we prove that the existence of weak Zariski decompositions for pseudo-effective log canonical pairs
implies the existence of weak Zariski decompositions for pseudo-effective generalized log canonical pairs.
As an application, we prove the termination of any minimal model program for generalized log canonical
pseudo-effective $4$-folds.
1
*Introduction
One of the main goals of the minimal model program is to show that given a $$-factorial klt pair $(X,B)$ such that $K_X+B$ is pseudo-effective (resp. not pseudo-effective), then there exists a finite sequence of divisorial contractions and flips $$X X_1 X_2 X_n$$ such that $(X_n,B_n)$ is a minimal model (resp. there is a Mori fiber space $X_n Y$ and in particular $-(K_X_n+B_n)$ is ample over $Y$), where $B_n$ is the strict transform of $B$ on $X_n$. We refer the reader to [KM98] for the details of the minimal model program.
After [BCHM], it is known that the above sequence of flips and divisorial contractions always exists and the only remaining question is wether it terminates after finitely many steps. It is well known that any such sequence can have only finitely many divisorial contractions and hence the main open question is if there are no infinite sequences of flips.
A flip $X X^+$ is a small birational map of $$-factorial varieties, projective over a variety $W$ such that $(X/W)= (X^+/W)=1$ and both $-(K_X+B)$ and $K_X^++B^+$ are ample over $W$ where $B^+$ is the strict transform of $B$.
As a consequence of the negativity lemma, it is easy to see that flips improve certain singularity invariants known as log discrepancies. More precisely, if $X X^+$ is a flip, then we have the following inequality $a_E(X,B) a_E(X^+,B^+)$ which is strict if and only if the center of $E$ is contained in the flipping locus i.e. the exceptional locus of the flipping contraction $X W$.
Shokurov has shown [Shok04] that certain natural conjectures concerning log descrepancies can be used to prove
termination of flips in arbitrary dimension.
These conjectures are the ascending chain condition for minimal log discrepancies and the semicontinuity for minimal log discrepancies.
Unluckily these conjectures are very subtle and not well understood in dimension $ 3$.
In [BCHM] a different approach is introduced. Instead of trying to prove termination of arbitrary sequences of flips, the authors show termination of specific kinds of minimal model programs known as minimal model programs with scaling. This approach is successful whenever $K_X+B$ is big or $B$ is big or $K_X+B$ is not pseudo-effective. In particular the existence of minimal models for klt pairs of log general type follows as well as the existence of Mori fiber spaces for klt pairs $(X,B)$ such that $K_X+B$ is not pseudo-effective.
This approach does not seem to shed any light on the termination of arbitrary sequences of flips.
In~[Bir07], Birkar introduced a new philosophy to prove termination of flips for klt pairs such that $K_X+B$ is pseudo-effective. In this case one expects that $K_X+B G 0$. Birkar shows that assuming the ascending chain condition conjecture for log canonical thresholds and the termination of flips for klt pairs of dimension $ d-1$, then flips terminate for any $d$-dimensional log canonical pair $(X,B)$ such that $K_X+B G 0$.
The ascending chain condition conjecture for lct's was proved by Hacon, M$^ c$Kernan and Xu in ~[HMX14], and later extended to the context of generalized pairs by Birkar and Zhang in ~[BZ16]. In [Shok09], Shokurov shows that termination of flips with scaling holds for pseudo-effective klt fourfolds and in particular these pairs admit a minimal model and hence a Zariski decomposition.
In~[Mor18], the second author proves termination of pseudo-effective $4$-fold flips by combining the results of [Bir07], [Shok09] and [BZ16].
Following this philosophy, in this article we prove that the existence of a weak Zariski decomposition for a generalized log canonical pair
can be used to reduce termination of flips for such pairs to lower dimensional terminations. More precisely, we prove the following theorem:
Assume termination of flips for generalized klt pairs of dimension at most $ n-1$.
Let $(X/Z,B+M)$ be a generalized log canonical pair of dimension $n$
admitting a weak Zariski decomposition.
Assume that $B$ is a $$-divisor and $M$ is a $$-Cartier b-divisor nef over $Z$.
Then any minimal model program for $K_X+B+M/Z$ terminates.
Note in particular that in this paper we work with $$-divisors and our results do not apply to the context of $$-divisors.
We also prove that the existence of weak Zariski decompositions for pseudo-effective generalized log canonical pairs follows from the same statement for generalized log canonical pairs.
Assume termination of flips for generalized klt pairs of dimension at most $n-1$.
Then the existence of weak Zariski decompositions for pseudo-effective log canonical pairs of dimension $n$
implies the existence of weak Zariski decompositions for pseudo-effective generalized log canonical pairs of dimension $n$.
Note that by Theorem~[genwzd] it follows that in Theorem [termination] it suffices to assume that log canonical pairs of dimension $n$
admit a weak Zariski decomposition.
Combining Theorem~[termination], Theorem~[genwzd], and the existence of minimal models for
pseudo-effective log canonical $4$-folds~[Shok09], we prove that any minimal model program for a pseudo-effective generalized log canonical $4$-fold terminates.
This generalizes the main theorem of~[Mor18] from the case of log canonical pairs
to the case of generalized log canonical pairs with $$-divisors.
Let $(X/Z,B+M)$ be a pseudo-effective generalized log canonical $4$-fold.
Then any minimal model program for $(X/Z,B+M)$ terminates.
Again, in this result we assume all divisors have $$-coefficients.
Acknowledgement. We would like to thank C. Birkar for useful discussions and suggestions.
This paper is deeply influenced by his ideas (especially [Bir07] and [Bir12a]).
We would like to thank J. Han for many useful comments on a previous draft of this paper.
We would like to thank V. L\'azic for pointing to us a mistake in a previous version of this paper.
# Preliminary results
## Weak Zariski decomposition
Let $D$ be a $$-Cartier divisor on a normal variety $X/Z$. A weak Zariski decomposition for $D$ over $Z$
consists of a normal variety $X'$, a projective birational morphism $f X' arrow X$,
and a numerical equivalence
$$
f^*D _Z P'+N'
$$
such that the following properties hold
- $P'$ is a $$-Cartier divisor which is nef over $Z$, and
- $N'$ is an effective $$-Cartier divisor.
We will say that a generalized pair $(X/Z,B+M)$ (see Definition [d-glp]) has a weak Zariski decomposition if
the $$-Cartier divisor $K_X+B+M/Z$ has a weak Zariski decomposition.
In what follows, we may write WZD instead of weak Zariski decomposition in order to shorten the notation.
Consider a $$-Cartier divisor $D$ on a projective normal variety $X$.
If there exists a projective $D$-non-positive birational contraction $ X X_1$,
such that the divisorial push-forward $_*D$ is a nef $$-Cartier divisor,
then $D$ has a weak Zariski decomposition.
Indeed, we consider a common resolution of singularities with
projective birational morphisms $f X'arrow X$ and $f_1 X'arrow X_1$,
then we can write
$$
f^*D= f_1^*(_*D)+E,
$$
where $f_1^*(_*D)$ is nef and $E$ is an effective $$-divisor.
In particular, a pair $(X,B )$ admitting a minimal model has a weak Zariski decomposition.
Therefore, conjecturally, every pseudo-effective log canonical pair has a WZD.
In ~[Zar62], Zariski proved that any effective divisor $D$ on a smooth projective surface $X$
can be decomposed as $P+N$, where $P$ and $N$ are $$-divisors, $P$ is nef, $N$ is effective,
the intersection matrix of $N$ is negative definite, and $P C=0$ for every irreducible componente $C$ of $N$.
In ~[Fuj79], Fujita generalized the above decomposition to the context of pseudo-effective $$-divisors.
There have been many attempts to generalize the above decomposition for higher dimensional varieties.
For instance, the Fujita-Zariski decomposition ~[Fuj86] and the CKM-Zariski decomposition (see, e.g., ~[Pro04]).
In~[Bir12a], assuming the minimal model program for dlt pairs in dimension $d-1$,
the author proves that the existence of a WZD for a log canonical pair of dimension $d$ is equivalent to the existence of all of the above decompositions.
In ~[Les14], the author constructs a psuedo-effective divisor on the blow up of $^3$
at nine very general points, which lies in the closed movable cone and has negative intersections with a set
of curves whose union is Zariski dense. Hence, this pseudo-effective divisor does not admit a weak Zariski decomposition.
## Generalized pairs
In this subsection, we recall the language of generalized pairs.
A generalized pair is a triple $(X/Z,B+M)$, such that the following conditions hold
- $X$ is a quasi-projective normal algebraic variety,
- $Xarrow Z$ is a projective morphism of normal varieties,
- $M$ is the push-forward of a $$-divisor, nef over $Z$, on a higher birational model of $X$ over $Z$,
- $B$ is an effective $$-divisor,
- $K_X+B+M$ is a $$-Cartier divisor.
More precisely, there exists a projective birational morphism $f X' arrow X$
from a normal quasi-projective variety $X'$ and a nef $$-Cartier $$-divisor $M'$ such that $M=f_* M'$.
We can define $B'$ via the equation
$$
K_X'+B'+M'= f^*(K_X+B+M).
$$
We will say that $B$ is the boundary part
and $M$ is the nef part of the generalized pair.
Observe that $M'$ defines a nef b-Cartier $$-divisor in the sense of [Definition 1.7.3]Cor07.
We will say that this is the nef b-divisor associated to the generalized pair.
Given a projective birational morphism
$g X''arrow X$ which dominates $X'arrow X$,
we can write
$$
K_X''+B''+M''= g^*(K_X+B+M),
$$
where $M''$ is the pull-back of $M'$ to $X''$.
Given a prime divisor $E$ on $X''$, we define the log discrepancy of $(X/Z,B+M)$
at $E$ to be
$$
a_E(X/Z,B+M)= 1- coeff_E(B'')
$$
where $ coeff_E(B'')$ denotes the coefficient of $B''$ along the prime divisor $E$.
We say that $(X/Z,B+M)$ is
Kawamata log terminal or klt
if the log discrepancy of $(X/Z,B+M)$ at any prime divisor over $X$ is positive,
and we say that $(X/Z,B+M)$ is
log canonical or lc
if the log discrepancy of $(X/Z,B+M)$ at any prime divisor over $X$ is non-negative.
By Hironaka's resolution of singularities we may assume that $X''$ is smooth and $B''$ has simple normal crossing support.
In this case, $(X/Z,B+M)$ is klt (resp. lc) iff $ coeff(B'')<1$ (resp. $ coeff(B'') 1$). Here $ coeff(B'')$ denotes the biggest coefficient of the $$-divisor $B''$.
Let $(X,B+M)$ be a generalized pair and $(X'',B''+M'')$ any log resolution as above.
A prime divisor $E$ of $X''$ such that $ coeff_E(B'') 1$ is called
a generalized non-klt place of the generalized pair $(X,B+M)$.
Moreover, if $ coeff_E(B'')=1$ (resp. $ coeff_E(B'')>1$)
then we may call it a generalized log canonical place
(resp. generalized non-lc place) of the generalized pair on $X''$.
The image of a generalized non-klt place (resp. generalized log canonical place) on $X$ is called a
generalized non-klt center (resp. generalized log canonical center) of the generalized pair.
A generalized non-klt center of a generalized pair $(X,B+M)$ is said to be minimal
if it is minimal with respect to inclusion.
Let $(X/Z,B+M)$ be a generalized pair. A weak contraction $ X arrow W$ for the generalized pair
is a projective birational contraction over $Z$, such that $-(K_X+B+M)$ is nef over $W$.
A quasi-flip of $$ is a projective birational map $ X X^+$ with a projective birational contraction
$^+ X^+arrow W$ over $Z$ such that the following conditions hold
- the triple $(X^+,B^++M^+)$ is a generalized log canonical pair,
- the $$-Cartier $$-divisor $K_X^++B^++M^+$ is nef over $W$,
- the inequality $^+_*B^+ _*B$ of Weil $$-divisors on $W$ holds, and
- the nef parts $M$ and $M^+$ are the trace of a common nef b-Cartier b-divisor.
As usual, the morphism $$ (resp. $^+$) is called the flipping contraction (resp. flipped contraction).
We may call $(X/Z,B+M)$ (resp. $(X^+/Z,B^++M^+)$) the flipping generalized pair (resp. flipped generalized pair)
when the quasi-flip is clear from the context.
A quasi-flip $$ is said to be ample if $-(K_X+B+M)$ and $K_X^++B^++M^+$
are ample over $W$,
and at most one of the morphisms $$ and $^+$ is the identity.
Observe that if $^+$ is the identity, then $$ is a divisorial contraction, and vice-versa.
In the above case, the quasi-flip will be called a weak divisorial contraction and
weak divisorial extraction, respectively.
The quasi-flip $$ is said to be small if both $$ and $^+$ are small morphisms.
A generalized flip is an ample small quasi-flip of relative Picard rank one.
A generalized divisorial contraction (resp. divisorial extraction) is a
weak divisorial contraction (resp. weak divisorial extraction) of relative Picard rank one.
A generalized flip for a generalized pair which is generalized klt (resp. generalized dlt or generalized lc)
on a neighborhood of the flipping contraction is called a generalized klt flip (resp. generalized dlt flip or generalized lc flip).
A sequence of quasi-flips for a generalized log canonical pair $(X,B+M)$ is said to be under a set satisfying the DCC
if the coefficients of all the boundary parts $B_i$ in the sequence of quasi-flips belong to a fixed set satisfying the DCC. Moreover, we say that the sequence is with a fixed boundary divisor
if the boundary divisor on the flipped pair is the divisorial push-forward of the boundary divisor on the
flipping pair.
A minimal model program for $K_X+B+M$ over $Z$, is a sequence
of flips and divisorial contractions for $K_X+B+M$ over $Z$.
A weak minimal model program for $K_X+B+M$ over $Z$,
is a sequence of ample quasi-flips for $K_X+B+M$ over $Z$.
The following proposition is well-known to experts (see, e.g. ~[Monotonicity]Shok04).
Given an ample quasi-flip $ X X^+$ for generalized log canonical pairs
$(X/Z,B+M)$ and $(X^+/Z,B^++M^+)$ over $Z$, with flipping contraction
$ X arrow W$, and a prime divisor $E$ over $X$, we have that
$$
a_E(X/Z,B+M) a_E(X^+/Z,B^++M^+)
$$
and the inequality is strict if and only if the center of $E$ on $X$ is contained in the flipping locus union the support of $B- ^-1_* B^+$.
Let $(X/Z,B+M)$ be a generalized log canonical pair,
let $N$ be an effective divisor on $X$ and $P'$ a nef $$-Cartier divisor over $Z$ on $X'$,
such that $N+P$ is $$-Cartier, where $P=f_*P'$.
The generalized log canonical threshold of $N+P$ with respect to the generalized pair $(X,B+M)$
is defined to be
$$
lct((X/Z,B+M) N+P) :=
sup\{ (X/Z, B+ N + M+ P) is generalized log canonical \},
$$
where the above generalized pair has boundary part $B+ N$ and
nef part $M+ P$.
Observe that the above threshold is a non-negative rational number or $+$, for instance if $P'=f^*P$ and $N=0$.
Given a set of positive real numbers $$ satisfying the DCC, we will denote by $()$ the set
of generalized boundaries $B+M$,
where the coefficients of $B$ belong to $$, and where we can write $M'= _i M'_i$
where $_i $ and $M'_i$ are Cartier divisors nef over $Z$.
In ~[Theorem 1.5]BZ16, Birkar and Zhang prove that the set
$$
LCT_n() = \{ lct((X/Z,B+M) N+P) B+M (), N+P () and (X)=n \}
$$
satisfies the ascending chain condition. Here, we assume that $N+P$ is $$-Cartier so that the definition of log canonical threshold makes sense.
The proof relies on ~[HMX14], where this result is proved in the case $M'=N'=0$.
In ~[BZ16], the authors prove the statement by induction in the number of non-trivial coefficients of $M'$ and $N'$.
Note that if $M$ is a nef $$-divisor, then there exists an integer $k$ such that $M_1=kM$ is nef and Cartier and hence $M=1kM_1$. A similar statement does not hold for $$-Cartier nef divisors.
If $M=0$, then we will drop the word ``generalized" from the definition.
In this case, we are in the usual setting of log pairs as in~[KM98,HK10].
## Log canonical threshold with respect to weak Zariski decompositions
In this subsection, we introduce an invariant for generalized log canonical pairs admitting a weak Zariski decomposition.
Let $(X/Z,B+M)$ be a $$-factorial generalized log canonical pair with a weak Zariski decomposition
given by the projective birational morphism $f X' arrow X$ over $Z$ and
the numerical equivalence $f^*(K_X+B+M)_Z N'+P'$. We consider
$P= f_*P'$ and $N=f_*N'$ as the nef part and boundary part of a generalized boundary,
and define
$$
lct_ WZD (f,N+P)(X/Z,B+M) := lct((X/Z,B+M) N+P).
$$
We call this invariant the log canonical threshold of the generalized pair with respect to the weak Zariski decomposition
or just the lct with respect to the WZD.
When the weak Zariski decomposition is clear from the context, we will just write
$ lct_ WZD$ instead of $ lct_ WZD(f,N+P).$
The generalized log canonical threshold with respect to the weak Zariski decomposition
depends on the chosen WZD and not only on the given generalized pair.
For instance, every effective divisor linearly equivalent to $K_X+B+M$ gives a different weak Zariski decomposition,
and different choices of effective divisors give different log canonical thresholds.
The above invariant is uniquely determined by the generalized pair if we choose a decomposition as defined by Nakayama in~[Chapter 3, 1.a.]Nak04.
However, the existence of a WZD is a weaker assumption (see, e.g.,~[Bir12a]).
Let $(X/Z,B+M)$ be a $$-factorial generalized log canonical pair with a weak Zariski decomposition.
The lct with respect to the WZD is finite unless $K_X+B+M$ is nef over $Z$.
Without loss of generality we may assume that we have a projective birational morphism $f X'arrow X$
such that both nef b-Cartier divisors $P'$ and $M'$ descend to $X'$.
If $N'$ is a non-trivial effective divisor, then the above log canonical threshold is finite, so we may assume it is trivial.
Hence, $f^*(K_X+B+M) _Z P'$, so $K_X+B+M$ is nef over $Z$.
The lct with respect to the WZD does not change if we replace $X'$ by a higher birational model.
The generalized log canonical threshold only depends on $(X,B+M)$, the nef b-Cartier divisor $P'$,
and the effective divisor $N= f_*N'$.
This data is preserved when replacing $X'$ with a higher birational model.
Let $(X/Z,B+M)$ be a $$-factorial generalized log canonical pair with a weak Zariski decomposition $f:X' X$ such that $f^*(K_X+B+M)_Z P'+N'$ where $P'$ is nef over $Z$ and $N' 0$.
If $:X X_1$ is a quasi-flip with fixed boundary that extracts no divisors and $X_1$ is $$-factorial, then $(X_1/Z,B_1+M_1)$ is a generalized log canonical pair with a compatible weak Zariski decomposition.
We may assume that $f_1:X' X_1$ is a morphism. We have
$$P'+N' _Z f^*(K_X+B+M) _Zf_1^*(K_X_1+B_1+M_1)+E$$
where $E 0$ is $f_1$-exceptional.
Note $N'-E _X_1 -P'$ is anti-nef over $X_1$
and $f_1_*(N'-E) = f_1_* N' 0$.
It follows by the negativity lemma that $N'_1:=N'-E 0$.
But then $f_1^*(K_X_1+B_1+M_1) _Z P'+N'_1$ is a compatible weak Zariski decomposition.
Let $(X/Z,B+M)$ be a $$-factorial generalized log canonical pair with a weak Zariski decomposition
and
$$
@C=2em
(X/Z,B+M)@-->[r]^-_1 & (X_1/Z,B_1+M_1)@-->[r]^-_2 & (X_2/Z,B_2+M_2) @-->[r]^-_3 &
@-->[r]^-_i & (X_i/Z,B_i+M_i)@-->[r]^-_i+1 &
$$
a sequence of small ample $$-factorial quasi-flips with fixed boundary for $K_X+B+M$ over $Z$.
Then, the lct of the generalized pairs $(X_i/Z,B_i+M_i)$ with respect to the WZD induced by Lemma [WZDpreserved]
forms a non-decreasing sequence of positive rational numbers.
Since $_i$ is a small ample quasi-flip over $Z$
we know that the generalized log canonical pair $(X_i/Z,B_i+M_i)$ is not nef over $Z$.
Hence, by Lemma~[finiteness], we conclude that the lct with respect to any WZD of $K_X_i+B_i+M_i$ over $Z$ is finite.
It suffices to prove the statement for a single small ample quasi-flip $ X X^+$ over $Z$,
of the $$-factorial generalized log canonical pair $(X/Z,B+M)$.
We will denote by $(X^+/Z,B^++M^+)$ the flipped generalized log canonical pair.
Consider two projective birational morphisms $f X'arrow X$ and $f^+ X'arrow X^+$ over $Z$,
such that both nef b-Cartier divisors $P'$ and $M'$ descend on $X'$.
We will denote by $f^*(K_X+B+M)_Z P'+N'$ the induced weak Zariski decomposition for
$K_X+B+M$ on $X'$.
By the negativity lemma we have
$$
f^+^*(K_X^++B^++M^+) _Z P' + N'^+
$$
where $N' N'^+ 0$.
Hence, we have an induced Zariski decomposition for $K_X^++B^++M^+/Z$
and we will denote
$$
P^+=f^+_*P' and N^+=f^+_*N'^+.
$$
Without loss of generality we may assume that $X'$ is a log resolution of both generalized pairs.
By Lemma~[highermodel], this assumption does not change the lct with respect to the WZD.
Therefore, by Proposition~[monotonicity] we conclude that for every $ >0$ we have that
$$
f^+^*(K_X^++B^++M^+ +(P^++N^+))
f^*(K_X+B+M+(P+N)),
$$
concluding the inequality between log canonical thresholds.
The lct with respect to the WZD of a small ample quasi-flip $(X/Z,B+M) (X^+/Z,B^++M^+)$
strictly increases if and only if the flipping locus contains all the generalized log canonical centers of
$(X/Z,B+M+(P+N))$ where $$ is the log canonical threshold
of the generalized pair $(X/Z,B+M)$ with respect to the WZD.
## Generalized divisorially log terminal modifications
In this subsection, we recall the proof of the existence of $$-factorial
dlt modifications for generalized log canonical pairs
(see, e.g.,~[Lemma 4.5]BZ16 and~[2.13.(2)]Bir17).
In ~[AH12] and ~[Theorem 3.1]KK10, there is a proof of existence of dlt modifications for pairs.
We say that the pair $(X/Z,B+M)$ is divisorially log terminal or dlt if there exists an open subset $U X$ such that
- the coefficients of $B$ are less than or equal to one,
- $U$ is smooth and $B|_U$ has simple normal crossings,
- all the generalized non-klt centers of $(X,B+M)$ intersect $U$ and are given by strata of $ B$.
Note that if $(X/Z,B+M)$ is dlt and $: X X'$ is a step of the $(X/Z,B+M)$-MMP then $(X',B'+M'= _*(B+M))$ is also dlt.
This can be checked easily by letting $U'=(U Ex())$ and observing that since $(X,B+M)$ is generalized log canonical, then the flipped locus contains no generalized log canonical centers of $(X',B'+M')$.
Let $(X/Z,B+M)$ be a generalized dlt pair and $U X$ an open subset as in the definition above.
Let $A$ be a divisor on $X$ ample over $Z$ and $ >0$ a rational number.
Then, there exists a $$-divisor $B_ _ B+ A$ so that $(X/Z,B_+M)$ is generalized klt.
Let $>0$ be a sufficiently small rational number.
For any rational number $0< 1$, we may pick an integer $m>0$ such that $m(A- B)$ is integral and generated. In particular $| m(A- B)|$ is base point free on $U$. Let $D | m(A- B)|$ be a general element and set $B_ =B- B + m D$ so that $K_X+B_+M _ K_X+B+ A +M$ is $$-Cartier. Since
the only log canonical centers of $(X/Z,B+M)$ are strata of $ B$ and the support of $D$ contains no such strata, it follows easily that $(X/Z,B_+M)$ has no non-klt centers and hence is generalized klt.
Let $(X,B+M)$ be a generalized dlt pair, then there exists a small birational morphism $:X' X$ such that
$X'$ is $$-factorial and $(X',B'+M'= ^-1_*(B+M))$ is dlt.
By Lemma~[dlt-perturbation], we may assume that $(X ,B_ +M)$ is a generalized klt pair. Let $ :X' X$ be a log resolution and write $K_X'+B'_ +M'=^*(K_X+B_ +M)+F$ where $(X',B'_ +M')$ is klt $F 0$ and the support of $F$ equals the sum of all $X' X$ exceptional divisors. By [Section 4]BZ16, we may run the $(X',B'_ +M')$ MMP over $X$. Replacing $X'$ by the output of this MMP,
we may assume that $F$ is nef and hence $F=0$ by the negativity lemma. But then $X' X$ is a small birational morphism. It remains to show that $(X',B'+M'= ^-1_*(B+M))$ is dlt. Let $U$ be the open subset given by Definition [d-dlt]. Since $U$ is smooth, we may assume that $U'= ^-1(U) U$ is an isomorphism (since any small birational morphism of $$-factorial varieties is an isomorphism). The claim now follows since if $E$ is a divisor over $X'$ with center contained in $X' U'$, then its center on $X$ is contained in $X U$ and hence $a_E(X,B+M)>0$.
Let $(X/Z,B+M)$ be a generalized pair.
Let $h Y arrow X$ be a projective birational morphism of normal varieties over $Z$.
We may assume that the given projective birational morphism $f X'arrow X$ factors through $h$.
Then, we define $B_Y$ and $M_Y$ to be the push-forwards of $B'$ and $M'$ on $Y$, respectively.
Thus, we can write
$$
K_Y+B_Y+M_Y=h^*(K_X+B+M).
$$
If the following conditions are satisfied:
- $B_Y$ is an effective divisor,
- $(Y/Z,B_Y^ 1+M_Y)$ is $$-factorial dlt, where $B_Y^ 1=B_Y Supp(B_Y)$, and
- every $h$-exceptional prime divisor $E$ has log discrepancy less than or equal to zero with respect
to the generalized pair $(X/Z,B+M)$,
then we say that $(Y/Z,B_Y+M_Y)$ is a $$-factorial dlt modification of $(X/Z,B+M)$.
Here, we consider $(Y/Z,B_Y+M_Y)$ as a generalized pair with nef b-Cartier divisor $M'$.
Observe that $(Y/Z,B_Y+M_Y)$ is the usual $$-factorial generalized dlt modification over
the generalized log canonical locus of $(X/Z,B+M)$.
We will prove the following proposition in Section 2.
Assume termination of flips for generalized klt pairs of dimension at most $n-1$.
Let $(X/Z,B+M)$ be a generalized pair of dimension $n$,
where $B$ is a $$-divisor and $M$ is a $$-Cartier b-divisor nef over $Z$.
Then, $(X/Z,B+M)$
has a $$-factorial dlt modification $(Y/Z,B_Y+M_Y)$.
The following lemma is proved in a more general setting in ~[Section 4]BZ16.
Let $(Y/Z,B_Y+M_Y)$ be a $$-factorial generalized dlt pair.
Let $A$ be a general effective ample divisor on $Y$ over $Z$,
then we can run a minimal model program for the generalized pair with scaling of $A$ over $Z$.
## Generalized dlt adjunction
In this subsection, we recall the construction and properties of generalized divisorial adjunction in ~[BZ16]
and introduce a generalized dlt adjunction formula.
Let $(X/Z,B+M)$ be a generalized log canonical pair,
assume that $S$ is the normalization of a component of $ B $
and $S'$ its birational transform on $X'$.
Replacing the morphism $f X'arrow X$ with a higher birational model,
we may assume that $f$ is a log resolution for the generalized log canonical pair $(X,B+M)$.
Then, we can write
$$
K_X'+B'+M'= f^*(K_X+B+M),
$$
and
$$
K_S'+B_S'+M_S'= (K_X'+B'+M')|_S',
$$
where $B_S'=(B-S')|_S'$ and $M_S'_ M|_S'$.
We have an induced morphism $f_S S'arrow S$
and we let $f_S_*(B_S')=B_S$ and $f_S_*(M_S')=M_S$.
Hence, we can consider the pair $(S/Z,B_S+M_S)$ as a generalized pair
with b-nef b-Cartier divisor $M_S'$.
The divisor $B_S$ is effective. The generalized pair $(S/Z,B_S+M_S)$ is generalized log canonical.
This is proved in~[Remark 4.8]BZ16.
0.05cm
~
Let $d$ be a natural number and let $$ be a set of nonegative rational numbers satisfying the DCC.
There is a set of nonegative rational numbers $$ satisfying the DCC, which only depends on $d$ and $$,
such that if
- $(X/Z,B+M)$ is generalized log canonical of dimension $d$,
- the coefficients of $B$ belong to $$,
- we can write $M'= _i M'_i$, where $M'_i$ are Cartier divisors nef over $Z$ with $_i $, and
- the generalized pair $(S/Z,B_S+M_S)$ is constructed as in Definition~[genadj],
then the coefficients of $B_S$ belong to $= (, d)$.
This is proved in~[Proposition 4.9]BZ16.
Let $$ be a set of nonegative rational numbers satisfying the DCC condition and $d _ 1$.
Then there is a set of nonegative rational numbers $$ satisfying the DCC condition,
which only depends on $d$ and $$, such that if
- $(Y/Z,B_Y+M_Y)$ is a generalized dlt pair of dimension $d$,
- the coefficients of $B_Y$ belong to $$,
- we can write $M'= _i M'_i$, where $M'_i$ are Cartier divisors nef over $Z$ with $_i $, and
- $V$ is a generalized log canonical center of $(Y/Z,B_Y+M_Y)$,
then we can write an adjunction formula
$$
(K_Y+B_Y+M_Y)|_V _ K_V+B_V+M_V,
$$
where $(V/Z,B_V+M_V)$ is a generalized dlt pair, the coefficients of $B_V$ belong to $$
and we can write $M'_V= _i M'_i,V$, where $M'_i,V$ are Cartier divisors and $_i $.
We proceed by induction on the codimension of the log canonical center.
If the log canonical center has codimension one, then this is Proposition~[divadj].
If the log canonical center $V$ has higher codimension, then $V$ is contained in some divisor $S$ which appears with coefficient one in $B$.
Therefore, by Proposition~[divadj] we can do a divisorial generalized adjunction to $S$.
We claim that $(S/Z,B_S+M_S)$ is generalized dlt and $V$ is a generalized non-klt center of this generalized pair.
Indeed, there is an open set $U X$ so that $U_S:=U S$ is smooth, $B_Y|_U_S$ has simple normal crossing,
all the generalized non-klt centers of $(S/Z,B_S+M_S)$ intersect $U_S$, and these centers are given by strata of $ B_S $.
In particular, $V$ is an intersection of a non-empty set of components of $ B_S $,
hence it is a generalized non-klt center.
Thus, by the induction hypothesis on the codimension, we can write an adjunction formula
$$
(K_S+B_S+M_S)|_V _ K_V+B_V+M_V,
$$
which induces an adjunction formula for $(Y/Z,B_Y+M_Y)$.
Observe that the set $$ of Lemma~[adjunction]
is
$$
(( ((,d),d-1),,2),1),
$$
where $$ is the set of Proposition~[divadj].
If $V$ is a minimal non-klt center of the generalized dlt pair $(Y,B_Y+M_Y)$,
then the induced generalized pair $(V,B_V+M_V)$ is generalized klt.
Let $: X X^+$ be a flip for a generalized $$-factorial dlt log pair $(X/Z,B+M)$. Assume that $V$ is a generalized non-klt center and $$ is an isomorphism at its generic point $ _V$ such that the induced map $ : V V^+=: _* V$ induces an isomorphism of generalized log pairs $(V/Z,B_V+M_V) (V^+/Z,B_V^++M_V^+)$ on an open subset $V^0 V$. Here
$$
K_V+B_V+M_V=(K_X+B+M)|_V and K_V^++B_V^++M_V^+=(K_X^++B^+ +M^+)|_V^+
$$
are induced by adjunction. Then $$ is an isomorphism on a neighborhood of $V^0$ in $X$.
Let $f:X W$ be the flipping contraction, $X'$ be the normalization of the main component of $X _Z X^+$ and $p:X' X$, $q:X' X^+$ the projections, then $p^*(K_X+B+M)=q^*(K_X^++B^++M^+)+E$ where $E 0$ and $ Supp (E)=p^-1( Ex(f))$.
The inclusion $$ is clear. Suppose that $x p^-1( Ex(f))$, and $F$ is a divisor with center $x$, then $a_F(X,B+M)<a_F(X^+,B^++M^+)$ (as $$ is a flip and the center of $F$ is contained in the flipping locus). On the other hand,
if $x$ is not contained in the support of $E$, then $p^*(K_X+B+M)=q^*(K_X++B^++M^+)$ in a neighborhood of $x X'$ and so $a_F(X,B+M)=a_F(X^+,B^++M^+)$. Therefore $x$ is contained in the support of $E$ as required.
Abusing notation, we also denote $p:V' V$ and $q:V' V^+$ where $V'$ is the strict transform of $V$ (note that $p:X' X$ is an isomorphism around the generic point of $V$).
We have $p^*(K_V+B_V+M_V)=q^*(K_V^++B_V^++M_V^+)+E|_V'$. If $$ is an isomorphism of log pairs on $V^0$, then
$E|_V' p^-1V^0=0$ so that $V^0 Ex(f)=$ and hence $$ is an isomorphism on a neighborhood of $V^0$.
# Weak Zariski decompositions and termination of flips
## WZD and termination of flips
Let $(Y/Z, B_Y+M_Y)$ be a $$-factorial dlt pair and
$$
@C=2em
(Y/Z,B_Y+M_Y)@-->[r]^-_1 & (Y_1/Z,B_Y_1+M_Y_1)@-->[r]^-_2 & (Y_2/Z,B_Y_2+M_Y_2) @-->[r]^-_3 &
$$
be a minimal model program which is an isomorphism at the generic point of a log canonical center $V$ of $(Y/Z,B_Y+M_Y)$.
Then, the induced sequence of birational maps (see [S-gad])
$$
@C=2em
(V/Z,B_V+M_V)@-->[r]^-_1 & (V_1/Z,B_V_1+M_V_1)@-->[r]^-_2 & (V_2/Z,B_V_2+M_V_2) @-->[r]^-_3 &
$$
is a sequence of ample quasi-flips or identities for the generalized dlt pair $(V/Z,B_V+M_V)$.
This is proved in~[Proposition 4.3]Mor18 for the divisorial generalized adjunction.
The general case follows by induction on the codimension of the log canonical center.
Consider a sequence of ample quasi-flips for a generalized klt pair.
Assume that the coefficients of the boundary divisors which appear
in this sequence belong to a set satisfying the DCC.
Then, the sequence of quasi-flips terminate in codimension one, i.e.,
after finitely many ample quasi-flips, all the quasi-flips are small.
This is proved in~[Lemma 4.26]Mor18.
If $V$ is a minimal non-klt center of $(Y/Z,B_Y+M_Y)$ not contained in any of the flipping loci, then
the sequence of birational transformations~([mmponV]) is eventually a sequence of isomorphisms and small ample quasi-flips
with a fixed boundary divisor and a common b-nef divisor.
Let $X X^+$ be a small ample quasi-flip over $W$ for generalized klt pairs $(X/Z,B+M)$ and $(X^+/Z,B^++M^+)$ with a fixed boundary divisor.
Let $(Y/Z,B_Y+M_Y)$ be a small $$-factorialization of $(X/Z,B+M)$.
Then there exists a sequence of $(Y/Z,B_Y+M_Y)$ flips $: Y Y^+$ over $W$, such that $(Y^+/Z,B_Y^++M_Y^+)$ is a $$-factorialization of $(X^+/Z,B^++M^+)$.
In particular a small ample quasi-flip for $$-factorial generalized klt pairs with a fixed boundary divisor can be factored in a sequence of flips.
Suppose that $ :X X^+$ is a small ample quasi-flip so that we have projective morphisms $ :X W$ and $^+:X^+ W$ over $Z$ such that $-(K_X+B+M)$ and $K_X^++B^++M^+$ are ample over $W$ and $B^+= _* B$.
By assumption $ :Y X$ is a small birational morphism, $Y$ is $$-factorial and $K_Y+B_Y+M_Y= ^*(K_X+B+M)$.
We now run a $K_Y+B_Y+M_Y$ minimal model program with scaling over $W$
which terminates by~[Lemma 4.4]BZ16. The output of this minimal model program is a good minimal model $(Y^+,B_Y^++M_Y^+)$ for $K_Y+B_Y+M_Y$ over $W$,
it has a projective birational morphism $ Y^+arrow X^+$ such that $K_Y^++B_Y^++M_Y^+=^*(K_X^++B^++M^+)$.
Note that $ Ex(Y Y^+)= ^-1 Ex(X X^+)$.
To see this note that since $X X^+$ is an ample quasi-flip, then $ Ex(X X^+)$ coincides with the set of points on $X$ that are centers for a divisor $E$ such that $a_E(X,B+M)<a_E(X^+,B^++M^+)$. Similarly since $Y Y^+$ is a sequence of flips, then $ Ex(Y Y^+)$ coincides with the set of points on $Y$ that are centers for a divisor $E$ such that $a_E(Y,B_Y+M_Y)<a_E(Y^+,B_Y^++M_Y^+)$. The claim now follows easily since $a_E(X,B+M)=a_E(Y,B_Y+M_Y)$ and $a_E(X^+,B^++M^+)=a_E(Y^+,B_Y^++M_Y^+)$ for any divisor $E$ over $X$.
The following lemma is a version of Fujino's special termination for dlt pairs in the context of generalized pairs (see, e.g.,~[Fuj07]).
With the notation of Lemma~[mmplcc]. Assume that a minimal model program for the generalized $$-factorial dlt pair $(Y/Z,B_Y+M_Y)$ is infinite.
Then, this minimal model program is eventually disjoint from the generalized non-klt locus of $(Y/Z,B_Y+M_Y)$ or
it induces an infinite sequence of flips for a generalized klt pair of dimension at most $n-1$.
Assume that the flipping loci of the minimal model program for $(Y/Z,B_Y+M_Y)$ intersect the generalized non-klt locus infinitely many times. Then there exists a generalized log canonical center which is not contained in any exceptional locus of the minimal model program and intersects the flipping loci infinitely many times. Let $V$ be a generalized log canonical center which is minimal with the above condition. By the minimality assumption, eventually the flipping loci only intersect the klt locus of $(V/Z,B_V+M_V)$. Since the generalized pair $(V/Z,B_V+M_V)$ is generalized dlt by Lemma~[adjunction], then by Lemma [l-qf] it has a generalized $$-factorialization $(V'/Z, B_V'+M_V')$ and $h:V' V$. By Lemma~[mmplcc], Corollary~[small], and Lemma~[fromqftoflip], we obtain an induced infinite sequence of flips for the generalized klt pair $(V'/Z,B_V'+M_V')$.
[Proof of Proposition~[dltmodification]]
Let $(X'/Z,B'+M')$ be a log resolution (given by a sequence of blow ups along smooth centers) of the generalized pair $(X/Z,B+M)$
and denote by $ X'arrow X$ the induced birational morphism.
Consider the generalized pair
$$
(X'/Z, + M'),
$$
where $= ^-1_*B+ Ex()$ is the effective divisor obtained from $B'$ by
setting the coefficients of all exceptional divisors over $X$ equal to one.
We claim that the diminished base locus of $K_X'++M'$ over $X$
contains all exceptional divisors over $X$ whose log discrepancy with respect to $(X/Z,B+M)$ is positive.
Indeed, we may write
$$
K_X'++M' = ^*(K_X+B+M)+E_1 - E_2,
$$
where $E_1$ (resp. $E_2$) is an effective divisor which is supported on the union of all exceptional divisors over $X$ whose
log discrepancy with respect to $(X/Z,B+M)$ is positive (resp. negative).
We can pick an ample divisor $A$ on $X$ and an effective divisor $F$, exceptional over $X$ and supported on $ Ex()$
so that $^*A- F$ is ample on $X'$ for $$ small enough.
For $>0$ arbitrary small the diminished base locus over $X$ of $K_X'++M'$ equals the stable base locus over $X$ of
$$
^*(K_X+B+M+ A) + E_1- F - E_2.
$$
Let $E$ be an effective divisor which is $$-linearly equivalent over $X$ to the $$-divisor from equation~([diminished-base-locus]).
We have that
$$
E-E_1+ F +E_2 _X, 0
$$
and the push-forward to $X$ of the above divisor is effective.
Then by the negativity lemma we have that
$$
E+E_2 E_1 - F.
$$
For $$ small enough, any prime divisor contained in the support of $E_1$
appears with positive coefficient in $E_1 - F$,
moreover since $E_2$ and $E_1$ have no common prime components,
we conclude that for $$ small enough the support of $E$ must contain the support of $E_1$, concluding the claim.
By~[4.4]BZ16, we may run a minimal model program with scaling of an ample divisor for $(X'/Z,+M')$ over $X$.
This minimal model program eventually contracts all divisors in the diminished stable base locus and hence all exceptional divisors over $X$
whose log discrepancy with respect to $(X/Z,B+M)$ is positive. Therefore we may assume that $E_1=0$ and thus eventually every flip is $-E_2$ negative and in particular intersects the support of $ B$.
Thus, this MMP terminates by Lemma~[lemma] and the lower dimensional termination of generalized flips.
The obtained minimal model over $X$ is a $$-factorial generalized dlt modification of $(X/Z,B+M)$.
[Proof of Theorem~[termination]]
Assume termination of flips for generalized klt pairs of dimension at most $n-1$.
First we prove the case in which $(X/Z,B+M)$ is $$-factorial generalized dlt.
Let $(X/Z,B+M)$ be a $$-factorial generalized dlt pair of dimension $n$ admitting a weak Zariski decomposition.
We proceed by contradiction. Let
$$
@C=2em
(X/Z,B+M)@-->[r]^-_1 & (X_1/Z,B_1+M_1)@-->[r]^-_2 & (X_2/Z,B_2+M_2) @-->[r]^-_3 &
@-->[r]^-_i & (X_i/Z,B_i+M_i)@-->[r]^-_i+1 &
$$
be an infinite minimal model program for $(X/Z,B+M)$.
We denote by $P_i$ and $N_i$ the push-forward
of the nef part and effective part of the weak Zariski decomposition induced by Lemma~[WZDpreserved]
on each generalized pair $(X_i/Z,B_i+M_i)$.
Truncating the above infinite minimal model program,
we may assume that all the steps are flips.
We claim that there exists a non-negative rational number $$, such that
the above sequence of generalized flips is a sequence of generalized flips for the generalized pair
$(X/Z,B+M+(P+N))$ which is eventually disjoint from every generalized non log canonical center
of $(X/Z,B+M+(P+N))$ and there exists a generalized log canonical center of $(X/Z,B+M+(P+N))$
which is intersected by infinitely many generalized flips, but is never contained in the flipping loci.
Indeed, let
$$
_0 := glct((X/Z,B+M) N+P).
$$
If all generalized flips are eventually disjoint from the generalized log canonical centers
of $(X_i/Z,B_i+M_i+_0 (N_i+P_i))$, then we define $_1$ to be the log canonical threshold
of $(X_i/Z,B_i+M_i)$ with respect to $N_i+P_i$ on the complement of such generalized log canonical centers.
Proceeding inductively, we create an increasing sequence of generalized log canonical thresholds,
which must stop by the ACC for glct's~[Theorem 1.5]BZ16.
Hence, eventually we find $$ as required.
Observe that by Lemma~[finiteness] we may assume that $$ is always finite. If this were not the case, then there is an open subset $U_i X_i$ containing all the flipping loci such that $(K_X_i+B_i+M_i)|_U_i _ (N_i+P_i)|_U_i$ where $N_i|_U_i=0$, $P_i|_U_i$ is nef over $W_i$ and $X_i W_i$ is the flipping contraction. But then the flipping contraction $X_i W_i$ is $K_X_i+B_i+M_i$ trivial, which is impossible.
Up to reindexing our sequence we have an infinite sequence of generalized flips
$$
@C=1em
(X/Z,B+M+(P+N))@-->[rr]^-_1[rd] & & (X_1/Z,B_1+M_1+(P_1+N_1))@-->[r]^-_2[ld] [rd]& &
& W & & W_1 &
$$
for the generalized pair $(X/Z,B+M+(P+N))$ such that all generalized flips are disjoint from the generalized
non-log canonical centers of $(X/Z,B+M+(P+N))$ and there exists a generalized log canonical center
of $(X/Z,B+M+(P+N))$ which intersects non-trivially infinitely many flipping loci.
If $=0$, then we obtain a contradiction by Lemma~[lemma].
Assume that $>0$ and let
$(Y/Z,B_Y+M_Y+(P_Y+N_Y))$ be a $$-factorial dlt modification of $(X/Z,B+M+(P+N))$ given by Lemma~[dltmodification].
Here, $M_Y$ (resp. $P_Y$) are the trace of the corresponding b-divisors,
$ N_Y$ is the strict transform of $ N$,
and $B_Y$ is the strict transform of $B$ plus the reduced exceptional divisor.
Note that the divisor $K_Y+B_Y+M_Y+(P_Y+N_Y)$ is anti-nef over $W$.
This statement follows from the proof of Lemma~[dltmodification].
We denote the morphism of this $$-factorial dlt modification by $ Y arrow X$.
We claim that $Y$ is of Fano type over a neighborhood $U$ of the image on $W$ of the flipping locus.
Indeed, observe that for $0<' < $ the generalized pair
$(X/Z,B+M+'(P+N))$ is generalized klt on a neighborhood of the flipping locus of $Xarrow W$
and anti-ample over $W$.
We conclude by~[2.10]Bir17 that $Y$ is of Fano type over an open set $U$ on $W$ which contains the image of the flipping locus.
In particular, we can run a minimal model program for any divisor on $Y$ over $U$ which will terminate with a minimal model.
Now, we run a minimal model program for
$(Y/Z,B_Y+M_Y+(P_Y+N_Y))$ over such neighborhood
which terminates with a minimal model.
Observe that the generalized non-log canonical locus of $(Y/Z,B_Y+M_Y+(P_Y+N_Y))$
is disjoint from the diminished base locus of $K_Y+B_Y+M_Y+(P_Y+N_Y)$ over $W$.
We conclude that such minimal model program is also a minimal model program
for $(Y/Z,B_Y+M_Y+(P_Y+N_Y))$ over $W$ which terminates with a good minimal model
$(Y_1/Z,B_Y_1+M_Y_1+(P_Y_1+N_Y_1))$ over $W$,
and its ample model is $(X_1/Z,B_1+M_1+(P_1+N_1))$.
Proceeding inductively, we obtain an infinite sequence of generalized dlt flips for
$$-factorial generalized pairs
$$
@C=1em
(Y/Z,B_Y+M_Y+(P_Y+N_Y))@-->[rr]^-_Y,1[d]^- & & (Y_1/Z,B_Y_1+M_Y_1+(P_Y_1+N_Y_1))@-->[r]^-_Y,2[d]^-_1 [r]&
(X/Z,B+M+(P+N))@-->[rr]^-_1[rd] & & (X_1/Z,B_1+M_1+(P_1+N_1))@-->[r]^-_2[ld] [rd]&
& W & & W_1 &
$$
Moreover, every such generalized flip is disjoint from the prime divisors which appear with coefficient larger than one in $B_Y+ N_Y$.
For simplicity, we will write $B'_Y := (B_Y+ N_Y)^ 1 = (B_Y+ N_Y) Supp(B_Y+ N_Y)$
and use the analogous notation for all $Y_i$.
We obtain an infinite sequence of generalized flips for the $$-factorial dlt pairs
$$
@C=1em
(Y/Z,B'_Y+M_Y+ N_Y)@-->[rr]^-_Y,1 & & (Y_1/Z,B'_Y_1+M_Y_1+ N_Y_1)@-->[r]^-_Y,2 [r]&
$$
Since $(X/Z,B+M+(P+N))$ has a generalized log canonical center which is intersected non-trivially by
infinitely many flipping loci, we conclude that $(Y/Z,B'_Y+M_Y+ N_Y)$ has a generalized log canonical
center which is intersected non-trivially by infinitely many flipping loci.
This is impossible by Lemma~[lemma].
Now, we prove the general case.
Let
$$
@C=2em
(X/Z,B+M)@-->[r]^-_1 & (X_1/Z,B_1+M_1)@-->[r]^-_2 & (X_2/Z,B_2+M_2) @-->[r]^-_3 &
@-->[r]^-_i & (X_i/Z,B_i+M_i)@-->[r]^-_i+1 &
$$
be an infinite minimal model program for the generalized log canonical pair $(X/Z,B+M)$.
By Lemma~[dltmodification] we can take a dlt modification
$(Y/Z,B_Y+M_Y)$ of $(X/Z,B+M)$.
By Lemma~[mmpdltmodel], we can run a minimal model program for
the $$-factorial generalized dlt pair $(Y/Z,B_Y+M_Y)$ with scaling of a general ample divisor over $W$.
Observe that $(Y/Z,B_Y+M_Y)$ is big over $W$, since the morphism is birational,
hence it has a weak Zariski decomposition over $Z$.
Thus, all the conditions of the $$-factorial dlt case hold,
and hence this minimal model program terminates with a minimal model $(Y_1/Z,B_Y_1+M_Y_1)$.
Proceeding analogously with the other steps of the minimal model program,
we obtain an infinite minimal model program for $$-factorial generalized dlt pairs,
$$
@C=2em
(Y/Z,B_Y+M_Y)@-->[r]^-_1 & (Y_1/Z,B_Y_1+M_Y_1)@-->[r]^-_2 &
$$
We claim that $(Y/Z,B_Y+M_Y)$ has a weak Zariski decomposition over $Z$.
Indeed, $(X/Z,B+M)$ has a weak Zariski decomposition over $Z$, so there exists a projective birational morphism
$f X'arrow X$, and a numerical equivalence
$$
f^*(K_X+B+M)_Z P'+N',
$$
where $P'$ is a $$-Cartier divisor which is nef over $Z$, and $N'$ is an effective $$-Cartier divisor.
Without loss of generality, we may assume that $X'$ dominates $Y$ with a morphism $f_Y X'arrow Y$.
Since $^*(K_X+B+M)=K_Y+B_Y+M_Y$, we conclude that
$$
f_Y^*(K_Y+B_Y+M_Y)_Z P'+N',
$$
so $(Y/Z,B_Y+M_Y)$ has a weak Zariski decomposition as well.
Hence, all the conditions of the $$-factorial dlt case hold.
Thus, this minimal model program must terminate by the $$-factorial dlt case again.
[Proof of Theorem~[genwzd]]
We proceed by induction on the dimension.
Let $(X/Z,B+M)$ be a generalized pair. Throughout this proof we will work over $Z$. Assume that $K_X+B+M$ is a $$-Cartier pseudo-effective (over $Z$) divisor. Passing to a dlt modification, we may assume that $(X,B+M)$ is $$-factorial generalized dlt and in particular $(X,0)$ is klt.
If $K_X+B$ is pseudo-effective, then by assumption there exists a birational morphism $f X'arrow X$, such that $f^*(K_X+B)=P'+N'$ where $P'$ is nef and $N'$ is effective,
and $f^*M=M'+E$, where $M'$ is nef and $E$ is effective. Thus, we may write
$$
f^*(K_X+B+M) = (P'+M') + (N'+E).
$$
Therefore, we may assume that $K_X+B$ is not pseudo-effective and $K_X+B+M$ is a $$-Cartier pseudo-effective divisor.
We will follow the arguments of~[Gong15].
Notice that the pseudo-effective threshold $$ for $K_X+B$ with respect to $M$ is rational.
This follows from the proof of~[Proposition 8.7]DHP13 where~[Conjecture 8.2]DHP13 is replaced by~[Theorem 1.6]BZ16.
Replacing $M$ with $ M$ we may assume that $K_X+B+(1-)M$ is not pseudo-effective for $0< 1$.
By the proof of~[Proposition 8.7]DHP13 (see~[Lemma 3.1]Gong15 and~[ 4]BZ16) there exists a birational contraction
$ X X_0$ and a projective morphism $f_0 X_0 arrow Z_0$ where $(X_0,B_0+M_0)$ is generalized log canonical,
$(X_0)>(Z_0),$ $ (X_0/Z_0)=1$, $K_X_0+B_0+M_0 _Z_0 0,$ and $M_0$ is ample over $Z_0$.
Passing to a higher model we may assume that $$ and $_0 = f_0 $ are morphisms.
We claim that $K_X+B+M$ admits a a weak Zariski decomposition over $Z_0$.
Note that the numerical Kodaira dimension of the restriction of $K_X+B+M$ to the general fiber $F$ of $_0$ is zero.
To see this notice that as $K_X+B+M$ is pseudo-effective, so is $(K_X+B+M)|_F$. On the other hand it is easy to see that $ _ ((K_X+B+M)|_F) _ ((K_X_0+B_0+M_0)|_F_0)=0$. Here $F_0= (F)$ and $ _F= |_F$.
By~[Nak04], we know that
$$
(K_X+B+M)|_F N_( (K_X+B+M)|_F) 0,
$$
where $N_$ is defined as in~[Chapter 3, 1.12]Nak04.
Note that $$(K_X+B+M)|_F - _F^*((K_X_0+B_0+M_0)|_F_0)- N_( (K_X+B+M)|_F) _F_00$$ is $ _F$-exceptional and so
by the negativity lemma, $$(K_X+B+M)|_F= _F^*(K_X_0+B_0+M_0)|_F_0+N_( (K_X+B+M)|_F),$$ and in particular $N_( (K_X+B+M)|_F)$
is an effective $$-divisor.
If $(Z_0)=0$, then the above equation gives us the required weak Zariski decomposition. Otherwise, we may assume that $(Z_0)>0$ and that $K_X+B+M _ ,Z_0 N$ for some effective $$-divisor $N$.
This proves the claim.
We may now run a minimal model program with scaling of a general ample divisor over $Z_0$ for the $$-factorial generalized dlt pair $(X,B+M)$ as in~[ 4]BZ16.
By Theorem~[termination] this minimal model program terminates with a minimal model $(X_1,B_1+M_1)$ over $Z_0$. Since $(X,(1-)B+M)$ is generalized klt for $ >0$ and every step of the $K_X+B+M$ MMP is a step of the $K_X+(1-)B+M$ for $0< 1$, it follows that $(X_1,(1-)B_1+M_1)$ is generalized klt for $0< 1$
and hence $(X_1,0)$ is klt. It also follows that $K_X_1+B_1+(1-)M_1$ is not pseudo-effective over $Z_0$ for any $ >0$.
We claim that for $>0$ small enough, we may run a minimal model program for $K_X_1+B_1+(1-)M_1$ with scaling of an ample divisor over $Z_0$ such that all steps of this MMP are $(K_X_1+B_1+M_1)$-trivial. Pick $r N$ such that $r(K_X_1+B_1+M_1)$ is Cartier and choose a rational number $0<< 12r(X) $. We will prove that the first step of this minimal model program is a flop and all the relevant conditions are preserved. Indeed, observe that such a step of the minimal model program must be $(K_X_1+B_1)$-negative, hence by~[Kaw91] we have that
$$
0 < -(K_X_1+B_1) C 2(X)
$$
for some curve $C$ spanning the corresponding extremal ray.
If $(K_X_1+B_1+M_1) C >0$, then $(K_X_1+B_1+M_1) C 1/r$ by the assumption on the Cartier index,
so we deduce that $(K_X_1+B_1+(1-)M_1) C>0$, leading to a contradiction.
Since $K_X_1+B_1+M_1$ is nef, we deduce that the above flip must be trivial with respect to this generalized pair.
Finally, observe that the nefness and the Cartier index of $K_X_1+B_1+M_1$ are preserved in this minimal model program which terminates with a Mori fiber space by~[BCHM].
Therefore, we obtain a $(K_X_1+B_1+M_1)$-trivial birational contraction $ X_1 X_2$, and a $(K_X_1+B_1+M_1)$-trivial fiber space $_2 X_2arrow Z_1$ over $Z_0$
which is a Mori-fiber space for $(X_2, B_2+(1-)M_2)$. In particular $M_2$ is ample over $Z_1$ and $K_X_2+B_2+M_2 _,Z_10$.
Since $X X_2$ is $K_X+B+M$ non positive, it suffices now to prove that $K_X_2+B_2+M_2$ has a weak Zariski decomposition.
By~[Theorem 1.4]Fil18, there exists a generalized log canonical pair $(Z_1, B_Z_1+M_Z_1)$ such that
$$
_2^*(K_Z_1+B_Z_1+M_Z_1)= K_X_2+B_2+M_2.
$$
By induction on the dimension, we may assume that $(Z_1,B_Z_1+M_Z_1)$ has a weak Zariski decomposition	say $h Z_2arrow Z_1$
with
$$
h^*( K_Z_1+B_Z_1+M_Z_1) P_Z_2+N_Z_2,
$$
where $P_Z_2$ is nef and $N_Z_2$ is effective.
Let $ X_3 arrow X_2$ be the normalization of the main component of $X_2_Z_1 Z_2$
and write $K_X_3+B_3+M_3=^*(K_X_2+B_2+M_2)$ where $(X_3,B_3+M_3)$ is the corresponding generalized pair.
Let $ _3: X_3 Z_2$ be the induced morphism.
We have
$$
K_X_3+B_3+M_3 = ^*_2^*( K_Z_1+B_Z_1+M_Z_1) _3^*(P_Z_2+N_Z_2) = _3^*P_Z_2+_3^*N_Z_2
$$
which is the desired weak Zariski decomposition.
[Proof of Corollary~[4-fold-generalized-termination]]
It is known that every pseudo-effective log canonical $4$-fold has a minimal model (see, e.g.~[Shok09]),
hence every pseudo-effective log canonical $4$-fold has a weak Zariski decomposition.
Moroever, the termination of generalized $3$-fold flips is proved in~[ 4]Mor18.
Hence, by Theorem~[genwzd] we conclude that every pseudo-effective generalized log canonical $4$-fold
has a weak Zariski decomposition.
Thus, by Theorem~[termination] we conclude that any minimal model program for a pseudo-effective
generalized log canonical $4$-fold $(X/Z,B+M)$ terminates.
12article
AUTHOR = Alexeev, Valery,
AUTHOR=Hacon, Christopher D.,
TITLE = Non-rational centers of log canonical singularities,
JOURNAL = J. Algebra,
FJOURNAL = Journal of Algebra,
VOLUME = 369,
YEAR = 2012,
PAGES = 1--15,
ISSN = 0021-8693,
MRNUMBER = 2959783,
07article
author=Birkar, Caucher,
title=Ascending chain condition for log canonical thresholds and
termination of flips,
journal=Duke Math. J.,
volume=136,
date=2007,
number=1,
pages=173--180,
issn=0012-7094,
review=2271298,
10article
author=Birkar, Caucher,
title=On existence of log minimal models,
journal=Compos. Math.,
volume=146,
date=2010,
number=4,
pages=919--928,
issn=0010-437X,
review=2660678,
doi=10.1112/S0010437X09004564,
11article
author=Birkar, Caucher,
title=On existence of log minimal models II,
journal=J. Reine Angew. Math.,
volume=658,
date=2011,
pages=99--113,
issn=0075-4102,
review=2831514,
doi=10.1515/CRELLE.2011.062,
12aarticle
author=Birkar, Caucher,
title=On existence of log minimal models and weak Zariski
decompositions,
journal=Math. Ann.,
volume=354,
date=2012,
number=2,
pages=787--799,
issn=0025-5831,
review=2965261,
doi=10.1007/s00208-011-0756-y,
12barticle
author=Birkar, Caucher,
title=Existence of log canonical flips and a special LMMP,
journal=Publ. Math. Inst. Hautes \'Etudes Sci.,
volume=115,
date=2012,
pages=325--368,
issn=0073-8301,
review=2929730,
doi=10.1007/s10240-012-0039-5,
17misc
author = Birkar, Caucher,
title=Anti-pluricanonical systems on Fano varieties,
year = 2017,
note = https://arxiv.org/abs/1603.05765,
14article
author=Birkar, Caucher,
author=Hu, Zhengyu,
title=Polarized pairs, log minimal models, and Zariski decompositions,
journal=Nagoya Math. J.,
volume=215,
date=2014,
pages=203--224,
issn=0027-7630,
review=3263528,
doi=10.1215/00277630-2781096,
author=Birkar, Caucher,
author=Cascini, Paolo,
author=Hacon, Christopher D.,
author=McKernan, James,
title=Existence of minimal models for varieties of log general type,
journal=J. Amer. Math. Soc.,
volume=23,
date=2010,
number=2,
pages=405--468,
issn=0894-0347,
review=2601039,
16article
author=Birkar, Caucher,
author=Zhang, De-Qi,
title=Effectivity of Iitaka fibrations and pluricanonical systems of
polarized pairs,
journal=Publ. Math. Inst. Hautes \'Etudes Sci.,
volume=123,
date=2016,
pages=283--331,
issn=0073-8301,
review=3502099,
07collection
title=Flips for 3-folds and 4-folds,
series=Oxford Lecture Series in Mathematics and its Applications,
volume=35,
editor=Corti, Alessio,
publisher=Oxford University Press, Oxford,
date=2007,
pages=x+189,
isbn=978-0-19-857061-5,
review=2352762,
13article
author=Demailly, Jean-Pierre,
author=Hacon, Christopher D.,
author=P aun, Mihai,
title=Extension theorems, non-vanishing and the existence of good
minimal models,
journal=Acta Math.,
volume=210,
date=2013,
number=2,
pages=203--259,
issn=0001-5962,
review=3070567,
doi=10.1007/s11511-013-0094-x,
18misc
author = Filipazzi, Stefano,
title=On a generalized canonical bundle formula and generalized adjunction,
year = 2018,
note = https://arxiv.org/abs/1807.04847,
79article
author=Fujita, Takao,
title=On Zariski problem,
journal=Proc. Japan Acad. Ser. A Math. Sci.,
volume=55,
date=1979,
number=3,
pages=106--110,
issn=0386-2194,
review=531454,
86article
author=Fujita, Takao,
title=Zariski decomposition and canonical rings of elliptic threefolds,
journal=J. Math. Soc. Japan,
volume=38,
date=1986,
number=1,
pages=19--37,
issn=0025-5645,
review=816221,
doi=10.2969/jmsj/03810019,
07article
author=Fujino, Osamu,
title=Special termination and reduction to pl flips,
conference=
title=Flips for 3-folds and 4-folds,
,
book=
series=Oxford Lecture Ser. Math. Appl.,
volume=35,
publisher=Oxford Univ. Press, Oxford,
,
date=2007,
pages=63--75,
review=2359342,
15article
author=Gongyo, Yoshinori,
title=Remarks on the non-vanishing conjecture,
conference=
title=Algebraic geometry in east Asia---Taipei 2011,
,
book=
series=Adv. Stud. Pure Math.,
volume=65,
publisher=Math. Soc. Japan, Tokyo,
,
date=2015,
pages=107--116,
review=3380777,
14article
author=Hacon, Christopher D.,
author=McKernan, James,
author=Xu, Chenyang,
title=ACC for log canonical thresholds,
journal=Ann. of Math. (2),
volume=180,
date=2014,
number=2,
pages=523--571,
issn=0003-486X,
review=3224718,
10book
author=Hacon, Christopher D.,
author=Kov\'acs, S\'andor J.,
title=Classification of higher dimensional algebraic varieties,
series=Oberwolfach Seminars,
volume=41,
publisher=Birkh\"auser Verlag, Basel,
date=2010,
pages=x+208,
isbn=978-3-0346-0289-1,
review=2675555,
18article
author=Han, Jingjun,
author=Li, Zhan,
title=Weak Zariski decompositions and log minimal
models for generalized polarized pairs,
journal=Preprint,
date=2018,
91article
author=Kawamata, Yujiro,
title=On the length of an extremal rational curve,
journal=Invent. Math.,
volume=105,
date=1991,
number=3,
pages=609--611,
issn=0020-9910,
review=1117153,
doi=10.1007/BF01232281,
10article
author=Koll\'ar, J\'anos,
author=Kov\'acs, S\'andor J.,
title=Log canonical singularities are Du Bois,
journal=J. Amer. Math. Soc.,
volume=23,
date=2010,
number=3,
pages=791--813,
issn=0894-0347,
review=2629988,
98book
author=Koll\'ar, J\'anos,
author=Mori, Shigefumi,
title=Birational geometry of algebraic varieties,
series=Cambridge Tracts in Mathematics,
volume=134,
note=With the collaboration of C. H. Clemens and A. Corti;
Translated from the 1998 Japanese original,
publisher=Cambridge University Press, Cambridge,
date=1998,
pages=viii+254,
isbn=0-521-63277-3,
review=1658959,
doi=10.1017/CBO9780511662560,
14article
author=Lesieutre, John,
title=The diminished base locus is not always closed,
journal=Compos. Math.,
volume=150,
date=2014,
number=10,
pages=1729--1741,
issn=0010-437X,
review=3269465,
doi=10.1112/S0010437X14007544,
18misc
author = Moraga, Joaqu\'in,
title=Termination of pseudo-effective 4-fold flips,
year = 2018,
note = https://arxiv.org/abs/1802.10202,
04book
author=Nakayama, Noboru,
title=Zariski-decomposition and abundance,
series=MSJ Memoirs,
volume=14,
publisher=Mathematical Society of Japan, Tokyo,
date=2004,
pages=xiv+277,
isbn=4-931469-31-0,
review=2104208,
04article
author=Prokhorov, Yu. G.,
title=On the Zariski decomposition problem,
language=Russian, with Russian summary,
journal=Tr. Mat. Inst. Steklova,
volume=240,
date=2003,
number=Biratsion. Geom. Line n. Sist. Konechno Porozhdennye Algebry,
pages=43--72,
issn=0371-9685,
translation=
journal=Proc. Steklov Inst. Math.,
date=2003,
number=1(240),
pages=37--65,
issn=0081-5438,
,
review=1993748,
04article
author=Shokurov, V. V.,
title=Letters of a bi-rationalist. V. Minimal log discrepancies and
termination of log flips,
language=Russian, with Russian summary,
journal=Tr. Mat. Inst. Steklova,
volume=246,
date=2004,
number=Algebr. Geom. Metody, Svyazi i Prilozh.,
pages=328--351,
issn=0371-9685,
translation=
journal=Proc. Steklov Inst. Math.,
date=2004,
number=3(246),
pages=315--336,
issn=0081-5438,
,
review=2101303,
09article
author=Shokurov, V. V.,
title=Letters of a bi-rationalist. VII. Ordered termination.,
language=Russian, with Russian summary,
journal=Tr. Mat. Inst. Steklova,
volume=264,
date=2009,
number=Mnogomernaya Algebraicheskaya Geometriya,
pages=184--208,
issn=0371-9685,
review=2590847,
62article
author=Zariski, Oscar,
title=The theorem of Riemann-Roch for high multiples of an effective
divisor on an algebraic surface,
journal=Ann. of Math. (2),
volume=76,
date=1962,
pages=560--615,
issn=0003-486X,
review=0141668,
doi=10.2307/1970376,