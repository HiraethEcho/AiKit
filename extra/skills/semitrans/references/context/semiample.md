-ampleness of generalized pairs
Liu and Lingyao Xie
of Mathematics, Northwestern University, 2033 Sheridan Rd, Evanston, IL 60208, USA
@northwestern.edu
of Mathematics, The University of Utah, Salt Lake City, UT 84112, USA
@math.utah.edu
[2020]14E30,14C20.14E05,14J17
[2020]14E30,14C20.14E05
We establish a Koll\'ar-type gluing theory for generalized log canonical pairs associated with crepant log structures and use it to prove semi-ampleness results of generalized pairs. As consequences, we prove the existence of flips for any generalized log canonical pair, and show that generalized log canonical singularities are Du Bois.
# Introduction
We work over the field of complex numbers $ C$.
The theory of generalized pairs (g-pairs for short) is a central topic in modern day birational geometry. Introduced by Birkar and Zhang in [BZ16] in the study of effective Iitaka fibrations, this theory is known to be useful in many aspects of birational geometry, such as the proof of the Borisov-Alexeev-Borisov conjecture [Bir19,Bir21a], the theory of complements [Bir19,Sho20], the connectedness principles [Bir20,FS20], non-vanishing theorems [LPMTX22], etc. We refer the reader to [Bir21b] for a survey on the theory of g-pairs.
An important part of the study of g-pairs is their minimal model program. The foundations of the minimal model program for gklt g-pairs and $ Q$-factorial gdlt g-pairs were established in [BZ16,HL22]. Recently, there is some progress towards the minimal model program theory for glc g-pairs. In particular, in [HL21a], the authors proved the cone theorem, contraction theorem, and the existence of flips for $$-factorial glc g-pairs. For other related works, we refer the reader to [Has20b,LT21,Has22,LX22]. These results almost complete the foundation of the minimal model program for glc g-pairs, or for g-pairs admitting an lc structure on the ambient variety.
In this paper, we focus on the last part of the minimal model program for generalized pairs: the class of possibly non-$ Q$-factorial g-pairs. The main theorem of this paper is the following:
Let $(X,B,)/Z$ be a glc g-pair and $A 0$ an $$-divisor on $X$, such that $(X,B+A,)$ is glc and $K_X+B+A+_X_,Z0$. Then:
- $(X,B,)/Z$ has a Mori fiber space or a log minimal model $(Y,B_Y,)/Z$.
- If $K_Y+B_Y+_Y$ is nef$/Z$, then it is semi-ample$/Z$.
- If $(X,B,)$ is $$-factorial gdlt, then any $(K_X+B+_X)$-MMP$/Z$ with scaling of an ample$/Z$ $$-divisor terminates.
Theorem [thm: gmm exists for g-crepant log structure] fully generalizes [Theorem 1.1]Bir12(see also [Theorem 1.6]HX13, [Theorem 1.1]Has19) to the category of g-pairs. We remark that the authors proved Theorem [thm: gmm exists for g-crepant log structure](1)(3) in [Theorem 1.3]LX22 while Theorem [thm: gmm exists for g-crepant log structure] completes the missing part (2). Finding this last missing piece is very important, as it allows us to deduce the existence of flips for glc g-pairs in full generality.
Let $(X,B,)/U$ be a glc g-pair and $f:X Z$ is a $(K_X+B+_X)$-flipping contraction$/U$. Then the flip $X^+ Z$ of $f$ exists.
Theorem [thm: glc flip exists] removes the $ R$-Cartier condition of $_X$ as in [Theorem 1.2]HL21a, hence gives a complete solution of [Conjecture 3.12]HL22. We remark that the proof of Theorem [thm: glc flip exists] is quite different from the proof of [Theorem 1.2]HL21a. Indeed, the proof of Theorem [thm: glc flip exists] gives an alternative proof of [Theorem 1.2]HL21a.
The next result is the g-pair version of [Theorem 1.1]HX13(see also [Theorem 1.4]Bir12, [Theorem 1.1]Has19) in full generality.
Let $(X,B,)/U$ be a glc g-pair and $U^0 U$ a non-empty open subset. Let $X^0:=X_UU^0$, $B^0:=B_UU^0$, and $^0:=_UU^0$. Assume that
- $(X^0,B^0,^0)/U^0$ has a good minimal model, and
- any glc center of $(X,B,)$ intersects $X^0$.
Then $(X,B,)/U$ has a good minimal model.
We remark that [Theorem 1.1]HL21a proves Theorem [thm: gmm over U0 implies gmm over U] under the additional assumption that $^0_X^0_ R,U^00$. The proof of Theorem [thm: gmm over U0 implies gmm over U] is quite different from the proof of [Theorem 1.1]HL21a as well. Indeed, the proof of Theorem [thm: gmm over U0 implies gmm over U] also provides an alternative proof of [Theorem 1.1]HL21a.
When $=0$, Theorem [thm: gmm over U0 implies gmm over U] is closely related to the properness of the moduli functor of stable schemes. Unfortunately, it seems difficult for us to apply Theorem [thm: gmm over U0 implies gmm over U] in a similar way in the study of the moduli of g-pairs. In general, it is not clear if we can extend a glc structure on $X^0$ over $U^0$ to a glc structure on a compactification $X$ of $X^0$ over a compactification $U$ of $U^0$. This is mainly because a nef$/U^0$ divisor on $X^0$ usually does not extend to a nef divisor$/U$ on $X$. In fact, many properties for pairs in families do not hold for g-pairs anymore, see [BH22] for examples where the theory of g-pairs presents extreme complications.
The following result, which fully generalizes [Theorem 1.5]Bir12 to the category of g-pairs, is also important to the proofs of Theorems [thm: gmm exists for g-crepant log structure], [thm: glc flip exists], and [thm: gmm over U0 implies gmm over U]. It is interesting to see that, although the finite generation of the generalized log canonical ring usually fails, it is still useful in the minimal model program for generalized pairs.
Let $(X,B,)/U$ be a $$-factorial gdlt $$-g-pair such that $f: X U$ is surjective. Let $U^0$ be a non-empty open set of $U$ and $X^0:=X_U U^0$. Assume that
- $R(X/U,K_X+B+_X)$ is a finitely
generated $_U$-algebra, and
- $(K_X+B+_X)|_X^0$ is semi-ample over $U^0$.
Then $(X,B,)/U$ has a good minimal model. Moreover, any sequence of $(K_X+B+_X)$-MMP$/U$ terminates with a good minimal model of $(X,B,)/U$.
The key idea in the proofs of Theorems [thm: gmm exists for g-crepant log structure], [thm: glc flip exists], and [thm: gmm over U0 implies gmm over U] is a Koll\'ar-type gluing theory which we will establish in Section [sec: gluing], combined with the minimal model program for special g-pairs as in [LX22] (see also [Has22]). As an important application of independent interest, we show that glc singularities are Du Bois. This is a generalization of [Theorem 1.4]KK10 to the category of generalized pairs, and will allow us to construct many Du Bois singularities without any log canonical structure (cf. Example [ex: glc not lc]).
Let $(X,B,)$ be a glc g-pair. Then any union of glc centers of $(X,B,)$ is Du Bois. In particular, $X$ is Du Bois.
We expect the theorems above to have important applications in future studies of g-pairs. We state a few of them here. The first one is the extractability of non-canonical places of glc g-pairs:
Let $(X,B,)$ be a glc g-pair, and $E$ a prime divisor that is exceptional over $X$ such that $a(E,X,B,) [0,1)$. Then there exists a birational morphism $f: Z X$ which extracts $E$ such that $-E$ is ample over $X$.
We show the finite generation of the ring for any integral divisor which avoids glc centers:
Let $(X,B,)$ be a glc g-pair, and $D$ an integral divisor on $X$, such that $ D$ does not contain any glc center of $(X,B,)$. Then $R(X,D)$ is a finitely generated $_X$-algebra.
When proving the theorems above, we get some counter-examples to some expected properties of g-pairs. We will summarize them in Section [sec: ideas]. We hope they will be useful in future studies of generalized pairs.
Finally, we recall the following question:
Let $(X,B,)/U$ be a glc g-pair and $L$ a nef$/U$ Cartier divisor on $X$ such that $L-(K_X+B+_X)$ is ample$/U$. Do we have the following?
- $mL$ is base-point-free$/U$ for any integer $m 0$.
- $L$ is semi-ample$/U$.
- If $L$ is a supporting function of a $(K_X+B+_X)$-negative extremal ray$/U$, then $mL$ is base-point-free$/U$ for any integer $m 0$.
- If $L$ is a supporting function of a $(K_X+B+_X)$-negative extremal ray$/U$, then $L$ is semi-ample$/U$.
Of course, (1) implies (2) and (3), and (2) or (3) implies (4).
When $_X$ is $ R$-Cartier, Question [ques: bpf conjecture gpair](3) is true by [Theorem 1.3]HL21a and Question [ques: bpf conjecture gpair](2) is true by [Theorem 1.2]LX22. Indeed, in this case, Question [ques: bpf conjecture gpair](1) is also true as it is an easy consequence of [Lemma 5.18]HL21a (see Theorem [thm: bpf with mx r cartier]). However, we do not know Question [ques: bpf conjecture gpair] in general when $_X$ is not $ R$-Cartier. As the existence of glc flips is completely solved by Theorem [thm: glc flip exists], a positive answer of Question [ques: bpf conjecture gpair], even only for Question [ques: bpf conjecture gpair](4), will allow us to run non-$ Q$-factorial minimal model programs for glc g-pairs.
of the paper. In Section [sec: ideas], we summarize our ideas of the proofs of the main theorems and provide some examples of g-pairs satisfying special properties. In Section [sec: preliminaries], we introduce some preliminary results that will be used in the rest of the paper. In Section [sec: gluing], we establish a Koll\'ar-type gluing theory for glc crepant log structures. In Section [sec: key theorem], we prove the key theorem Theorem [thm: semi-ample over U0 implies semi-ample over U]. In Section [sec: DB singularity] we explore some Du Bois properties coming from glc crepant log structures and prove Theorem [thm: of glc origin implies DB]. In Section [sec: proof of the main theorems], we use Theorem [thm: semi-ample over U0 implies semi-ample over U] and Theorem [thm: of glc origin implies DB] to prove our main theorems.
. The authors would like to thank their advisor Christopher D. Hacon for useful discussions and constant support. They would like to thank Jingjun Han, Yuchen Liu, and Chenyang Xu for useful discussions. The second author is partially supported by NSF research grants no: DMS-1801851, DMS-1952522 and by a grant from the Simons Foundation; Award Number: 256202.
# Idea of the proof of Theorem [thm: gmm exists for g-crepant log structure] and some examples
There are several natural approaches to prove the main results in this paper, however the nuances of glc pairs seem to pose some serious difficulties. Before giving our proof, we introduce three of these approaches and explain the essential difficulties. We hope that our examples will illustrate some of the subtleties of working with glc pairs.
We first recall the key ideas in related works [HL21a,LX22]. A key observation in [HL21a] indicates that, for any glc g-pair $(X,B,)/U$ such that $_X$ is $ R$-Cartier, any twist of $(X,B,)/U$ with any ample$/U$ $ R$-divisor will induce an lc structure on $X$ (cf. [Lemma 5.18]HL21a). Actually, this observation leads to the proof of Theorem [thm: glc flip exists] when $_X$ is $ R$-Cartier [Theorem 1.2]HL21a.
1. Try to get an lc structure on $X$.
However, when dealing with non-$ Q$-factorial glc g-pairs, one cannot expect the existence of an lc structure on $X$ due to the following example:
Let $S$ be a projective lc variety such that $-K_S$ is nef but not big and $(S,0)$ does not have an $ R$-complement. Such $S$ exists, even if we additionally require that $S$ is smooth (cf. [1.1 Example]Sho00, where $S=_E(V)$ is a ruled surface over an elliptic curve $E$ and $V$ is a non-splitting vector bundle over $E$ of rank $2$).
Let $L$ be an ample line bundle on $S$. Then the affine cone $Y:=C(S,L)$ is not potentially lc, i.e. for any $B_Y 0$ on $Y$, $(Y,B_Y)$ is not lc. To see this, let $p:X:=BC(S,L) C(S,L)=Y$ be the blow-up of the vertex of $Y$ with exceptional divisor $E S$, then $:BC(S,L) S$ is total space of the line bundle $L^-1$ over $S$ and $E$ is the zero section. If there exists $B_Y0$ such that $(Y,B_Y)$ is lc, then
$$
p^*(K_Y+B_Y)=K_X+(1-a)E+B_X
$$
where $a 0$ and $B_X:=f^-1_*B_Y$. Since $K_S$ is $ Q$-Cartier, $K_X$ is $$-Cartier. Since $$ is smooth, we have $(K_X+E)|_E_ K_S$, hence
$$
K_S_-(B_X|_E+aL).
$$
Since $-K_S$ is not big, $a=0$. In this case, $-K_S__X|_E0$ and $(S,B_X|_E)$ is lc by adjunction. Thus $(S,B_X|_E)$ is a $$-complement of $(S,0)$, a contradiction.
On the other hand, $Y$ does have a glc structure $(Y,0,)$, where $M=^*(-K_S)$ is a nef $ Q$-divisor on $X$. By Theorem [thm: glc sings are Du Bois], $Y$ is also an example of a variety which is Du Bois but has no lc structure.
Therefore, Idea 1 will not work. Fortunately for us, by adopting and further developing the ideas of Hashizume [Has20b,Has22], in [LX22], we are able to prove Theorem [thm: gmm exists for g-crepant log structure](1)(3). We use the additional structure given by the morphism $f: Xarrow Z$ as in Theorem [thm: gmm exists for g-crepant log structure]. In fact, by induction on dimension, we can reduce to the case when $(X,B,)$ is log abundant$/Z$. In the classical minimal model program, nefness and log abundance usually imply semi-ampleness (cf. [FG14,HX16,Has20a]).
2. Show that nef and log abundant imply semi-ample.
Surprisingly, we have the following example of a glc g-pair with nef and log abundant but not semi-ample generalized log canonical divisor:
[[Example 1.4]LX22]
Let $C_0$ be a nodal cubic in $^2$ and $l$ the hyperplane class on $^2$. Let $P_1,P_2,...,P_12$ be twelve distinct points on $C_0$ which are different from the nodal point of $C_0$. Let
$$
:X=_\{P_1,...,P_12\}^2
$$
be the blow-up of $^2$ at the chosen points with the exceptional divisor $E=_i=1^12E_i$, where $E_i$ is the prime exceptional divisor over $P_i$ for each $i$. Let $H:=^*l$ and $C:=^-1_*C_0$. Then $C C_0$, $C|3H-E|$, and $K_X+C=^*(K_^2+C_0)=0$.
We consider the big divisor $M=4H-E H+C$. Since $H$ is semi-ample and $M C=0$, $M$ is nef. Notice that $_C(M)=_C_0(4l-_i=1^12P_i)$ and $^0(C) G_m$, where $ G_m$ is the multiplication group of $^*$. Let $$ be any sufficiently small rational number, then $M- C_+(1-)C$ is ample by the Nakai-Moishezon Criterion.
Suppose that $P_1,...,P_12$ are in general position such that $_C(M)$ is a non-torsion in $^0(C)$. Then $M$ can never be semi-ample since $M|_C$ is not. However, the normalization $C^n$ of $C$ is $^1$, so $M|_C^n$ is semi-ample. This gives a glc pair $(X,C,:=)$ such that both $M$ and $K_X+C+M$ are nef and log abundant with respect to $(X,C,)$, but $K_X+C+M$ is not semi-ample.
Let $f: Y X$ be the blow-up at the node of $C_0$. Then $K_Y+C_1+C_2=f^*(K_X+C)$, where $C_2 ^1$ is the $f$-exceptional divisor and $C_1 ^1$ is the birational transform of $C$. We have that
- $(Y,C_1+C_2,)$ is a smooth gdlt pair,
- $K_Y+C_1+C_2+_Y=_Y=f^*M$ is nef and log abundant with respect to $(Y,C_1+C_2,)$,
- $(K_Y+C_1+C_2+_Y)|_C_i$ is semi-ample, and
- $K_Y+(1-)C_1+(1-2)C_2 f^*(M- C)$ is big and semi-ample.
However, $K_Y+C_1+C_2+_Y=f^*M$ is not semi-ample.
Therefore, Idea 2 will also not work. We also remark that conditions (1--4) in Example [ex: log abundant not semi-ample] show that we will not be able to get any similar statement as [Theorem 1.7]Bir12, [Corollary 1.5]HX16 for glc g-pairs, while those results are crucial in the proof of the existence of lc flips.
Nevertheless, the main issue is to glue the semi-ample structures on the glc centers together. For log canonical pairs, such gluing theory is established in [FG14,HX16] thanks to the finiteness of -representations. Therefore, we will investigate the finiteness of -representations for glc g-pairs as well. As indicated in [Hu21], the finiteness of -representations is expected to hold under some additional technical assumptions.
3. Show the finiteness of certain -representations for g-pairs.
Unfortunately for us again, we easily get the following very simple counter-example on the finiteness of B-representations for g-pairs:
Let $n$ be a positive integer and $(^n,0,)$ a g-pair, where $M=(n+2)H_^n(n+2)$ and $H$ is a hyperplane section on $ P^n$. Then the automorphisms of $^n$ which fix $H$ form an infinite subgroup $(^n,H)$ of $(^n,0,)$. Since the representation of $(^n) PGL(n+1,)$ on $H^0(^n, K_^n+M) H^0(^n,_^n(1))$ is faithful, $_1((^n,0,))$ is infinite, where $_m: (^n,0,) (H^0(^n,mK_^n+mM))$.
Therefore, Idea 3 will also not work. Moreover, as a consequence of the failure of the finiteness of B-representations, the gluing theory for g-pairs is problematic. As is shown in Example [ex: relation is not finite in general] below, the semi-ampleness of a g-sdlt pair (cf. [Hu21]) is quite subtle and is hard to distinguish from its normalization without any extra conditions. Luckily there is a final approach.
4. Use conditions in our settings to directly prove the finiteness of relations and the existence of geometric quotients, so that we can glue the semi-ampleness structures on the glc centers together without relying on the finiteness of -representations.
Let's start with some cases when we can easily prove the finiteness of relations. For example, suppose that $W$ is sdlt, $: W^n W$ is the normalization or $W$, and $D^n$ is the double locus. Let $L_W$ be a semi-ample line bundle on $W$ which defines a contraction $g: W Y$. Let $g^n: W^n Y^n$ be the contraction induced by $L=^*L_W$ and $T^nrightarrows Y^n$ be the relation induced by the relation $D^nrightarrows W^n$. Then the relation generated by $T^nrightarrows Y^n$ is automatically finite, and the geometric quotient is just $Y$.
This observation seems useless, as our goal --- the semi-ampleness of $L_W$, where $W$ is the non-gklt locus and $L$ is the restricted generalized log canonical divisor --- is already in the assumptions. Nevertheless, by applying induction on dimension, we may assume that $L_W^n:=^*L_W$ is semi-ample. We have a key observation here: by a lemma of Koll\'ar [Lemma 9.55]Kol13, to prove the finiteness of relations, we only need to show the semi-ampleness of $L_W$ over a ``good" open subset of $W$. For arbitrary sdlt varieties $W$, or even if $W$ is the non-gklt locus of an arbitrary gdlt pair, such ``good" open subset may not exist. However, such good open set will automatically exist under the setting of Theorem [thm: gmm over U0 implies gmm over U], where we can let that open subset be the inverse image of $U^0$.
Now the last thing we need to do is to establish a Koll\'ar-type gluing theory under the setting of Theorem [thm: gmm over U0 implies gmm over U]. This is also not trivial: when a similar kind of Koll\'ar-type gluing theory was introduced in [HX13,HX16] in the proof of the existence of lc flips, they ended up using the finiteness of B-representations which we want to avoid. Nevertheless, thanks to the generalized canonical bundle formula and the MMPs developed in [LX22] (see also [HL21a,Has22]) and by induction on dimension, we can combine the setting in Theorem [thm: gmm over U0 implies gmm over U] and the setting in [thm: gmm exists for g-crepant log structure] together. To this end, we only need to consider g-pairs $(X,B,)$ with a gdlt or glc crepant log structure $(X,B,)arrow Z$. With the help of the generalized canonical bundle formula [Fil20,FS20,HL21b,JLX22] and the structure of $ P^1$-links for glc g-pairs [FS20], we may apply similar arguments as in [Chapter 4]Kol13 to establish a gluing theory for g-pairs with gdlt crepant log structures (see Section [sec: gluing] for details). This eventually provides the gluing theory that we need, and all the main theorems will follow.
# Preliminaries
We adopt the standard notation and definitions in [KM98,BCHM10] and will freely use them.
Let $Xarrow U$ be a projective morphism and $D$ a Weil divisor on $X$ such that $|D/U|=$. We let
$$(D/U):=_P(_D' |D/U|_PD')P$$ be the fixed part of $D$, and let $(D):=D-(D)$ be the movable part of $D$.
[Generalized pairs]
For g-pairs, we adopt the same notation as in [HL21a] except the following minor changes:
- (NQC requirement) G-(sub-)pairs in this paper are required to be NQC. That is, the nef part $$ of a g-(sub-)pair $(X,B,)/U$ should be equal to an $ R_ 0$-linear combination of nef$/U$ $$-Cartier $$-divisors.
- (Trivial glc centers) For any g-(sub-)pair $(X,B,)$, we will consider $X$ itself as a glc center and a non-gklt center of $(X,B,)$. $X$ will be called the trivial glc center/trivial non-gklt center of $(X,B,)$. We will let $(X,B,)$ be the union of all non-trivial non-gklt center of $(X,B,)$.
- (Scheme structure of glc locus) We will always consider $(X,B,)$ as a scheme which is associated with the natural reduced scheme structure. In particular, if $(X,B,)$ is gdlt, then $ B=(X,B,)$ is considered as both a divisor and a reduced scheme.
- (Gplt) We say that a glc g-pair $(X,B,)/U$ is generalized plt (gplt for short) if $(X,B,)$ is gdlt and $ B$ is normal.
We also remark that different definitions of gdlt pairs in literature are now equivalent to each other thanks to [Theorem 6.1]Has22.
Let $(X,B,)/U$ be a sub-glc g-sub-pair and $D$ an $$-divisor on $X$. We say that $D$ is abundant$/U$ if $_(X/U,D)=_(X/U,D)$. We say that $D$ is log abundant$/U$ with respect to $(X,B,)$ if $D$ is log abundant$/U$, and for any glc center $W$ of $(X,B,)$ with normalization $W^$, $D|_W^$ is abundant$/U$. We say that $(X,B,)$ is log abundant$/U$ if $K_X+B+_X$ is log abundant$/U$ with respect to $(X,B,)$.
## Perturbations of generalized pairs
Let $(X,B,)/U$ be a gklt g-pair and $f: Yarrow X$ a birational morphism such that $$ descends to $Y$ and $_Y$ is big$/U$. Then there exists a klt pair $(X,)$ such that $K_X+B+_X_ R,UK_X+$.
Let $K_Y+B_Y+_Y:=f^*(K_X+B+_X)$. For any positive integer $n$, We may write $_Y=H_n+1nE$ where $H_n$ is ample$/U$ and $E 0$. Fix $n 0$, then we may pick $A_n |H_n/U|_ R$ such that $(Y,B_Y+1nE+A_n)$ is sub-gklt. We may let $:=f_*(B_Y+1nE+A_n)$.
Let $(X,B,)/U$ be a $$-factorial gdlt g-pair. Assume that
- $L:=K_X+B+_X$ is nef$/U$ and big$/U$,
- $W:=(X,B,)$, and
- $L|_W$ is semi-ample over $U$.
Then $L$ is semi-ample over $U$.
By the theory of Shokurov-type rational polytopes (cf. [Proposition 3.16]HL22, [Lemma 5.3]HLS19,~[Theorem 1.4]Che20) for generalized pairs, there exist real numbers $a_1,,a_k (0,1]$ such that $_i=1^ka_i=1$, and we may write $B=_i=1^ka_iB_i$ and $=_i=1^ka_i^i$ such that $(X,B_i,^i)$ are gdlt $ Q$-g-pairs, $L_i:=K_X+B_i+^i_X$ is nef$/U$ and big$/U$ over $U$, $L_i|_W$ is semi-ample$/U$, and $(X,B_i,^i)=(X,B,)=W$ for each $i$. Thus we may assume that $(X,B,)$ is a $ Q$-g-pair.
Let $f:Y X$ be a log resolution of $(X, B)$ such that $$ descends to $Y$, and let $K_Y+B_Y+_Y:=f^*(K_X+B+_X)$. Since $L$ is nef$/U$ and big$/U$, we may write $L_ Q,UH_n+1nF$ for any positive integer $n$, such that $H_n 0$ is ample and $F 0$. Now for each $n$ and any positive integer $m$, we may write
$$_Y+12f^*H_n_ Q,UA_n,m+1mE_n,$$
where $A_n,m$ are ample$/U$ $ Q$-divisors and $E_n 0$. For any $m n 0$, we have
$$(Y,B_Y+1mE_n+1nf^*F)=(Y,B_Y)=(Y,B_Y,),$$
thus we may pick $A_n,m 0$ such that $$(Y,_Y:=B_Y+A_n,m+1mE_n+1nf^*F)=(Y,B_Y,).$$
Let $:=f_*_Y$, then $ 0$, $(X,)=(X,B,)=W$, and $2L-(K_X+)_ Q,U12H_n$ is ample$/U$. The lemma follows from [Theorems 4.5.5, 6.5.1]Fuj17, [Theroem 5.3]Amb03.
As in the proof of Lemma [lem: reduction to Nlc locus], we will frequently use Shokurov-type rational polytopes to reduce g-pair questions to $ Q$-g-pair questions. For simplicity, in the rest of the paper, we will not write all the details out as in the first paragraph of the proof of Lemma [lem: reduction to Nlc locus]. All such reductions can be proved by applying [Proposition 3.16]HL22, [Lemma 5.3]HLS19, and [Theorem 1.4]Che20.
The following result is an easy consequence of [Lemma 5.18]HL21a although it is not in literature, so we write it here. We do not need it in the rest of the paper.
Let $(X,B,)/U$ be a glc g-pair and $L$ a nef$/U$ Cartier divisor on $X$ such that $L-(K_X+B+_X)$ is ample$/U$. Assume that $_X$ is $ R$-Cartier. Then $mL$ is base-point-free$/U$ for any integer $m 0$.
Possibly replacing $$ with $(1-)$ for some $0< 1$, we may assume that $(X,B,)=(X,B)$. Let $A:=L-(K_X+B+_X)$. By [Lemma 5.18]HL21a, there exists a birational morphism $h: Warrow X$ such that $$ descends to $W$ and $(h^*_X-_W)=(h)$. We let $E:=h^*_X-_W$, then $E 0$ and $E$ is $h$-exceptional.
Let $K_W+B_W:=h^*(K_X+B)$. By our construction, $(h)= E$ does not contain any lc place of $(X,B)$. Thus we may pick $E' 0$ on $Y$ such that $-E'$ is ample$/X$ and $E'$ does not contain any lc place of $(X,B)$. Since $(X,B,)=(X,B)$, we may find $0< 1$ such that $12h^*A- E'$ is ample$/U$ and $(W,B_W+ E')$ is sub-lc. In particular, we may find an ample$/U$ $$-divisor $$0 H_W_,U_W+12h^*A- E'$$ on $W$ such that $(W,B_W+H_W+ E')$ is sub-lc. Let $:=B+h_*H_W$, then $(X,)$ is lc and $_,UB+_X+12A$. In particular, $L-(K_X+)_ R,U12A$ is ample$/U$. Theorem [thm: bpf with mx r cartier] follows from [Theorem 5.3]Amb03, [Theorems 4.5.5, 6.5.1]Fuj17.
## Canonical bundle formula
We will follow the notation as in [JLX22]. See also [Fil20,FS20,HL21b] for related results.
A contraction is a projective morphism $f: Yarrow X$ such that $f_*_Y=_X$. In particular, $f$ is surjective and has connected fibers.
[Glc-trivial fibration, [Definition 2.10]JLX22]
Let $(X,B,)/U$ be a g-sub-pair and $f: Xarrow Z$ a contraction$/U$. If
- $(X,B,)$ is sub-glc over the generic point of $Z$,
- $ f_*_X(^*(X,B,))=1$, and
- $K_X+B+_X_,Z0$,
then we say that $f: (X,B,)arrow Z$ is a glc-trivial fibration$/U$.
Let $(X,B,)/U$ be a g-sub-pair and $f: (X,B,)arrow Z$ is a glc-trivial fibration$/U$, and $(Z,B_Z,)$ a g-sub-pair on $Z$. We say that $(Z,B_Z,)$ is a g-sub-pair induced by a canonical bundle formula$/U$ of $f: (X,B,)arrow Z$ if $K_X+B+_X_ Rf^*(K_Z+B_Z+_Z)$ and $a(D,Z,B_Z,)=1-t_D(X,B,;f)$ for any prime divisor $D$ over $Z$, where $t_D(X,B,;f)$ are glc thresholds defined as in [Definition 2.12]JLX22.
By [Theorem 2.23]JLX22, if $B 0$ over the generic fiber of $f$, then there always exists a g-sub-pair induced by a canonical bundle formula$/U$ of $f: (X,B,)arrow Z$. Moreover, it is not hard to see that if $(X,B,)$ is a $$-g-sub-pair, then the induced g-sub-pair on $Z$ can also be chosen as a $$-g-sub-pair. We will frequently use these facts in the rest of the paper.
## Crepant log structures
A glc crepant log structure is of the form $f: (X,B,)arrow Z$, where
- $(X,B,)/Z$ is a glc g-pair,
- $K_X+B+_X_,Z0$, and
- $f$ is a contraction. In particular, $f_*_X=_Z$.
In addition, if
- [(4)] $(X,B,)$ is gdlt,
then we say that $f: (X,B,)arrow Z$ is a gdlt crepant log structure.
For any irreducible subvariety $W Z$, we say that $W$ is a glc center of a glc crepant log structure $f: (X,B,)arrow Z$, if there exists a glc center $W_X$ of $(X,B,)$ such that $W=f(W_X)$. For any (not necessarily closed) point $z Z$, we say that $z$ is a glc center of $f: (X,B,)arrow Z$ if $ z$ is a glc center of $f: (X,B,)arrow Z$.
Let $(X,B,)/U$ be a glc g-pair, $f: (X,B,)arrow Z$ a glc-trivial fibration$/U$, and $(Z,B_Z,)/U$ a g-pair induced by a canonical bundle formula of $f: (X,B,)arrow Z$. Then for any irreducible subvariety $W$ of $Z$, $W$ is a glc center of $f: (X,B,)arrow Z$ if and only if $W$ is a glc center of $(Z,B_Z,)$.
The if part follows [Theorem 2.23]JLX22 and the only if part follows from [Theorem 2.16(2)]LX22.
Let $(X,B,)$ and $(X',B',')$ be two g-pairs. We say that $(X,B,)$ and $(X',B',')$ are crepant to each other if there exist birational morphisms $p: Warrow X$ and $q: Warrow X'$ such that $p^*(K_X+B+_X)=q^*(K_X'+B'+'_X')$. Note that we do not require $_W='_W$.
## $ P^1$-links
We recall the definition and results on $ P^1$-links as in [FS20]. This is a generalization of [Theorem 4.40]Kol13 to the category of generalized pairs. We partially refine the definitions (e.g. we define $ P^1$-links for $ R$-g-pairs) to make our arguments more clear and general.
[Standard $ P^1$-link, cf. [Definition 2.21]FS20]
A standard $ P^1$-link is a glc g-pair $(X,B,)/Z$ satisfying the following properties.
- $K_X+B+_X_ R,Z0$,
- there exists a birational morphism $X'arrow X$ such that $_X'_ R,Z0$,
- $ B=D_1+D_2$, where $D_1,D_2$ are prime divisors and $f|_D_i: D_iarrow T$ are isomorphisms,
- $(X,B,)$ is gplt, and
- every reduced fiber of $f$ is isomorphic to $ P^1$, where $f: Xarrow Z$ is the associated projective morphism.
We call $D_1$ and $D_2$ the horizontal sections of $(X,B,)/Z$.
[$ P^1$-link, cf. [Definition 2.23]FS20]
Let $(X,B,)/Z$ be a gdlt g-pair associated with a projective morphism $f: Xarrow Z$, such that $K_X+B+_X_ R,Z0$. Let $Z_1$, $Z_2$ be two glc centers of $(X,B,)$. We say that $Z_1$ and $Z_2$ are directly $ P^1$-linked$/Z$ if there exists an irreducible subvariety $W X$, such that either $W$ is a glc center of $(X,B,)$ or $W=X$, and we have the following. Let $(W,B_W,^W)/Z$ be a gdlt g-pair induced by repeated adjunctions
$$K_W+B_W+^W_W:=(K_X+B+_X)|_W,$$
such that
- $Z_i W$ for each $i$,
- $f(W)=f(Z_1)=f(Z_2)$, and
- there exists a g-pair $(W',B_W',^W)$ crepant to $(W,B_W,^W)$ and a projective morphism $h: W'arrow T$ over $Z$, such that $(W',B_W',^W)/T$ is a $ P^1$-link and $Z_1|_W',Z_2|_W'$ are the horizontal sections of $(W',B_W',^W)/T$.
We say that $Z_1$ and $Z_2$ are $ P^1$-linked$/Z$ if either $Z_1=Z_2$, or there exists an integer $n 2$ and glc centers $Z_1',,Z_n'$ of $(X,B,)$, such that $Z_1=Z_1',Z_n=Z_2'$, and $Z'_i$ and $Z'_i+1$ are directly $ P^1$-linked$/Z$ for any $1 i n-1$.
[cf. [Theorem 3.5]Bir20, [Theorem 1.4]FS20]
Let $(X,B,)/U$ be a gdlt g-pair associated with a projective morphism $f: Xarrow U$, such that $K_X+B+_X_ R,U0$. Let $s U$ be a (not necessarily closed) point such that $f^-1(s)$ is connected. Let
$$:=\{V V is a glc center of (X,B,), s f(V)\}$$
and $Z,W$ two elements such that $Z$ is minimal in $$ with respect to inclusion. Then there exists $Z_W$ such that $Z_W W$, and $Z$ and $Z_W$ are $ P^1$-linked$/U$. In particular, any minimal elements in $$ with respect to inclusion are $ P^1$-linked$/U$ to each other.
It following from Remark [rem: to q coefficients] and [Theorem 1.4]FS20.
Let $f: (X,B,)arrow Z$ be a glc crepant log structure and $z Z$ a (not necessarily closed) point. Let $$_z:=\{V V is a glc center of f: (X,B,)arrow Z, z V\}.$$
Then:
- There exists a unique element $W_z$ that is minimal with respect to inclusion.
- $W$ is unibranch at $z$, i.e. the completion $_z$ is irreducible.
- Any intersection of glc centers of $f: (X,B,)arrow Z$ is also a union of glc centers.
The proof is exactly the same as in [Proof of Corollary 4.41]Kol13 except that we replace [Theorem 4.40]Kol13 with Theorem [thm: P1 link for gdlt crepant log structure]. For the reader's convenience, we give a full proof here.
Possibly replacing $(X,B,)$ with a gdlt model, we may assume that $(X,B,)$ is gdlt. For any any element $W_z$ that is minimal, there exists a glc center $Z_W$ of $(X,B,)$ that is minimal among all glc centers whose image on $Z$ is equal to $W$ with respect to inclusion. By Theorem [thm: P1 link for gdlt crepant log structure], all such $Z_W$ are $ P^1$-linked$/Z$ to each other, hence their images on $Z$ are the same. This proves (1). (2) follows from (1) by considering every \'etale neighborhood of $z$.
For any glc centers $W_1,W_2$ of $(X,B,)$, let $z W_1 W_2$ be any point, and $W$ the unique element minimal element of $_z$. Then $W W_1 W_2$, and we get (3).
The following lemma should be well-known, but we cannot find any reference.
Let $(X,B,)/Z$ be a gdlt g-pair, $S$ a component of $ B$, and $(S,B_S,^S)/Z$ the gdlt g-pair induced by the adjunction
$$K_S+B_S+^S_S:=(K_X+B+_X)|_S.$$
Then:
- Any glc center of $(S,B_S,^S)$ is a glc center of $(X,B,)$.
- Any glc center of $(X,B,)$ that is contained in $S$ is a glc center of $(S,B_S,^S)$.
By [Theorem 6.1]Has22, there exists a log resolution $f: Xarrow X$ of $(X, B)$ and an open subset $X^0 X$, such that $$ descends to $ X$, $X^0$ contains the generic point of any glc center of $(X,B,)$, and $f$ is an isomorphism over $X^0$. Let $K_ X+ B+_ X:=f^*(K_X+B+_X)$, and let $ S$ be the strict transform of $S$ on $ X$, then
$f|_ S$ is a log resolution of $(S, B_S)$ such that $^S$ descends to $ S$, i.e.
$$f|_ S^*(K_S+B_S+^S_S)=K_ S+B_ S+^S_ S:=(K_ X+ B+_ X)|_ S.$$
Thus any glc center of $(S,B_S,^S)$ is a glc center of $( S,B_ S,^S)$, hence a glc center of $( X, B,)$, and hence a glc center of $(X,B,)$, which shows (1). On the other hand, any glc center of $(X,B,)$ that is contained in $S$ is a glc center of $( X, B,)$ that is contained in $ S$, hence a glc center of $( S,B_ S,^S)$, and hence a glc center of $(S,B_S,^S)$, which shows (2).
Let $f: (X,B,) Z$ be a gdlt crepant log structure and $Y X$ a glc center. Let
$$
f|_Y: Y_YZ_Y Z
$$
be the Stein factorization of $f|_Y$, and $(Y,B_Y,^Y)/Z$ the gdlt g-pair induced by repeated adjunctions
$$K_Y+B_Y+_Y^Y:=(K_X+B+_X)|_Y.$$
Then:
- $f_Y: (Y,B_Y,^Y)arrow Z_Y$ is a gdlt crepant log structure.
- For any glc center $W_Y Z_Y$ of $f_Y: (Y,B_Y,^Y)arrow Z_Y$, $(W_Y)$ is a glc center of $f: (X,B,)arrow Z$.
- For any glc center $W Z$ of $f: (X,B,)arrow Z$, every irreducible component of $^-1(W)$ is a glc center of $f_Y: (Y,B_Y,^Y)arrow Z_Y$.
The proof is exactly the same as in [Corollary 4.42]Kol13 except that we use Theorem [thm: P1 link for gdlt crepant log structure] in replace of [Theorem 4.40]Kol13. We also have a proof of (3) in [Proof of 4.1]JLX22. For the reader's convenience, we give a full proof here.
(1) We only need to show that $(Y,B_Y,^Y)$ is gdlt, which follows from [Lemma 2.6]HL22.
(2) There exists a glc center $V_Y$ of $(Y,B_Y,^Y)$ such that $f_Y(V_Y)=W_Y$. By Lemma [lem: inversion of adjunction], $V_Y$ is also a glc center of $(X,B,)$. Thus $(W_Y)=f(V_Y)$ is a glc center of $f: (X,B,)arrow Z$.
(3) Let $z$ be the generic point of $W$. Since the question is \'etale local, possibly replacing $Z$ by an \'etale neighborhood of $z$ and replacing $Y$ with its irreducible components, we may assume that $f^-1(z) Y$ is connnected, and we only need to show that there exists a glc center $V_Y$ of $f_Y: (Y,B_Y,^Y)arrow Z_Y$ such that $f_Y(V_Y)$ is an irreducible component of $^-1(W)$.
Let $V_X$ be a minimal glc center of $(X,B,)$ which dominates $W$, i.e. $V_X$ is minimal in
$$\{V V is a glc center of (X,B,), V dominates W\}$$
with respect to inclusion. Then $f(V_X)=W$. By Theorem [thm: P1 link for gdlt crepant log structure], there exists a glc center $V_Y Y$ of $(X,B,)$ that is $ P^1$-linked$/Z$ to $V_X$. By Lemma [lem: inversion of adjunction], $V_Y$ is also a glc center of $(Y,B_Y,^Y)$. Thus $f_Y(V_Y) Z_Y$ is a glc center of $f_Y: (Y,B_Y,^Y)arrow Z_Y$. Moreover, since $V_Y$ is $ P^1$-linked$/Z$ to $V_X$, $f(V_Y)=f(V_X)=W$. Thus $f_Y(V_Y)$ is an irreducible component of $^-1(W)$ and we are done.
In the setting of Lemma [lem: gdlt crepant log structure is compatible under subadjunction], $f_Y$ actually induces a glc structure $(Z_Y,B_Z_Y,^Z_Y)$ on $Z_Y$ by the canonical bundle formula, and also induces a glc structure $(T,B_T,^T)$ on the normalization $T$ of $f(Y)$ by [Theorem 1.2]HL21b. Let $(Z,B_Z,^Z)$ be a glc g-pair induced by a canonical bundle formula$/Z$ of $f: (X,B,)arrow Z$, then we can also do sub-adjunction by [Theorem 5.1]HL21b to $T$, and the induced structure will coincide with $(T, B_T,^T)$ up to an $ R$-linear equivalence of the moduli part (see [Section 4]JLX22).
## Sources and springs of generalized log canonical centers
The following theorem is an analogue of [Theorem-Definition 4.45]Kol13. This theorem is for separate interest while We do not need the theorem in the rest of the paper.
Let $(X_1,B_1,^1)$ and $(X_2,B_2,^2)$ be two glc g-pairs. We say that $(X_1,B_1,^1)$ and $(X_2,B_2,^2)$ are in the same crepant-birational equivalence class if $^1=^2$, and there exist two birational maps $p_1: Warrow X_1$ and $p_2: Warrow X_2$, such that $p_1^*(K_X_1+B_1+^1_X_1)=p_2^*(K_X_2+B_2+^2_X_2)$.
Let $(X,B,)arrow Y$ be a gdlt crepant log structure and $Z Y$ a glc center with normalization $n: Z^narrow Z$. Let $S X$ be glc center of $(X,B,)$ which dominates $Z$ and is minimal with respect to inclusion. Let $(S,B_S,^S)/Y$ be the gdlt g-pair induced by the adjunction
$$K_S+B_S+^S_S:=(K_X+B+_X)|_S$$
and let $f^n_S: Sarrow Z_Sarrow Z^n$ be the Stein factorization. Then:
- (Uniqueness of sources) The crepant-birational equivalence class of $(S,B_S,^S)$ does not depend on the choice of $S$. This crepant-birational equivalence class of $(S,B_S,^S)$ will be called as the source of $Z$ and is denoted by $(Z,X,B,)$.
- (Uniqueness of springs)
- (Crepant log structure)
- (Poincar\'e residue map) (isom is not canonical)
- (Galois property)
- (Adjunction)
- (Birational invariance)
# Koll\'ar-type gluing theory for generalized pairs
In this section we will review Koll\'ar’s powerful gluing theory of finite quotients. We refer for [Section 5, Section 9]Kol13 for more details. We will develop the gluing theory we need for glc crepant log structures in this section.
In this section, we will generally choose the notation $(X,,)$ instead of $(X,B,)$ for g-pairs, as $B$ is used in the boundary of stratifications.
## Definitions
[[Definition 9.15]Kol13]
Let $X$ be a scheme. A stratification of $X$ is a decomposition of $X$ into a finite disjoint union of reduced locally closed subschemes. We will consider stratifications where the strata are of pure dimensions
and are indexed by their dimensions. We write $X=_iS_iX$ where $S_iX X$ is the $i$-th
dimensional stratum. Such a stratified scheme is denoted by $(X,S_*)$. We also
assume that $_i jS_iX$ is closed for every $j$. The boundary of $(X,S_*)$ is the closed subscheme
$$
B(X,S_*):=_i< XS_iX=X S_ XX,
$$
and is denoted by $B(X)$ if the stratification $S_*$ is clear. Let $(X, S_*)$ and $(Y, S_*)$ be stratified schemes.
Let $(Y, S_*)$ be a stratified scheme and $f:X Y$ a quasi-finite morphism such that $f^-1 (S_iY)$ has pure dimension $i$ for every $i$ . Then $S_iX:=f^-1(S_iY)$ defines a stratification of $X$. We denote it by $(X,f^-1S_*)$, and we say that $f:X(Y,S_*)$ is stratifiable.
Let $(X, S_*)$ be stratified variety. A relation $(_1,_2): Rrightarrows (X,S_*)$ is stratified if each $_i$ is stratifiable and $_1^-1S_*=_2^-1S_*$. Equivalently,
there exists a stratification $(R,^-1S_i)$, such that $r^-1S_iR$ if and only if $_1(r) S_iX$ and if and only if $_2(r) S_iX$.
Let $(X,S_*)$ be a stratified scheme such that $X$ is an excellent scheme. The normality conditions (N), (SN), (HN), and (HSN) are defined in the following ways.
- [(N)] We say that $(X,S_*)$ has normal strata, or that it satisfies (N), if each $S_iX$ is normal.
- [(SN)] We say that $(X,S_*)$ has semi-normal boundary, or that it satisfies (SN), if $X$ and $B(X,S_*)$ are both semi-normal.
- [(HN)] We say that $(X,S_*)$ has hereditarily normal strata, or that it satisfies (HN), if
- the normalization $: (X^n,^-1S_*) (X,S_*)$ is stratifiable,
- $(X^n,S_*^n)$ satisfies (N), and
- $B(X^n,^-1S_*)$ satisfies (HN).
- [(HSN)] We say that $(X,S_*)$ has hereditarily semi-normal boundary, or that it
satisfies (HSN), if
- the normalization $: (X^n,^-1S_*) (X,S_*)$ is stratifiable,
- $(X,S_*)$ satisfies (SN), and
- $B(X^n,^-1S_*)$ satisfies (HSN).
Next we give a special stratification that is induced by the glc crepant log structure.
[Glc stratification]
Let $f:(X,,) Z$ be a glc crepant log structure. Let $S^*_i(Z,X,,) Z$ be the union of all $ i$-dimensional glc centers of $f:(X,,) Z$, and
$$
S_i(Z,X,,):=S^*_i(Z,X,,)~ ~S^*_i-1(Z,X,,).
$$
If the glc crepant log structure $f:(X,,) Z$ is clear from the context, we will use $S_i(Z)$ for abbreviation. It is clear that each $S_i(Z)$ is a locally closed subspace of $Z$ of pure dimension $i$, and $Z$ is the disjoint union of all $S_i(Z)$.
The stratification of $Z$ induced by $S_i(Z)$ is called the generalized log canonical stratification (glc stratification for short) of $Z$ induced by $f:(X,,) Z$. Since this is the only stratification we are going to use in the rest of this paper, we usually will not emphasize the glc crepant structure $f:(X,,) Z$, and we will denote the corresponding stratified scheme by $(Z,S_*)$. The boundary of $(Z,S_*)$ is the closed subspace
$$B(Z,S_*):=Z S_ Z(Z)=_i< ZS_i(Z).$$
We say that a semi-normal stratified space $(Y,S_*)$ is of generalized log canonical (glc) origin if
- $S_i(Y)$ is unibranch for any $i$, and
- there are glc crepant log structures $f_j:(X_j,_j,^j) Z_j$ with glc stratifications $(Z_j,S_*^j)$ and a finite surjective stratified morphism $: _j(Z_j,S_*^j) (Y,S_*)$.
## Basic properties
The following theorem and its proof are very similar to [Theorem 4.32]Kol13.
Let $f:(X,,) Z$ be a glc crepant log structure. Let $W Z$ be the union of all glc centers of $f:(X,,) Z$ except $Z$, and $B(W) W$ the union of all non-maximal (with respect to inclusion) glc centers that are contained in $W$. Then
- $W$ is semi-normal, and
- $W B(W)$ is normal.
By Remark [rem: to q coefficients], we may assume that $(X,,)$ is a $$-g-pair. Let $(Z,_Z,)/U$ be a glc $ Q$-g-pair induced by a canonical bundle formula$/U$ of $f: (X,,)arrow Z$. By Lemma [lem: glc centers come from cbf], the glc centers of $(Z,_Z,)$ are exactly the glc centers of $f: (X,,)arrow Z$. Possibly replacing $(X,,)$ with a gdlt model of $(Z,_Z,)$, we may assume that $f$ is birational and $(X,,)$ is $ Q$-factorial gdlt. We have $W=f()$. Let $':=\{\}$. We consider the exact sequence
$$
0_X(-)_X_
$$
and its push-forward
$$
_Z=f_*_X f_*_^1f_*_X(-).
$$
By Lemma [lem: gklt g-pair to pair], we can find a $$-divisor $'' 0$ such that $$-_,ZK_X+'+_X_,ZK_X+''$$ and $(X,'')$ is klt. By [Corollary 10.40]Kol13, $R^if_*_X(-)$ is torsion free for every $i$. On the other hand, $f_*_$ is supported on $W$, hence it is a torsion sheaf. Thus the connecting map $$ is zero, hence $_Z f_*_$ is surjective. Since this map factors through $_W$, we conclude that $_W f_*_$ is also surjective, hence an isomorphism.
Note that $$ has only nodes at codimension 1 points and it is $S_2$ by [Corollary 2.88]Kol13. By [Lemma 10.14]Kol13, $$ is semi-normal. By [Lemma 10.15]Kol13, $W$ is semi-normal. This is (1).
To prove (2), let $V$ be an irreducible component of its non-normal locus. Then $V$ is an lc center of $(X, )$, hence a glc center of $(X,,)$. Thus $f(V) Z$ is a glc center. Hence either $f(V)$ is an irreducible component of $W$, or $f(V) B(W)$. Thus [Complement 10.15.1]Kol13 implies that $W B(W)$ is normal.
Theorem [thm: glc locus is semi-normal] has the following interesting corollary. We do not need it in the rest of the paper.
Let $(X,,)$ be a glc g-pair. Then $(X,,)$ is semi-normal.
It follows from Theorem [thm: glc locus is semi-normal] when $f$ is the identity morphism.
Let $f:(X,,) Z$ be a glc crepant log structure and $(Z,S_*)$ the induced glc stratification. Then
- $S_i(Z)$ is unibranch for every $i$, and
- $B(Z,S_*)$ is semi-normal.
(1) follows from Lemma [lem: glc locus is unibranch](2) and (2) follows from Theorem [thm: glc locus is semi-normal].
Let $f: (X,,) Z$ be a gdlt crepant log structure, $(Z,S_*)$ its induced glc stratification, and $Y X$ a glc center of $(X,,)$. Let $(Y,,^Y)/Z$ be the gdlt g-pair induced by repeated adjunctions
$$K_Y+_Y+^Y_Y:=(K_X++_X)|_Y,$$
We consider the Stein factorization of $f|_Y$
$$(Y,_Y,^Y)_Y.$$
Then:
- $f_Y:(Y,_Y,^Y) W$ is a gdlt crepant log structure which induces a glc stratification $(W,S_*)$.
- $S_i(W)=^-1(S_i(Z))$ for every $i$.
It follows from Lemma [lem: gdlt crepant log structure is compatible under subadjunction].
Let $f:(X,,) Z$ be a glc crepant log structure and $(Z,S_*)$ the induced glc stratification. Then $(Z,S_*)$ satisfies (HN) and (HSN).
By Lemma [lem: (Z,S) is U and SN] and [Definitions 9.18,~9.19]Kol13, $(Z,S_*)$ satisfies (HU) and (HSN). By [Theorem 9.21]Kol13, $(Z,S_*)$ satisfies (HN).
Every glc stratification is of glc origin. More precisely, let $f:(X,,) W $ be a glc crepant log structure and $Y W$ any union of glc centers. Then $(Y, S_*)$ is of glc origin, where $S_i(Y)=Y S_i(W)$ for each $i$.
By Theorem [thm: (Z,S) is HN and HSN] and [Theorem 9.26]Kol13 we know that $Y$ is semi-normal and $S_i(Y)$ is unibranch for each $i$. Then we can apply Lemma [lem: stratification is compatible under adjunction] to each glc center of $f: (X,,)$ contained in $Y$ to conclude that $(Y, S_*)$ is of glc origin.
## Constructions of glc stratifications
[Gluing theory of glc crepant structures]
Let $(X,,)/U$ be a gdlt g-pair, $W$ a reduced divisor, $: W^narrow W$ the normalization of $W$, $D$ the double locus of $W^n$, $D^n$ the normalization of $D$, $: D^narrow D^n$ the induced involution, and $(_1,_2): D^nrightarrows W^n$ a finite stratified equivalence relation whose normalization map is given by the quotient morphism $: W^n W=W^n/R$, where $R$ is the finite equivalence relation generated by $D^n$.
Let $L_W:=(K_X++_X)|_W$, $$L:=(K_X++_X)|_W^n=K_W^n+_W^n+^W^n_W_n$$
where $(W^n,_W^n,^W^n)/U$ is the gdlt $ Q$-g-pair induced by repeated adjunctions, and suppose that $L$ is semi-ample$/U$. Let $g^n: W^narrow Y^n$ and $h^n: D^narrow T^n$ be the morphisms$/U$ induced by $L$ and $L|_D^n$ respectively so that we have the commutative diagram
D^n [dd]_h^n@<.5ex>[rr]^_1 @<-.5ex>[rr]__2 && W^n [dd]^g^n
&&
T^n @<.5ex>[rr]^_1@<-.5ex>[rr]__2 && Y^n
where $(_1,_2): T^nrightarrows Y^n$ are induced by $(_1,_2): D^nrightarrows W^n$. We let $(D^n,_D^n,^D^n)/U$ be the gdlt g-pair induced by the adjunction
$$
K_D^n+_D^n+^D^n_D^n=(K_W^n+_W^n+^W^n_W_n)|_D^n.
$$
It is clear that $g^n:(W^n,_W^n,^W^n) Y^n$ and $h^n: (D^n,_D^n,^D^n)arrow T^n$ are gdlt crepant log structures. We let $(Y^n,S_*(Y^n))$ and $(T^n,S_*(T^n))$ be their induced stratified schemes respectively.
Notations and conditions as in Construction [cons: gluing part 1]. Assume that $(X,B,)$ is a $ Q$-g-pair. Let $m$ be a sufficiently divisible positive integer such that $mL_W$ is Cartier, $|mL/U|$ defines $g^n$, and there exists a very ample$/U$ divisor $H$ on $Y^n$ such that $(g^n)^*H=M$.
Let $p_W: W^n_M W^n$, $p_Y: Y^n_H Y^n$ be the total spaces of the line bundles $M$ and $H$ respectively. Let $_W^n_M:=p_W^-1(_W^n)$, and $g^n_M: (W^n_M,_W^n_M,p^*_W^W^n) Y^n_H$ the gdlt crepant log structure with induced stratification $(Y^n_H, S_*(Y^n_H):=p_Y^-1S_*(Y^n))$.
Let $p_D: D^n_M D^n$ and $p_T: T^n_H T^n$ be the total spaces of the line bundles $M|_D^n$ and $H|_T^n$. Let $_D^n_M:=p_D^-1(_D^n)$, and $h^n_M: (D^n_M,_D^n_M,p^*_D^D^n) T^n_H$ the gdlt crepant log structure with induced stratification $(T^n_H, S_*(T^n_H):=p_T^-1S_*(T^n))$.
Then we have a pro-finite relation $(_1H,_2H): T^n_Hrightarrows Y^n_H$ induced by the finite relation $(_1M,_2M): D^n_Mrightarrows W^n_M$, where $_1M,_2M: D^n_Marrow W^n_M$ are liftings of $_1,_2$ respectively.
[cf.~[Lemma 3.11]HX13]
Notations and conditions as in Construction [cons: gluing part 1]. Then
- $(_1,_2): T^nrightarrows Y^n$ is a stratified equivalence relation, and
- $(Y^n,S_*(Y^n))$ and $(T^n,S_*(T^n))$ satisfy (HN) and (HSN).
If we have the additional notations and conditions as in Construction [cons: glue part 2], then
- [(3)] $(_1H,_2H): T^n_Hrightarrows Y^n_H$ is a stratified equivalence relation, and
- [(4)] $(Y^n_H,S_*(Y^n_H))$ and $(T^n_H,S_*(T^n_H))$ satisfy (HN) and (HSN).
(2)(4) follow from Theorem [thm: (Z,S) is HN and HSN]. We prove
(1)(3). For any glc center $V$ of $(D^n,_D^n,^D^n)$ (resp. of $(D^n_M,_D^n_M,p^*_D^D^n)$), $(V)$ (resp. $_M(V)$) is also a glc center on $D^n$ (resp. $D^n_M$). Thus the glc stratification induced by $h^n: (D^n,_D^n,^D^n) T^n$ (resp. $h^n_M: (D^n_M,_D^n_M,p_D^*^D^n) T^n_H$) is the same as the glc stratification induced by $h^n:(D^n,_D^n,^D^n) T^n$ (resp. $h^n_M_M: (D^n_M,_D^n_M,p_D^*^D^n) T^n_H$). Hence we only need to check that $^-1S_*(Y^n)$ (resp. $_H^-1S_*(Y^n_H)$) coincides with $S_*(T^n)$ (resp. $S_*(T^n_H)$), where $$ (resp. $_H$) is the canonical morphism $T^n Y^n$ (resp. $T^n_H Y^n_H$). But this follows directly from Lemma [lem: stratification is compatible under adjunction].
## Remarks and an example
Notations and conditions as in Construction [cons: glue part 2]. If $=0$, then $(W,_W)$ is sdlt. By [Section 4]HX16, both $T^nrightarrows Y^n$ and $T^n_Hrightarrows Y^n_H$ generate finite equivalence relations. By [Theorem 9.21]Kol13, the geometric quotients $Y=Y^n/T^n$ and $Y_H=Y^n_H/T^n_H$ exist. Possibly by replacing $m$ with a multiple, $Y_H$ is a line bundle over $Y$, whose pullback to $W$ is exactly $mL_W$. In general, the pro-finite equivalence relation generated by $T^nrightarrows Y^n$ and $T^n_Hrightarrows Y^n_H$ can be described as some almost group actions ([Definition 9.32]Kol13) which is actually given by some crepant birational subgroup on the glc centers. Thanks to the finiteness of B-representation for lc pairs [HX13,FG14], these groups are finite, hence the relations are also finite.
However, when $0$ and $(W,_W,^W)$ is only g-sdlt (cf. [Hu21]), one should not expect that the finiteness still holds without extra conditions or structures. We have already shown the failure of the finiteness of B-representations (cf. Example [ex: fail finiteness b representation]). The following example will show that
- the relation generated by $T^nrightarrows Y^n$ may not be finite and the geometric quotient $Y^n/T^n$ may not exist, and
- the relation generated by $T^n_Hrightarrows Y^n_H$ may not be finite, even when the geometric quotient $Y^n/T^n$ exists.
(1) Let $^*$ and consider $^1 ^1$, which can be regarded as the total space of a trivial line bundle over $^1$. We define $_: \{0\}^1\{\}^1$ by $(0,t)(, t)$ and glue $\{0\}^1$ and $\{\}^1$ together using $_$ to get a demi-normal variety $M$ with projection $p:M C$, where $C$ is a nodal cubic. Then $M$ is a total space of a line bundle (also denoted by $M$) on $C$. Moreover, $M^0(C)_m=^*$ and can be canonically regarded as $^*$. Then:
- $W:=C$ is sdlt and $K_C 0$. We let $^W:=$.
- $:^1 C$ is the normalization and $D^nrightarrows^1$ is the involution of two points $\{0,\}$.
- $g^n: W^n Y^n$ is just $^1~$, and $T^nrightarrows Y^n$ is trivial and finite. Therefore, the geometric quotient $Y^n/T^n$ exists and is equal to $~$.
But from the line bundle aspect, we have the following:
- $_M:W^n_M M$ is $^1^1 M$.
- $D^nrightarrows^1^1$ is induced by $_:\{0\}^1\{\}^1$.
- $H$ is trivial and $g^n: W^n_M Y^n_H$ is the projection $^1^1 ^1$.
- $T^nrightarrows ^1$ is given by $_,^-1_$, and $$. Therefore, the relation generated by $T^nrightarrows^1$ can viewed as the cyclic group $^*$, which is finite if and only if $$ is a root of unity.
(2) We can also compactify the above total spaces of line bundles to get projective examples when $Y^n/T^n$ does not exist.
Let $W:=_C(_C M)$ be a $^1$-bundle over $C$, and let $C' W$ be the section at infinity, which belongs to $|_W(1)|$. Then $W^n=^1^1$, and $g^n:W^n Y^n$ is the second projection $p_2: ^1^1^1$.
Notice that $K_W$ is Cartier since $W$ is a locally complete intersection. Let $N:=3C'$, then $$^*(K_W+N)=K_W^n+\{0\}^1+\{\}^1+^*N=p_2^*(\{\})$$
is semi-ample. $N$ is nef since $^*N$ is nef, so we see that $(C,0,)$ is g-sdlt. However, the relation generated by $T^nrightarrows^1$ is given by
$$\{[x,y][x',y']|[x',y']=[x,^ly] for some $l$\}$$
and is finite if and only if $$ is a root of unity.
# From gluing theory to abundance
The goal of this section is to prove the following theorem:
[cf. [Theorem 4.1]HX13]
Let $(X,B,)/U$ be a $ Q$-factorial gdlt g-pair, $U^0$ a non-empty subset of $U$, and $X^0:=X_UU^0$. Assume that
- any glc center of $(X,B,)$ intersects $X^0$,
- $K_X+B+_X$ is nef$/U$, and
- $(K_X+B+_X)|_X^0$ is semi-ample$/U^0$.
Then $K_X+B+_X$ is semi-ample$/U$. In particular, $(X,B,)/U$ is a good minimal model of itself.
Before we prove Theorem [thm: semi-ample over U0 implies semi-ample over U], we need to prove Theorem [thm: finite generation imply semi-ample].
[Proof of Theorem [thm: finite generation imply semi-ample]]
Since termination and semi-ampleness$/U$ are both local on $U$, we can assume that $U$ is affine.
Let $m$ be a sufficiently divisible positive integer such that $m(K_X+B+_X)$ is Cartier and $m(K_X+B+_X)|_X^0$ is base-point-free$/U^0$, which defines a contraction$/U^0$ $h^0: X^0 V^0$. Since $R(X/U,K_X+B+_X)$ is a finitely
generated $_U$-algebra, possibly replacing $m$ with a multiple, there
exist a log resolution $g: W X$ of $(X, B)$, a Weil divisor $E 0$ on $W$, and a base-point-free$/U$ divisor $F$ on $W$, such that $$ descends to $W$,
$$
(g^*(lm(K_X+B+_X))/U)=lE, (g^*(lm(K_X+B+_X))/U)=lF
$$
for any positive integer $l$. Let $h: Warrow V$ be the
contraction$/U$ defined by $|lF|$. Since $m(K_X+B+_X)|_X^0$ is base point free$/U^0$ and defines $h^0$, $V_UU^0=V^0$, and $E$ is vertical over $V$.
Let $B_W:=g^-1_*B+(g)_$. Then $(W,B_W,)$ is a log smooth model of $(X,B,)$. We have
$$
m(K_W+B_W+_W)=g^*m(K_X+B+_X)+E'
$$
where $E'0$ is exceptional over $X$. Thus
$$
(lm(K_W+B_W+_W)/U)=lE+lE', and (lm(K_W+B_W+_W)/U)=lF.
$$
Let $B^0:=B_UU^0, B_W^0:=B_W_UU^0$, and $:=_UU^0$. We run a $(K_W+B_W+_W)$-MMP$/V$ with scaling of an ample divisor. Since $K_X^0+B^0+^0_X^0$ is semi-ample$/U^0$ and $K_X^0+B^0+^0_X^0_ Q,V^00$, $(X^0,B^0,^0)/U^0$ is a weak glc model of $(W^0,B^0_W,^0)/U^0$ and $(X^0,B^0,^0)/V^0$ is a weak glc model of $(W^0,B^0_W,^0)/V^0$. By [Lemma 3.15]HL21a, $(W^0,B^0_W,^0)/V^0$ has a log minimal
model. By [Theorem 2.24]HL21a, the $(K_W+B_W+_W)$-MMP$/V$ terminates over $V^0$. Let $: W Y'$ be the induced birational map$/V$.
Let $B_Y',E_Y',E'_Y'$, and $F_Y'$ be the strict transforms of $B_Y',E_Y',E'_Y'$, and $F_Y'$ on $Y'$ respectively. Since
$$ m(K_W+B_W+_W) E+E'+F E+E'$$
over $V^0$, $E_Y'+E'_Y'_ 0$ over $V^0$. In particular, $E_Y'+E'_Y'$ is vertical over $V$.
Since $: W Y'$ is a partial $(K_W+B_W+_W)$-MMP,
$$((lE_Y'+lE'_Y'+lF_Y')/U)=(g^*(lm(K_Y'+B_Y'+_Y'))/U)=l(E_Y'+E_Y'').$$
By [Lemma 3.2]Bir12, $E_Y'+E'_Y'$ is very exceptional over $V$. By [Proposition 3.8]HL22, we may run a $(K_Y'+B_Y'+_Y')$-MMP$/V$ with scaling of an ample divisor which terminates with a a log minimal model $(Y,B_Y,)/V$, such that
$$
m(K_Y+B_Y+_Y)_,VE_Y+E'_Y=0,
$$
where $E_Y$ and $E_Y'$ are the strict transforms of $E_Y'$ and $E'_Y'$ on $Y$ respectively.
In particular, $m(K_Y+B_Y+_Y)_,UF_Y$. Thus $K_Y+B_Y+_Y$ is semi-ample$/U$, hence $(Y,B_Y,_Y)/U$ is a good log minimal model of $(W,B_W,)/U$. By [Lemma 3.10]HL21a, $(Y,B_Y,_Y)/U$ is a good log minimal model of $(X,B,)/U$. The moreover part of the theorem follows from [Theorem 2.24, Lemma 3.9]HL21a.
[Proof of Theorem [thm: semi-ample over U0 implies semi-ample over U]] Since semi-ampleness$/U$ is local on $U$, we can assume that $U$ is affine. By Remark [rem: to q coefficients], we may assume that $(X,B,)/U$ is a $$-g-pair. We let $B^0:=B_UU^0$ and $^0:=_UU^0$.
We may apply induction on dimensions. When $ X=1$ the theorem is obvious. Thus we may assume that $ X=d$ for some integer $d 2$, and assume that the theorem holds in dimension $ d-1$. In particular, we may assume that $(K_X+B+_X)|_S$ is semi-ample$/U$ for any glc center $S$ of $(X,B,)$.
1. In this step, we construct an auxiliary g-pair $(V,B_V,)/U$.
Let $m>0$ be a sufficiently divisible integer such that $m(K_X+B+_X)$ is Cartier and $|m(K_X+B+_X)|_X^0|$ is base-point-free$/U^0$, which defines a contraction $h^0: X^0 V^0$ over $U^0$. Let $h: X V$ be an Iitaka fibration$/U$ of $m(K_X+B+_X)$, then $h|_X^0=h^0$ is a morphism. We let $g: Y X$ be a log resolution of $(X, B)$ such that $$ descends to $Y$ and the induced birational map $Y V$ is a morphism. We can write $$K_Y+B_Y+_Y=g^*(K_X+B+_X)+E,$$
where $B_Y 0, E 0$, and $B_Y E=0$. Then $E$ is exceptional over $X$, $(X,B,)/U$ is a weak glc model of $(Y,B_Y,)/U$, and the image of any glc center of $(Y,B_Y,)$ intersects $U^0$.
By [Theorem 4.2]LX22 (and possibly applying Remark [rem: to q coefficients] again), we have the following commutative diagram
$
Y'@->[d]_h'@.>[r]^f& Y@->[r]^g@->[dr] & X@.>[d]^h
V'@->[rr]^ & & V
$
satisfying the following conditions:
- $h'$ is a contraction, $f$ is birational, and $: V'arrow V$ is a resolution of $V$.
- $(Y',B_Y',)$ is a $ Q$-factorial gdlt $ Q$-g-pair.
- $K_Y'+B_Y'+_Y'_ Q,V'0$.
- Any weak glc model of $(Y,B_Y,)/U$ is a weak glc model of $(Y',B_Y',)/U$. In particular, $(X,B,)/U$ is a weak glc model of $(Y',B_Y',)/U$.
- Any weak glc model of $(Y^0,B^0_Y,^0)/U$ is a weak glc model of $(Y'^0,B^0_Y',^0)/U$, where $Y^0:=Y_UU^0,Y'^0:=Y'_UU^0,B^0_Y:=B_Y_UU^0$, $B^0_Y':=B_Y'_UU^0$, and $^0:=_UU^0$. In particular, $(X^0,B^0,^0)/U^0$ is a weak glc model of $(Y'^0,B^0_Y',^0)/U$.
- Any glc center of $(Y',B_Y',)$ intersects $Y'^0$.
By [Theorem 2.16]LX22, there exists a glc $ Q$-g-pair $(V',B_V',)/U$ induced by a canonical bundle formula$/U$ of $h': (Y',B_Y',)arrow V'$, such that the image of any glc center of $(V',B_V',)$ in $U$ intersects $U^0$. Since $h$ is an Iitaka fibration$/U$ of $K_X+B+_X$, $K_V'+B_V'+_V'$ is big$/U$.
2. In this step, we reduce to the case when $K_X+B+_X$ is big$/U$.
We let $B^0:=B_UU^0$. Since $(X^0,B^0,^0)/U^0$ is a weak glc model of $(Y'^0,B_Y'^0,^0)/U^0$, there exist two birational morphisms $p: X''arrow Y'$ and $q: X''arrow X$, such that
$$p^*(K_Y'+B_Y'+_Y')|_Y'^0=q^*(K_X+B+_X)|_X^0+E^0$$
where $E^0 0$ is exceptional over $X$ [Lemma 3.8]HL21a.
By construction, $K_X^0+B^0+^0_X^0_ Q,V^00$. Since $K_Y'+B_Y'+_Y'_ Q,V'0$, $K_Y'^0+B^0_Y'+^0_Y'^0_ Q,V'^00$. Since $V'arrow V$ is birational, $V' V$ over the generic point of $V$. Thus over the generic point of $V$,
$$K_Y'+B_Y'+_Y'_ Q0_ QK_X+B+_X,$$
and $(X,B,)$ is a good minimal model of $(Y',B_Y',)$. Thus $(X,B,)$ and $(Y',B_Y',)$ are crepant over the generic point of $V$.
Since the moduli part of a canonical bundle formula only depends on the generic fiber of the fibration and canonical bundle formulas are compatible with base change, there exists a glc g-pair $(V^0,B^0_V,^0)/U^0$ induced by a canonical bundle formula of $h^0: X^0arrow V^0$, such that $^0=_UU^0$. Let $V'^0:=V'_UU^0$ and $B^0_V':=B_V'_UU^0$. Then
is exceptional over $X^0$. Therefore, $$0 (K_V'^0+B^0_V'+^0_V'^0)-(|_V'^0)^*(K_V^0+B^0_V+^0_V^0)$$
is exceptional over $V^0$. Since $K_V^0+B^0_V+^0_V^0$ is ample$/U^0$, $(V^0,B^0_V,^0)/U^0$ is a weak glc model of $(V'^0,B^0_V',^0)/U^0$. By [Lemmas 3.9, 3.15]HL21a, $(V'^0,B^0_V',^0)/U^0$ has a good minimal model.
Let $(,B_,)$ be a gdlt model of $(V',B_V',)$, $^0:=_UU^0$, and $B^0_ V:=B_ V_UU^0$. By [Theorem 3.14]HL21a, $( V^0,B^0_ V,^0)/U^0$ has a good minimal model. By [Lemma 2.7]LX22 and [Lemmas 3.9]HL21a, we may run a partial $(K_ V+B_ V+_ V)$-MMP$/U$ $( V,B_ V,) ( V,B_ V,)$, such that $(K_ V+B_ V+_ V)|_ V^0$ is semi-ample$/U^0$, where $ V^0:= V_UU^0$. Now we run a $(K_ V+B_ V+_ V)$-MMP$/U$ with scaling of an ample divisor
$$( V,B_ V,)=(V_0,B_V_0,) (V_1,B_V_1,) (V_i,B_V_i,).$$
Then the induced birational map $ V V_i$ is an is an isomorphism over $U^0$. Since the image of any glc center of $( V,B_ V,)$ on $U$ intersects $U^0$, the image of any glc center of $(V_i,B_V_i,)$ on $U$ intersects $U^0$. By induction hypothesis, $(V_i,B_V_i,)$ is log abundant$/U$ for each $i$. By [Theorem 7.6]LX22 (cf. [Theorem 3.15]Has22 when $X,U$ are projective varieties), this MMP terminates with a log minimal model $( V,B_ V,)/U$ of $(V',B_V',)/U$. Moreover, the image of any glc center of $( V,B_ V,)/U$ intersects $U^0$. By construction,
If $ V< X$, then by induction hypothesis, $K_+B_+_$ is semi-ample$/U$, hence $R(/U,K_+B_+_)$ is finitely generated, so $R(X/U,K_X+B+_X)$ is finitely generated, and the theorem follows from Theorem [thm: finite generation imply semi-ample]. Thus we may assume that $ V= X$, hence $K_X+B+_X$ is big$/U$.
3. We use gluing theory in Section [sec: gluing] to prove the theorem.
We let $W:= B=(X,B,)$, $W^0:=W_UU^0$, $L_W:=(K_X+B+_X)|_W$, $L_W^0:=L_W|_W^0$, and $L:=L_W|_W^n$, where $W^n$ is the normalization of $W$. By induction hypothesis, $L$ is semi-ample$/U$.
Recall that $m>0$ is a sufficiently divisible integer such that $m(K_X+B+_X)$ is Cartier and $|m(K_X+B+_X)|_X^0|$ is base-point-free$/U^0$. Possibly replacing $m$ with a multiple, we may assume that
- $mL$ defines a contraction$/U$ $g^n: W^narrow Y^n$ such that there exists a very ample$/U$ divisor $H$ on $Y^n$ such that $(g^n)^*H=M$, and
- $mL_W^0$ defines a contraction$/U^0$ $g^0: W^0arrow Z^0$, and there exists a very ample$/U^0$ divisor $H_Z^0$ on $Z^0$ such that $(g^0)^*H_Z^0=mL_W^0$.
In particular, all conditions of Constructions [cons: gluing part 1] and [cons: glue part 2] hold. Therefore, in the following, we will adopt all notations as in Constructions [cons: gluing part 1] and [cons: glue part 2] (except that ``$$" will be replaced by ``$B$"). By Lemma [lem: induced relation is stratified],
- $(_1,_2):T^nrightarrows Y^n$ and $(_1H,_2H):T^n_Hrightarrows Y^n_H$ are stratified equivalence relations, and
- $(Y^n,S_*(Y^n)),(T^n,S_*(T^n)),(Y^n_H,S_*(Y^n_H))$, $(T^n_H,S_*(T^n_H))$ satisfy (HN) and (HSN).
We let $p_Z^0: Z^0_H_Z_0arrow Z^0$ be the total spaces of the line bundle $H_Z^0$.
We let $Y^n,0=Y^n_UU^0$, $T^n,0=T^n_UU^0$, $Y^n,0_H=Y^n_H_UU^0$, and $T^n,0_H=T^n_H_UU^0$. Then the geometric quotients $Z^0=Y^n,0/T^n,0$ and $Z^0_H_Z^0=Y^n,0_H/T^n,0_H$ exist. In particular, the equivalence relations generated by $(_1,_2)|_T^n,0: T^n,0rightarrows Y^n,0$ and $(_1H,_2H)|_T^n,0_H: T^n,0_Hrightarrows Y^n,0_H$ are finite. By [Lemma 9.55]Kol13, the equivalence relations generated by $(_1,_2):T^nrightarrows Y^n$ and $(_1H,_2H):T^n_Hrightarrows Y^n_H$ are finite (cf. [Proposition 3.12]HX13). By [Theorem 9.21]Kol13, the geometric quotients $Y^n/T^n$ and $Y^n_H/T^n_H$ exist.
We denote $Z:=Y^n/T^n$ and $Z_H_Z:=Y^n_H/T^n_H$. Then we have induced morphisms $p_Z: Z_H_Zarrow Z$, $g: Warrow Z$, and $_Z: Y^narrow Z$, such that
- $p_Z: Z_H_Zarrow Z$ is a total space of a line bundle $H_Z$ on $Z$,
- $Z^0=Z_UU^0$ and $Z^0_H_Z^0=Z_H_Z_UU^0$,
- $g^0=g|_W^0$ and $g^*H_Z=mL_W$, and
- $_Z^*H_Z=H$.
Since $H$ is ample$/U$, $H_Z$ is ample$/U$. Thus $L_W$ is semi-ample$/U$. By Lemma [lem: reduction to Nlc locus], $K_X+B+_X$ is semi-ample$/U$, and we are done.
The following theorem follows from Theorem [thm: semi-ample over U0 implies semi-ample over U].
Let $(X,B,)/U$ be a gdlt g-pair and $A 0$ an $ R$-Cartier $ R$-divisor on $X$. Assume that
- $K_X+B+_X$ is nef$/U$,
- $(X,B+A,)$ is glc, and
- $K_X+B+A+_X_,U0$.
Then $K_X+B+_X$ is semi-ample$/U$.
[Proof of Theorem [thm: nef imply semi-ample]]
Possibly replacing $(X,B,)$ with a gdlt modification and replacing $A$ with the pullback of $A$, we may assume that $X$ is $ Q$-factorial. Since $-A$ is nef over $Z$, $ A=f^-1(f(A))$. Since $(X,B+A,)$ is gdlt, $ A$ does not contain any glc center of $(X,B,)$, hence $f(A)$ does not contain the image of any glc center of $(X,B,)$ in $U$. Let $U^0:=U f(A)$. Theorem [thm: nef imply semi-ample] follows by applying Theorem [thm: semi-ample over U0 implies semi-ample over U] to $(X,B,)/U$ and $U^0$ as $(K_X+B+_X)|_X^0_ R,U^00$, where $X^0:=X_UU^0$.
# Du Bois singularity
In this section we prove the g-pair versions of results in [Chapter 6]Kol13, which will be used to prove Theorem [thm: glc sings are Du Bois]. We adopt the notations as in [Chapter 6]Kol13 and will freely use them.
We first recall the following definition in [Kov11] (cf. [Definition 6.10]Kol13).
A DB pair $(X,)$ consists of a reduced scheme $X$ of finite type and a closed reduced subscheme $$ in $X$ such that the natural morphism
$$
_ X _X,^0
$$
is a quasi-isomorphism. We will also say $(X,)$ is DB in this case.
The definition of DB pairs is subtle but what really matters here is the following lemma:
[[Proposition 6.15]Kol13]
Let $(X,)$ be a DB pair. Then $X$ has Du Bois singularities if and only if $$ has Du Bois singularities.
The following theorems are analogues of [Theorems 6.31, 6.33]Kol13 for g-pairs and the proofs are similar. For the reader's convenience, we provide full proofs here.
Let $f:(X,,) Z$ be a glc crepant log structure and $W X$ the union of glc centers of $f:(X,,) Z$ except $Z$. Then $(Z,W)$ is a DB pair.
By Remark [rem: to q coefficients], we may assume that $(X,,)$ is a $$-g-pair. Let $(Z,_Z,)/U$ be a glc $ Q$-g-pair induced by a canonical bundle formula$/U$ of $f: (X,,)arrow Z$. By Lemma [lem: glc centers come from cbf], the glc centers of $(Z,_Z,)$ are exactly the glc centers of $f: (X,,)arrow Z$. Possibly replacing $(X,,)$ with a gdlt model of $(Z,_Z,)$, we may assume that $f$ is birational and $(X,,)$ is $ Q$-factorial gdlt.
Then we have the following diagram
$
Y@->[r]^@->[dr]^g & X@->[d]^f
& Z
$
where $$ is a log resolution such that $$ descends to $Y$ and $F:=g^-1(W)_$ is an snc divisor. Let
$$
K_Y+_Y+_Y:=^*(K_X++_X).
$$
and $D:=_Y^=1$. Since $_Y$ is nef$/Z$ and big$/Z$, there exists $0'_Y_,Z_Y$ such that $(Y,_Y-D+'_Y)$ is sub-klt. Let $_Y:=(_Y-D+'_Y)^0$ and $E:=(_Y-D+'_Y)^ 0$, then $_Y=0$ and $E$ is exceptional over $Z$. Possibly replacing $Y$ with a higher resolution, we may assume that $D+E+_Y$ is snc.
Since $E-D-F$, we have natural maps:
$$
g_*_Y(-F) Rg_*_Y(-F) Rg_*_Y(E-D).
$$
Since $E-D_,ZK_Y+_Y$, by [Theorem 10.41]Kol13,
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
Since $D$ is reduced and $g(D)=W$, we have $g_*_Y(-D)=_W$, the ideal sheaf of $W$ in $Z$. Moreover, $g_*_Y=_W$ since $F$ is also reduced. Therefore, we get an isomorphism $_W=g_*_Y(-F) g_*(E-D)$, which implies that
$$
: _W g_*_F Rg_*_F
$$
has a left inverse. Since $Y$ is smooth and $F$ is an snc divisor, we see that $(Y,F)$ is a DB pair, thus by [Theorem 3.3]Kov12 (cf. [Theorem 6.27]Kol13), $(Z,W)$ is also a DB pair.
By Remark [rem: to q coefficients], we may assume that $(X,,)$ is a $$-g-pair. Let $(Z,_Z,)/U$ be a glc $ Q$-g-pair induced by a canonical bundle formula$/U$ of $f: (X,,)arrow Z$. By Lemma [lem: glc centers come from cbf], the glc centers of $(Z,_Z,)$ are exactly the glc centers of $f: (X,,)arrow Z$. Thus we can assume that $f$ is the identity and $(X,,)=(Z,_Z,)$.
Let $g:Y X$ be a log resolution such that $$ descends to $Y$ and $F:=g^-1(W)_$ is an snc divisor. Let
$$
K_Y+_Y+_Y:=g^*(K_X++_X).
$$
and $D:=_Y^=1$. Since $_Y$ is nef$/X$ and big$/X$, there exists $0'_Y_,X_Y$ such that $(Y,_Y-D+'_Y)$ is sub-klt. Let $_Y:=(_Y-D+'_Y)^0$ and $E:=(_Y-D+'_Y)^ 0$, then $_Y=0$ and $E$ is exceptional over $X$. Possibly replacing $Y$ with a higher resolution, we may assume that $D+E+_Y$ is snc.
Since $E-D-F$, we have natural maps:
$$
g_*_Y(-F) Rg_*_Y(-F) Rg_*_Y(E-D).
$$
Since $E-D_,XK_Y+_Y$, by [Theorem 10.41]Kol13,
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
Let $(X,S_*)$ be a stratified scheme of glc origin (Definition [defn: of glc origin]). Then $X$ is Du Bois.
We use induction on the dimension.
Let $: (X^n,S^n_*) (X,S_*)$ denote the normalization. Let $B(X) X$ and
$B(X^n) X^n$ denote the corresponding boundaries. By [9.15.1]Kol13, we have a universal push-out diagram
$
B(X^n)@^(->[r]@->[d] & X^n@->[d]^
B(X)@^(->[r]& X
$
Notice that $B(X)$ and $B(X^n)$ are of glc origin by Lemma [lem: glc stratification is of glc origin], hence Du Bois by induction.
Since $$ is finite, it follows that $R_*_B(X^n) X^n=_*_B(X^n) X^n$. Furthermore, $_*_B(X^n) X^n=_B(X) X$ by [Theorem 9.30]Kol13. By [Theorem 3.3]Kov12 and Lemma [lem: property of DB pairs], we only need to show that $X^n$ is Du Bois. By assumption, for each irreducible component $X_i^n X^n$ there is a glc crepant log structure $f_i:(Y_i,_i,) Z_i$ and a finite surjection $Z_i X_i^n$. By [Corollary 2.5]Kov99, we only need to show that $Z_i$ is Du Bois for each $i$. Let $B(Z_i) Z_i$ be the boundary of the glc stratification of $Z_i$. Then $B(Z_i)$ is of glc origin by Lemma [lem: glc stratification is of glc origin], hence Du Bois by induction. By Theorem [thm: (Z,W) is DB for glc crepant log structure], $(Z_i,B(Z_i))$ is a DB pair, hence $Z_i$ is Du Bois and we are done.
After finishing the first draft of the paper, the authors note the results [Theorems 1,12]KK22 proving the Du Bois property of varieties $V X$ such that $(V,X,)( X)$ for some lc pair $(X,)$, where $( X)$ is the $1$-gap of lc thresholds. With the methods established in Sections [sec: gluing] and [sec: DB singularity], we may also prove the g-pair versions of [Theorems 1,12]KK22 by using the same arguments as in [KK22]. In fact, as mentioned in [Proof of Theorems 1 and 12]KK22, a quasi-log structure [Fuj17] version of [Theorems 1,12]KK22 is expected and is used implicitly in [Proof of Proposition 16]KK22, while any qlc pair is always a glc g-pair [Remark 1.9]Fuj22.
# Proof of the main theorems
In this section we prove the main theorems, which are consequences of Theorems [thm: semi-ample over U0 implies semi-ample over U], [thm: nef imply semi-ample] and [thm: of glc origin implies DB].
[Proof of Theorem [thm: gmm over U0 implies gmm over U]]
By [Theorem 3.14]HL21a, possibly replacing $(X,B,)$ with a gdlt model, we may assume that $(X,B,)$ is $ Q$-factorial gdlt. We run a $(K_X+B+_X)$-MMP$/U$ with scaling of an ample divisor
$$(X,B,):=(X_0,B_0,) (X_1,B_1,) (X_i,B_i,).$$
By [Lemma 2.7]LX22, possibly replacing $(X,B,)$ with $(X_n,B_n,)$ for some $n 0$, we may assume that this MMP is an isomorphism over $U^0$ and $(X^0,B^0,^0)/U^0$ is a good minimal model of itself. Since every glc center of $(X,B,)$ intersects $X^0$ and $K_X_i+B_i+_X_i$ is semi-ample over $U^0$, $(X_i,B_i,)$ is log abundant$/U$ for any $i$. By [Theorem 7.6]LX22, the MMP terminates with a log minimal model $( X, B,)/U$ of $(X,B,)/U$. Theorem [thm: semi-ample over U0 implies semi-ample over U], $( X, B,)/U$ is a good minimal model of $(X,B,)/U$.
[Proof of Theorem [thm: gmm exists for g-crepant log structure]]
Since termination and semi-ampleness$/Z$ are both local on $Z$, we may assume that $Z$ is affine. By [Theorem 1.3]LX22 we get (1)(3). Possibly replacing $(X,B,)$ with $(Y,B_Y,)$ and replacing $A$ accordingly, we may assume that $K_X+B+_X$ is nef$/Z$, and we only need to show that $K_X+B+_X$ is semi-ample$/Z$.
Let $g: Warrow X$ be a gdlt modification of $(X,B+A,)$, $0< 1$ a real number, $A_W:=g^*A$, and $K_W+B_W+A_W+_W:=g^*(K_X+B+A+_X)$, then $(W,_W:=B_W+(1-)A_W,)$ is gdlt, $(W,_W+ A_W,)$ is glc, and $K_W+_W+_W+ A_W_ R,Z0$. By Theorem [thm: nef imply semi-ample],
$$ g^*(K_X+B+_X)_ R,Z-^*A=- A_W_ R,ZK_W+_W+_W$$
is semi-ample$/Z$, hence $K_X+B+_X$ is semi-ample$/Z$, and we are done.
[Proof of Theorem [thm: glc flip exists]]
Since $-(K_X+B+_X)$ is ample$/Z$, there exists an $ R$-divisor $0 A_ R,Z-(K_X+B+_X)$ such that $(X,B+A,)$ is glc. By Theorem [thm: gmm exists for g-crepant log structure], there exists a good minimal model $(X',B',)/Z$ of $(X,B,)/Z$. We let $h: X'arrow X^+$ be the birational morphism$/Z$ defined by $K_X'+B'+_X'$ and let $B^+:=h_*B'$.
We only need to show that the induce birational map $f^+: X^+arrow Z$ is small. Let $p:W X$ and $q:W X'$ be a resolution of indeterminacy of $X X'$. Then $p^*(K_X+B+_X)=q^*(K_X'+B'+_X')+F$ where $F 0$ is exceptional over $X'$. Let $D$ be a prime divisor on $X'$ that is exceptional over $X$, and $D_W$ its strict transform on $W$. Then $D_W$ is covered by a family of $p$-vertical curves $ _t$ such that $_t p^*(K_X+B_X+_X)=0$. Since $F_t 0$, $_t q^*(K_X'+B'+_X') 0$.
Let $'_t=q_* _t$, then $ ' _t (K_X'+B'+_X') 0$ so that $ '_t$ are contracted by $X' X^+$ and hence $D$ is also contracted. Thus $X X^+$ does not extract any divisor, and $f^+$ is a $(K_X+B+_X)$-flip.
[Proof of Theorem [thm: extracting divisor over glc structure]]
Let $g: Yarrow X$ be a log resolution of $(X, B)$ such that $$ descends to $Y$ and $E$ is a divisor on $Y$. Let $a:=a(E,X,B,)[0,1)$ and $D:=(f)$. Let $B_Y:=g^-1_*B+D-aE$, then $(Y,B_Y-aE,)$ is $ Q$-factorial gdlt. Thus $K_Y+B_Y-aE+_Y_ R,XF 0$ for some $ R$-divisor $F$ such that $E F$. By [Lemma 2.3]LX22, we may run a $(K_Y+B_Y-aE+_Y)$-MMP$/X$ with scaling of an ample divisor which terminates with a good minimal model $(W,B_W,)/X$ of $(Y,B_Y-aE,)/X$ and the induced birational map $Y W$ only contracts $F$. In particular, $E$ is still a divisor on $W$, and we let $E_W$ be the strict transform of $E$ on $E_W$. Then $_E_WB_W=1-a>0$.
We may run a $(K_W+B_W-(1-a)E_W+_W)$-MMP$/X$ with scaling of an ample divisor. Since $(W,B_W,)/X$ is gdlt and $K_W+B_W+_W_ R,X0$, by Theorem [thm: gmm exists for g-crepant log structure], this MMP terminates with a good minimal model $(Z',B_Z'-(1-a)E_Z',)/X$ of $(W,B_W-(1-a)E_W,)/X$, where $B_Z'$ and $E_Z'$ are the strict transforms of $B_W$ and $E_W$ on $Z'$ respectively. Thus $-(1-a)E_Z'_ R,XK_Z'+B_Z'-(1-a)E_Z'+_Z'$ is semi-ample$/X$, hence defines a birational morphism $Z'arrow Z$ over $X$. We let $B_Z$ and $E_Z$ be the strict transforms of $B_Z'$ and $E_Z'$ on $Z$ respectively, and let $f: Zarrow X$ be the induced morphism.
If $E_Z=0$, then $f$ is the identity map since $-E_Z$ is ample$/X$. Thus $B_Z=B$, so $a(E,Z,B_Z,)=a(E,X,B,)=a$. We have
which is not impossible.
Therefore, $E_Z$ is a prime divisor on $Z$ and $-E_Z$ is ample over $X$, hence $ E_Z$ contains all the exceptional locus on $Z$ and $f$ is an isomorphism away from $f(E_Z)$. In particular, $f$ only extracts $E$.
[Proof of Theorem [thm: finite generation of R(X,A)]]
By Remark [rem: to q coefficients], we can assume $(X,B,)$ is a $$-g-pair. Let $g: Yarrow X$ be a $ Q$-factorial gdlt modification of $(X,B,)$ and $K_Y+B_Y+_Y:=g^*(K_X+B+_X)$. Since $ D$ does not contain any glc center of $(X,B,)$, then Cartier locus of $_X(-D)$ contains every generic point of the glc centers of $(X,B,)$. We may replace $D$ with $-A$ such that $A 0$ and $ A$ contains no glc center of $(X,B,)$. Let $0 C -A$ be a divisor such that $C$ contains no glc centers of $(X,B,)$, then $A+C$ is Cartier and also contains no glc centers of $(X,B,)$. We may find an integral divisor $A_Y g^*(A+C)$ such that $A_Y 0$ and $g(A_Y)=A$.
Let $0< 1$ be a rational number and $_Y:=B_Y+ g^*(A+C)- A_Y$. Then $(Y,_Y+ A_Y,)$ is $ Q$-factorial gdlt and $K_Y+_Y+ A_Y+_Y_,X0$.
By Theorem [thm: gmm exists for g-crepant log structure], we may run a $(K_Y+_Y+_Y)$-MMP$/X$ which terminates with a good minimal model $(Z,_Z,)/X$ of $(Y,_Y,)/X$ with induced birational morphism $h: Zarrow X$. Let $A_Z$ be the strict transform of $A_Y$ on $Z$, then $-A_Z_,XK_Z+_Z+_Z$ is semi-ample$/X$, hence $R(Z/X,-A_Z)=R(X,-A)$ is a finite generated $_X$-algebra.
[Proof of Theorem [thm: glc sings are Du Bois]]
Let $W$ be any union of the glc centers, then by Lemma [lem: glc stratification is of glc origin] the induced stratified space $(W,S_*)$ is of glc origin. Theorem [thm: glc sings are Du Bois] follows from Theorem [thm: of glc origin implies DB].
[Amb03]Amb03 F. Ambro, Quasi-log varieties, Tr. Mat. Inst. Steklova 240 (2003), Biratsion. Geom. Linein. Sist. Konechno Porozhdennye Algebry, 220--239; translation in Proc. Steklov Inst. Math. 240 (2003), no. 1, 214--233.
[Bir12]Bir12 C. Birkar, Existence of log canonical flips and a special LMMP, Pub. Math. IHES., 115 (2012), 325--368.
[Bir19]Bir19 C. Birkar, Anti-pluricanonical systems on Fano varieties. Ann. of Math. (2), 190 (2019), 345--463.
[Bir20]Bir20 C. Birkar, On connectedness of non-klt loci of singularities of pairs, arXiv: 2010.08226v2, to appear in J. Differential Geom.
[Bir21a]Bir21a
C.~Birkar, Singularities of linear systems and boundedness of Fano varieties, Ann. of Math. 193 (2021), no. 2, 347--405.
[Bir21b]Bir21b C. Birkar, Generalised pairs in birational geometry, EMS Surv. Math. Sci. 8 (2021), 5--24.
[BCHM10]BCHM10
C. Birkar, P. Cascini, C. D. Hacon and J. M, Existence of minimal models for varieties of log general type, J. Amer. Math. Soc. 23 (2010), no. 2, 405--468.
[BH22]BH22 C. Birkar and C. D. Hacon, Variations of generalised pairs, arXiv: 2204.10456v1.
[BZ16]BZ16 C. Birkar and D.-Q. Zhang, Effectivity of Iitaka fibrations and pluricanonical systems of polarized pairs, Pub. Math. IHES. 123 (2016), 283--331.
[Che20]Che20 G. Chen, Boundedness of $n$-complements for generalized pairs, arXiv: 2003.04237v2.
[Fil20]Fil20 S. Filipazzi, On a generalized canonical bundle formula and generalized adjunction, Ann. Sc. Norm. Super. Pisa Cl. Sci. (5) Vol. XXI (2020), 1187--1221.
[FS20]FS20 S. Filipazzi and R. Svaldi, On the connectedness principle and dual complexes for generalized pairs, arXiv:2010.08018v2.
[Fuj07]Fuj07 O. Fujino, Special termination and reduction to pl flips, In Flips for 3--folds and 4--folds, Oxford University Press (2007).
[Fuj17]Fuj17 O. Fujino, Foundations of the minimal model program, MSJ Memoirs 35 (2017), Mathematical Society of Japan, Tokyo.
[Fuj22]Fuj22 O. Fujino, Fundamental Properties of Basic Slc-Trivial Fibrations I, Publ. RIMS Kyoto Univ. 58 (2022), 473--526.
[FG14]FG14 O. Fujino and Y. Gongyo, Log pluricanonical representations and abundance conjecture, Compos. Math. 150 (2014), no. 4, 593--620.
[HL21a]HL21a C. D. Hacon and J. Liu, Existence of generalized lc flips, arXiv:2105.13590v3.
[HL22]HL22 J. Han and Z. Li, Weak Zariski decompositions and log terminal models for generalized polarized pairs, Math. Z. 302 (2022), 707--741.
[HX13]HX13 C. D. Hacon and C. Xu, Existence of log canonical closures, Invent. Math. 192 (2013), no. 1, 161--195.
[HX16]HX16 C. D. Hacon and C. Xu, On finiteness of B-representations and semi-log canonical abundance in Minimal Models and Extremal Rays (Kyoto, 2011), Adv. Stud. Pure Math. 70 (2016), Math. Soc. Japan, Tokyo, 361--378.
[HLS19]HLS19 J. Han, J. Liu, and V. V. Shokurov, ACC for minimal log discrepancies of exceptional singularities, arXiv: 1903.04338v2.
[HL21b]HL21b J. Han and W. Liu, On a generalized canonical bundle formula for generically finite morphisms, Annales de l'Institut Fourier, 71 (2021), no. 5, 2047--2077.
[Has19]Has19 K. Hashizume, Remarks on special kinds of the relative log minimal model program, Manuscripta Math. 160 (2019), no. 3, 285--314.
[Has20a]Has20a K. Hashizume, Finiteness of log abundant log canonical pairs in log minimal model program with scaling, arXiv: 2005.12253v3.
[Has20b]Has20b K. Hashizume, Non-vanishing theorem for generalized log canonical pairs with a polarization, arXiv: 2012.15038v1.
[Has22]Has22 K. Hashizume, Iitaka fibrations for dlt pairs polarized by a nef and log big divisor, arXiv:2203.05467v3.
[Hu21]Hu21 Z. Hu, An abundance theroem for generalised pairs, arXiv: 2103.11813v1.
[JLX22]JLX22 J. Jiao, J. Liu, and L. Xie, On generalized lc pairs with b-log abundant nef part, arXiv:2202.11256v2.
[Kol13]Kol13 J. Koll\'ar, Singularities of the minimal model program, Cambridge Tracts in Math. 200 (2013), Cambridge Univ. Press. With a collaboration of S\'andor Kov\'acs.
[KM98]KM98 J. Koll\'ar and S. Mori, Birational geometry of algebraic varieties, Cambridge Tracts in Math. 134 (1998), Cambridge Univ. Press.
[Kov99]Kov99 S. J. Kov\'acs, Rational, log canonical, Du Bois singularities: on the conjectures of Koll\'ar and Steenbrink, Compositio Math. 118 (1999), no. 2, 123--133.
[Kov11]Kov11 S. J. Kov\'acs, DB pairs and vanishing theorems, Kyoto Journal of Mathematics, Nagata Memorial Issue 51 (2011), no. 1, 47--69.
[Kov12]Kov12 S. J. Kov\'acs, The splitting principle and singularities, Compact moduli spaces and vector bundles, Contemp. Math. vol. 564, Amer. Math. Soc. Providence, RI (2012), 195--204.
[KK10]KK10 J. Koll\'ar and S. J. Kov\'acs. Log canonical singularities are Du Bois, J. Amer. Math. Soc. 23 (2010), no. 3, 791--813.
[KK22]KK22 J. Koll\'ar and S. J. Kov\'acs, Du Bois property of log centers, arXiv:2209.14480v1.
[LT21]LT21 V. Lazi\'c and N. Tsakanikas, Special MMP for log canonical generalised pairs (with an appendix joint with Xiaowei Jiang), arXiv:2108.00993v5, to appear in Sel. Math. New Ser.
[LPMTX22]LPMTX22 V. Lazi\'c, S. Matsumura, T. Peternell, N. Tsakanikas, and Z. Xie, The Nonvanishing problem for varieties with nef anticanonical bundle, arXiv: 2202.13814v3.
[LX22]LX22 J. Liu and L. Xie, Relative Nakayama-Zariski decomposition and minimal models of generalized pairs, arXiv:2207.09576v3.
[Sho00]Sho00 V.V.~Shokurov, Complements on surfaces, J. Math. Sci. (New York) 102 (2000), no. 2, 3876--3932.
[Sho20]Sho20 V. V. Shokurov, Existence and boundedness of n-complements, arXiv:2012.06495v1.