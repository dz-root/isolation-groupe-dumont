<script>
	import Footer from '$lib/Footer.svelte';
  	import ImgSlider from '$lib/ImgSlider.svelte';
  	import InfinitSlide from '$lib/InfinitSlide.svelte';
	import TexxtSlider from '$lib/TexxtSlider.svelte';
	import Form from '$lib/Form.svelte';

</script>


<div class="flex w-full bg-gray-50 items-center justify-center pb-10 lg:py-10" >

	<div class="w-full sm:w-11/12 xl:w-10/12 2xl:w-7/12 grid grid-cols-1 lg:grid-cols-2 p-5 gap-3">
		<div class="flex flex-col gap-5">
			<TexxtSlider></TexxtSlider>
			<h1 class="text-center lg:text-left text-3xl md:text-4xl xl:text-6xl font-extrabold">
				Profitez des <span class="text-green-500 italic">Aides de l'Etat</span> pour vos Travaux d'isolation
			</h1>
			<p class="text-center lg:text-left text-lg sm:text-xl">Savez-vous qu'en isolant entièrement votre maison, vous pouvez réaliser jusqu'à <span class="font-bold underline decoration-green-500 decoration-4 underline-offset-4">70% d'économies </span> d'énergie ?</p>
			<div class="flex justify-end">
				<img src="arrow.png" alt="" class="hidden lg:block w-[80px] -mt-10 -mr-10 z-10">
			</div>
			<div class="flex flex-col items-center sm:items-start gap-1">
				<p class="text-xs">Votre DPE améliorer</p>
				<div class="flex items-center justify-center sm:justify-start gap-1 mb-5">
					<div class="flex border-2 border-green-500 rounded-md gap-1 p-1">
						<span class="text-xs bg-green-700 font-bold text-white px-1.5 py-0.5 rounded-sm">A</span>
						<span class="text-xs bg-green-600 font-bold text-white px-1.5 py-0.5 rounded-sm">B</span>
						<span class="text-xs bg-green-400 font-bold text-white px-1.5 py-0.5 rounded-sm">C</span>
					</div>
					<span class="text-xs bg-yellow-500 font-bold text-white px-1.5 py-0.5 rounded-sm">D</span>
					<span class="text-xs bg-orange-500 font-bold text-white px-1.5 py-0.5 rounded-sm">E</span>
					<span class="text-xs bg-orange-600 font-bold text-white px-1.5 py-0.5 rounded-sm">F</span>
					<span class="text-xs bg-red-600 font-bold text-white px-1.5 py-0.5 rounded-sm">G</span>
				</div>
			</div>
		</div>
		<div class="w-full bg-white p-5 border-2 border-green-500 shadow-xl rounded-lg" id="test-elegibilite">
			<img src="./rge.png" class ="w-12 sm:w-16 -mt-12 -ml-4 sm:ml-0" alt="Norme RGE">
			<h3 class=" text-gray-700 text-center text-sm">Testez votre éligibilité en <span class="font-bold">⏱️30 secondes</span></h3>
			<Form></Form>
			<p class="text-xs text-center mt-5 text-gray-500">
				En soumettant votre demande, vous acceptez que Groupe Dumont vous contactent et utilisent les données recueillies afin de vous proposer une offre adaptée à vos besoins. Pour en savoir plus sur la gestion de vos données personnelles et pour exercer vos droits, veuillez consulter notre 
				<a href="https://groupedumont.fr/politique-de-confidentialite/" class="text-green-500">Politique de Confidentialité*</a>
			</p>
		</div>
	</div>
</div>

<InfinitSlide></InfinitSlide>

