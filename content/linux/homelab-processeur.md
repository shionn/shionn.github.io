
Si comme moi vous avez un homelab, ou si vous aimer simplement le matos informatique beaucoup trop cher, 
vous avez forcement du vous perdre un peu avec les références de ces processeurs.

Je vais lister ici les diverses gammes de processeurs __"achetable"__ que l'ont trouve sur le marché d'occasion (et chinois).

## Processeur Intel Xeon

<table class="boxed">
	<thead>
		<tr>
			<th>Famille</th>
			<th>Reference</th>
			<th>Micro Arch.</th>
			<th>Gravure</th>
			<th>Socket</th>
			<th>Memoire</th>
			<th>Année</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="4">Xeon E5</td>
			<td>E5-x600-v1</td>
			<td>Sandy Bridge</td>
			<td rowspan="3">22 nm</td>
			<td rowspan="2">LGA2011</td>
			<td rowspan="2">DDR3</td>
			<td>2011</td>
		</tr>
		<tr>
			<td>E5-x600-v2</td>
			<td>Ivy Bridge</td>
			<td>2013</td>
		</tr>
		<tr>
			<td>E5-x600-v3</td>
			<td>Haswell</td>
			<td rowspan="2">LGA2011-3</td>
			<td>DDR3 / DRR4</td>
			<td>2014</td>
		</tr>
		<tr>
			<td>E5-x600-v4</td>
			<td>Broadwell</td>
			<td rowspan="3">14 nm</td>
			<td rowspan="3">DRR4</td>
			<td>2016</td>
		</tr>
		<tr>
			<td rowspan="2">Xeon W</td>
			<td>W-x100</td>
			<td>Skylake</td>
			<td rowspan="2">LGA3647</td>
			<td>2017</td>
		</tr>
		<tr>
			<td>W-x200</td>
			<td>Cascade Lake</td>
			<td>2019</td>
		</tr>
	</tbody>
</table>

### Xeon E5 

Décodage d'une référence : __E5-2650L v4__
* E5 : Gamme, il existe également E3 et E7. 
	- E3 : est orienté _workstation_
	- E5 : serveur 
	- E7 : Serveur haut de gamme.
* 2 : nombre de socket maximal
* 4/6 : desktop / serveur
	- 4 socket desktop
	- 6 socket serveur
* 50 : SKU, influe sui le nombre de coeur / frequence. 
* L : TDP 
	- L : processeur basse consso
	- ? : je ne connais pas d'autre suffix
* v4 : Architecture (cf tableau)
	- v1 : est generalement homis


### Xeon W 

Décodage d'une référence : __W-4245M__
* W- constante
* 4 : Gamme Commercial : 
	- 3 : Bronze
	- 4 : Silver
	- 5/6 : Gold
	- 8/9 : Platinium
* 1 : Generation 
	- 1 : Skylake
	- 2 : Cascade Lake
* 45 : SKU
* M : Suffix
	- F : ???
	- L : Peu supporter 4.5TiO de Ram
	- M : Peu supporter 2TiO de Ram
	- N : Special Network App
	- R : ???
	- S : Special Search App
	- T : ???
	- U : single socket
	- V : ???? 
	- Y : ????


