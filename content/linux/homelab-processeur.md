
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
			<th>Chipset</th>
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
			<td rowspan="2">X79/C602</td>
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
			<td rowspan="2">X99/C612</td>
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
			<td rowspan="2">X11/C621/C622</td>
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
* 50 : SKU, influe sur le nombre de coeur / frequence. 
* L : TDP 
	- L : processeur basse consso
	- ? : je ne connais pas d'autre suffix
* v4 : Architecture (cf tableau)
	- v1 : est generalement homis


### Xeon W 

Décodage d'une référence : __W-4245M__
* W- : Constante
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

## Threadripper / Epyc

<table class="boxed">
	<thead>
		<tr>
			<th>Famille</th>
			<th>Reference</th>
			<th>Micro Arch.</th>
			<th>Gravure</th>
			<th>Core</th>
			<th>Socket</th>
			<th>Chipset</th>
			<th>Memoire</th>
			<th>Pcie</th>
			<th>Année</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="5">Threadripper</td>
			<td>1900X</td>
			<td>Zen</td>
			<td>14 nm</td>
			<td>8 à 16</td>
			<td rowspan="2">sTR4</td>
			<td rowspan="2">X399</td>
			<td rowspan="5">DDR4</td>
			<td rowspan="2">60x 3.0</td>
			<td>2017</td>
		</tr>
		<tr>
			<td>2900(W)X</td>
			<td>Zen+</td>
			<td>12 nm</td>
			<td>12 à 32</td>
			<td>2018</td>
		</tr>
		<tr>
			<td>3900X</td>
			<td rowspan="2">Zen 2</td>
			<td rowspan="3">7 nm</td>
			<td>24 à 64</td>
			<td>sTR4x</td>
			<td>TRX40</td>
			<td>64x 4.0</td>
			<td>2019</td>
		</tr>
		<tr>
			<td>PRO 3900WX</td>
			<td rowspan="2">12 à 64</td>
			<td rowspan="2">sWRX8</td>
			<td rowspan="2">WRX80</td>
			<td rowspan="2">128x 4.0</td>
			<td>2020</td>
		</tr>
		<tr>
			<td>PRO 5900WX</td>
			<td>Zen 3</td>
			<td>2022</td>
		</tr>
		<tr>
			<td rowspan="3">Epyc</td>
			<td>7001</td>
			<td>Zen</td>
			<td>14 nm</td>
			<td>8-32</td>
			<td rowspan="3">SP3</td>
			<td rowspan="3">SOC</td>
			<td rowspan="3">DDR4</td>
			<td>128x 3.0</td>
			<td>2017</td>
		</tr>
		<tr>
			<td>7002</td>
			<td>Zen 2</td>
			<td rowspan="2">7 nm</td>
			<td rowspan="2">8-64</td>
			<td rowspan="2">128x 4.0</td>
			<td>2019</td>
		</tr>
		<tr>
			<td>7003</td>
			<td>Zen 3</td>
			<td>2021</td>
		</tr>
	</tbody>
</table>
	
