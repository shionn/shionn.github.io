
Cet article compile divers information que je cherche souvent sur les processeurs ryzen :

## Modeles

### Apu pour petit ordinateur portable

 Leur nommage n'est pas vraiment constant, voici un petit tableau qui resume les informataion que j'ai trouvé sur les processeurs à destination des petits pc prtoable basse conssomation la serie des Z

<table class="boxed">
	<thead>
		<tr>
			<th>Nom</th>
			<th>Coeur</th>
			<th>Arch</th>
			<th>Freq</th>
			<th>L2+L3</th>
			<th>CU</th>
			<th>Arch</th>
			<th>TDP</th>
			<th>Ram</th>
			<th>NPU</th>
			<th>Console</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Aerith</td>
			<td>4/8</td><td>Zen2</td><td>2.4-3.5Ghz</td><td>?</td>
			<td>8Cu</td><td>Rdna2</td>
			<td>?</td><td>LPDDR5</td>
			<td>-</td>
			<td>Steam Deck</td>
		</tr>
		<tr>
			<td>Z1 Extreme</td>
			<td>8/16</td><td>Zen4</td><td>3.3-5.1Ghz</td><td>8+16Mb</td>
			<td>12CU</td><td>Rdna3</td>
			<td>9-30W (28)</td><td>LPDDR5X</td>
			<td>-</td>
			<td>Rog Ally, Legion Go</td>
		</tr>
		<tr>
			<td>Z1</td>
			<td>6(2+4c)/12</td><td>Zen4/c</td><td>3.2-4.9Ghz</td><td>6+16Mb</td>
			<td>4CU</td><td>Rdna3</td>
			<td>9-30W (28)</td><td>LPDDR5X</td>
			<td>-</td>
			<td>Rog Ally</td>
		</tr>
		<tr>
			<td>Z2 Extreme AI</td>
			<td>8(3+5c)/16</td><td>Zen5/c</td><td>2.0-5Ghz</td><td>8+16Mb</td>
			<td>16CU</td><td>Rdna3.5</td>
			<td>15-35W (28)</td><td>LPDDR5X</td>
			<td>50 ?</td>
			<td>Rog Xbox Ally X</td>
		</tr>
		<tr>
			<td>Z2 Extreme</td>
			<td>8(3+5c)/16</td><td>Zen5/c</td><td>2.0-5Ghz</td><td>8+16Mb</td>
			<td>16CU</td><td>Rdna3.5</td>
			<td>15-35W (28)</td><td>LPDDR5X</td>
			<td>-</td>
			<td>?</td>
		</tr>
		<tr>
			<td>Z2</td>
			<td>8(??)/16</td><td>Zen4</td><td>3.3-5.1Ghz</td><td>8+16Mb</td>
			<td>12Cu</td><td>Rdna3</td>
			<td>15-30W (28)</td><td>LPDDR5X</td>
			<td>-</td>
			<td>?</td>
		</tr>
		<tr>
			<td>Z2 Go</td>
			<td>4/8</td><td>Zen3+</td><td>3.0-4.3Ghz</td><td>2+8Mb</td>
			<td>12Cu</td><td>Rdna2</td>
			<td>15-30W (28)</td><td>LPDDR5</td>
			<td>-</td>
			<td>Legion Go S Z2 GO</td>
		</tr>
		<tr>
			<td>Z2 1</td>
			<td>4/8</td><td>Zen2</td><td>?</td><td>?</td>
			<td>8Cu</td><td>Rdna2</td>
			<td>6-20W (28)</td><td>LPDDR5</td>
			<td>-</td>
			<td>Rog Xbox Ally X</td>
		</tr>
	</tbody>
</table>
	
- [AMD](https://www.amd.com/en/products/specifications/processors.html)
- [Frandroid](https://www.frandroid.com/events/ces/2456408_amd-z2-extreme-et-go-devoiles-performances-en-hausse-pour-les-pc-consoles-portables)
- [LTT](https://www.youtube.com/watch?v=mNP-qhGdWvM)
- [videocardz](https://videocardz.com/newz/amd-announces-ryzen-ai-z2-extreme-and-ryzen-z2-a-apus-for-gaming-handhelds)

## Overclocking 

### Reglage R7 5800XD3 PBO
Originellement l'accès à ces réglages n'étaient pas permis sur ce processeur. Heureusement au fur et à mesure des mise à jour du PBO ça a été permis. 

Voici quelque réglage trouvé sur [reddit](https://www.reddit.com/r/Amd/comments/11qgb1v/suggested_ppt_tdc_edc_for_5800x3d/) : 
[table class="collection" title="PBO R7 5800X3D" cols="#,PPT,TDC,EDC"]
défaut	142	95	140
gaming	122	82	124
heavy multi work	114	75	115
lower power gaming	100	65	90 
[/table]