<div class="w-full flex items-center justify-center bg-green-100 py-10">
	<div class="w-full sm:w-11/12 xl:w-10/12 2xl:w-7/12 grid grid-cols-1 lg:grid-cols-2 p-5 gap-5">
		<div class="">
			<div class="">
				<ImgSlider></ImgSlider>
			</div>
		</div>
	
		<div class="w-full flex flex-col justify-center py-10">
			<h2 class="text-lg sm:text-2xl font-bold uppercase mb-5">Simplifiez vos démarches et <span class="underline decoration-green-500 decoration-4 underline-offset-4">bénéficiez des subventions adaptées à vos projets.</span></h2>
			<p class="text-sm">
				Le groupe Dumont vous accompagne dans tous vos projets de rénovation et travaux d’ampleur en vous permettant de bénéficier des aides de l’État, <strong>jusqu’à 80% de financement</strong>. Spécialisés dans la gestion des démarches administratives et techniques, nous simplifions votre accès aux subventions telles que MonProjet Anah, les Certificats d’Économie d’Énergie (CEE) ou encore l’éco-prêt à taux zéro.			<p class="mb-5">
			</p>
			<p class="mb-10">Notre équipe prend en charge chaque étape de votre projet : analyse de votre éligibilité, constitution des dossiers, suivi des travaux avec des professionnels certifiés RGE, et obtention des financements adaptés. 	</p>
			<div class="flex">
				<a href="#test-elegibilite" type="button" class="flex items-center gap-3 bg-white shadow-lg text-green-500 border  border-green-500 px-5 py-1.5 rounded-full hover:bg-green-600 hover:text-white transition ease-in-out font-bold">
					<span class="relative flex h-3 w-3">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
					</span>
					Tester mon éligibilité
					<svg class="w-6" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"></path>
					</svg>
				</a>
			</div>
		</div>

	</div>
</div>

<div class="w-full flex flex-col bg-gray-50 items-center justify-center py-10">
	<div class="flex items-start sm:items-center">
		<img src="https://d9hhrg4mnvzow.cloudfront.net/isolation-exterieure.mes-aides-energie.fr/isolation-1/10925316-shutterstock-1865759740-removebg-preview_101o01o000000000000028.png" class="w-14" alt="">
		<h2 class="text-xl sm:text-2xl font-bold">Vos travaux d'isolation en <span class="underline decoration-green-500 decoration-4 underline-offset-4">4 étapes</span> simples</h2>
	</div>
	<div class="w-full sm:w-11/12 xl:w-10/12 2xl:w-7/12 grid grid-cols-1 md:grid-cols-2 p-8 gap-3">
		<ol class="relative text-gray-70 border-s border-green-400 ">                  
			<li class="mb-10 ms-6">            
				<span class="absolute flex items-center justify-center w-8 h-8 bg-green-500 rounded-full -start-4 ring-4 ring-white">
					<svg class="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
					</svg>
				</span>
				<h3 class="font-medium leading-tight">Je remplis le formulaire d'éligibilité</h3>
				<p class="text-sm">⏱️ En 2 minutes<sup> (max)</sup>.</p>
			</li>
			<li class="mb-10 ms-6">
				<span class="absolute flex items-center justify-center w-8 h-8 bg-green-500 rounded-full -start-4 ring-4 ring-white">
					<svg class="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
						<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
					</svg>
				</span>
				<h3 class="font-medium leading-tight">Un technicien interne vous contacte</h3>
				<p class="text-sm">📞 En moins de 48h </p>
			</li>
			<li class="mb-10 ms-6">
				<span class="absolute flex items-center justify-center w-8 h-8 bg-green-500 rounded-full -start-4 ring-4 ring-white">
					<svg class="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
						<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
					</svg>
				</span>
				<h3 class="font-medium leading-tight">Vous obtenez vos aides pour financer vos travaux</h3>
				<p class="text-sm">✅ Selon votre éligibilité</p>
			</li>
			<li class="ms-6">
				<span class="absolute flex items-center justify-center w-8 h-8 bg-green-500 rounded-full -start-4 ring-4 ring-white">
					<svg class="w-3.5 h-3.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
						<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
					</svg>
				</span>
				<h3 class="font-medium leading-tight">Mes travaux sont réalisés rapidement</h3>
				<p class="text-sm">🌳 Certifier RGE</p>
			</li>
		</ol>
		<div class="order-first mb-5 md:order-last">
			<img src="https://www.qualitel.org/particuliers/uploads/DPE-A.jpg" alt="" class="rounded-lg">
		</div>
	</div>	
</div>


<div class="w-full flex items-center justify-center py-20 object-cover bg-fixed" style="background-image: url(./bg-dumont.png);">
	<div class="w-full sm:w-11/12 xl:w-10/12 2xl:w-7/12 flex flex-col items-center justify-center">
		<h2 class="text-4xl text-center font-bold mb-2 p-3">Prêt à passer à l'isolation votre maison ?</h2>
		
			<a href="#test-elegibilite" type="button" class="flex items-center gap-3 bg-white shadow-lg text-green-500 border  border-green-500 px-5 py-1.5 rounded-full hover:bg-green-600 hover:text-white transition ease-in-out font-bold">
				<span class="relative flex h-3 w-3">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
				</span>
				Tester votre éligibilité
				<svg class="w-6" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"></path>
				</svg>
			</a>
	
	</div>
</div>

<InfinitSlide></InfinitSlide>

<div class="w-full flex flex-col items-center justify-center bg-gray-50 py-20 gap-5 p-5">
	<h2 class="text-2xl font-bold mb-5 text-center">Les principaux avantage de l'isolation par l'extérieur</h2>
	<div class="w-full sm:w-11/12 xl:w-10/12 2xl:w-7/12 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-10">
		<div class="flex flex-col justify-center items-center bg-white p-5 shadow-md rounded-xl">
			<img src="./aides.png" class="w-16" alt="">
			<p class="text-xs sm:text-base text-center sm:mx-5"><span class="font-bold text-green-500">Jusqu'a 80%</span> financer par les aides de l'Etat.</p>
		</div>
		<div class="flex flex-col justify-center items-center bg-white p-5 shadow-md rounded-xl">
			<img src="./valorisation.png" class="w-16" alt="">
			<p class="text-xs sm:text-base text-center sm:mx-5"><span class="font-bold text-green-500">Valorisation</span> de votre logement. <span class="font-bold text-green-500">de 15 à 25%</span></p>
		</div>
		<div class="flex flex-col justify-center items-center bg-white p-5 shadow-md rounded-xl">
			<img src="./economy.png" class="w-16" alt="">
			<p class="text-xs sm:text-base text-center sm:mx-5"><span class="font-bold text-green-500">70% d'économies</span> sur votre facture d'énergie.</p>
		</div>
		<div class="flex flex-col justify-center items-center bg-white p-5 shadow-md rounded-xl">
			<img src="./gain_de_class.png" class="w-16" alt="">
			<p class="text-xs sm:text-base text-center sm:mx-5"><span class="font-bold text-green-500">Gain de classes énergétiques</span> sur votre DPE.</p>
		</div>
		<div class="flex flex-col justify-center items-center bg-white p-5 shadow-md rounded-xl">
			<img src="./sans_avance.png" class="w-16" alt="">
			<p class="text-xs sm:text-base text-center sm:mx-5"><span class="font-bold text-green-500">Pas d'avance</span> de frais à faire sur vos travaux.</p>
		</div>
		<div class="flex flex-col justify-center items-center bg-white p-5 shadow-md rounded-xl">
			<img src="./sans_impcat.png" class="w-16" alt="">
			<p class="text-xs sm:text-base text-center sm:mx-5"><span class="font-bold text-green-500">Travaux sans impact</span> sur votre vie quotidienne.</p>
		</div>
	</div>
</div>
<div class="w-full flex items-center justify-center p-3 sm:hidden">
	<a href="#test-elegibilite" class="flex items-center justify-center w-full bg-green-500 text-white px-5 py-2.5 rounded-md uppercase text-sm font-bold shadow-xl">testez votre éligibilité gratuitement</a>
</div>

<Footer></Footer>

