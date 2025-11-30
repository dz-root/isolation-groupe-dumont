<script>
	import { writable } from 'svelte/store';
	import { fade, slide } from 'svelte/transition';

	const currentStep = writable(1);
	const formData = writable({
		habitation: null,
		statut: null,
		codePostal: "",
		travaux: [],
		chauffage: null,
		foyer: null,
		revenus: null,
		informations: {
			nom: "",
			prenom: "",
			telephone: "",
			email: "",
		},
	});

	const isLoading = writable(false);

	const validateStep = () => {
		const data = $formData;

		switch ($currentStep) {
			case 1:
				return data.habitation !== null;
			case 2:
				return data.statut !== null;
			case 3:
				return data.codePostal !== "";
			case 4:
				return data.travaux.length > 0;
			case 5:
				return data.chauffage !== null;
			case 6:
				return data.foyer !== null;
			case 7:
				return data.revenus !== null;
			case 8:
				const { nom, prenom, telephone, email } = data.informations;
				return (
					nom.trim() &&
					prenom.trim() &&
					telephone.trim() &&
					email.trim()
				);
			default:
				return false;
		}
	};

	const nextStep = () => {
		if (validateStep()) {
			currentStep.update((step) => step + 1);
		} else {
			alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
		}
	};

	const prevStep = () => currentStep.update((step) => Math.max(1, step - 1));

	$: isIleDeFrance = (() => {
		const code = parseInt($formData.codePostal, 10);
		return (
			(!isNaN(code) && code >= 75000 && code <= 75020) ||
			(code >= 93000 && code <= 93999) ||
			(code >= 94000 && code <= 94999) ||
			(code >= 77000 && code <= 77999) ||
			(code >= 95000 && code <= 95999) ||
			(code >= 78999 && code <= 78999) ||
			(code >= 92000 && code <= 92999) ||
			(code >= 91000 && code <= 91999)
		);
	})();

	// Options dynamiques pour les revenus selon le foyer et le code postal
	$: revenueOptions = (() => {
		const foyer = parseInt($formData.foyer, 10);

		if (isNaN(foyer)) return []; // Retourne une liste vide si foyer n'est pas défini.

		if (isIleDeFrance) {
			switch (foyer) {
				case 1:
					return ["< 23.541 €", "< 28.657 €", "< 40.018 €", ">40.018 €"];
				case 2:
					return ["< 34.551 €", "< 42.058 €", "< 58.827 €", ">58.827 €"];
				case 3:
					return ["< 41.493 €", "< 50.513 €", "< 70.382 €", ">70.382 €"];
				case 4:
					return ["< 48.447 €", "< 58.981 €", "< 82.839 €", ">82.839 €"];
				case 5:
					return ["< 55.427 €", "< 67.473 €", "< 94.844 €", ">94.844 €"];
				case 6:
					return ["< 62.397 €", "< 75.959 €", "< 106.850 €", ">106.850 €"];
			}
		} else {
			switch (foyer) {
				case 1:
					return ["< 17.009 €", "< 21.805 €", "< 30.549 €", ">30.549 €"];
				case 2:
					return ["< 24.875 €", "< 31.889 €", "< 44.907 €", ">44.907 €"];
				case 3:
					return ["< 29.917 €", "< 38.349 €", "< 54.071 €", ">54.071 €"];
				case 4:
					return ["< 34.948 €", "44.802€", "< 63.235 €", ">63.235 €"];
				case 5:
					return ["< 40.002 €", "51.281 €", "< 72.400 €", ">54.071 €"];
				case 6:
					return ["< 45.047 €", "58.003 €", "< 81.565 €", ">81.565 €"];
			}
		}
		return [];
	})();

	const submitForm = async () => {
		try {
			isLoading.set(true);

			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify($formData),
			});

			if (response.ok) {
				currentStep.set(9);
			} else {
				alert("Une erreur est survenue lors de l’envoi du formulaire.");
			}
		} catch (err) {
			console.error("Erreur lors de la soumission du formulaire :", err);
			alert("Impossible de soumettre le formulaire. Veuillez réessayer.");
		} finally {
			isLoading.set(false);
		}
	};

	const handleSubmit = async () => {
		// Vérification des champs obligatoires avant envoi
		const { nom, prenom, telephone, email } = $formData.informations;

		if (!nom.trim() || !prenom.trim() || !telephone.trim() || !email.trim()) {
			alert(
				"Veuillez renseigner votre nom, prénom, téléphone et email avant de soumettre le formulaire."
			);
			return;
		}

		// Conversion Google Ads
		gtag("event", "conversion", {
			send_to: "AW-17656917653/4foTCPLQ1sMbEJXdvONB",
			value: 1.0,
			currency: "EUR",
		});

		await submitForm();
	};
</script>

<div class="grid grid-cols-8 mt-2">
	<div class="bg-green-500 py-0.5"></div>
	<div class="{$currentStep >= 2 ? 'bg-green-500' :'bg-gray-100'} py-0.5 transition-ease-in-out transition-colors duration-300"></div>
	<div class="{$currentStep >= 3 ? 'bg-green-500' :'bg-gray-100'} py-0.5 transition-ease-in-out transition-colors duration-300"></div>
	<div class="{$currentStep >= 4 ? 'bg-green-500' :'bg-gray-100'} py-0.5 transition-ease-in-out transition-colors duration-300"></div>
	<div class="{$currentStep >= 5 ? 'bg-green-500' :'bg-gray-100'} py-0.5 transition-ease-in-out transition-colors duration-300"></div>
	<div class="{$currentStep >= 6 ? 'bg-green-500' :'bg-gray-100'} py-0.5 transition-ease-in-out transition-colors duration-300"></div>
	<div class="{$currentStep >= 7 ? 'bg-green-500' :'bg-gray-100'} py-0.5 transition-ease-in-out transition-colors duration-300"></div>
	<div class="{$currentStep >= 8 ? 'bg-green-500' :'bg-gray-100'} py-0.5 transition-ease-in-out transition-colors duration-300"></div>
</div>

<form
	on:submit|preventDefault={handleSubmit}
	class="flex flex-col items-center justify-center h-full py-5 "
>
	{#if $currentStep === 1}
		<p class="text-sm font-medium mb-2">Votre type d'habitation :</p>
		<ul class="grid w-full gap-3 md:grid-cols-2">
			<li>
				<input
					type="radio"
					id="hosting-small"
					name="habitation"
					value="Maison"
					bind:group={$formData.habitation}
					class="hidden peer"
				/>
				<label
					for="hosting-small"
					class="inline-flex items-center w-full px-3 py-5 text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 "
				>
					<svg
						class="w-12"
						viewBox="0 0 75 75"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
					>
						<path
							stroke="currentColor"
							d="M 15.421875 50.765625 L 15.421875 74.234375 C 15.421875 74.820312 15.894531 75.300781 16.476562 75.300781 L 41.414062 75.300781 L 41.414062 54.054688 L 53.128906 54.054688 L 53.128906 75.300781 L 60.097656 75.300781 C 60.683594 75.300781 61.15625 74.820312 61.15625 74.234375 L 61.15625 50.765625 L 38.300781 27.785156 Z M 34.015625 63.953125 L 23.445312 63.953125 L 23.445312 54.054688 L 34.015625 54.054688 Z M 34.015625 63.953125 "
						/>
						<path
							stroke="currentColor"
							d="M 65.789062 42.328125 L 38.289062 14.558594 L 25.316406 27.660156 L 25.316406 21.894531 C 25.316406 20.546875 24.234375 19.453125 22.902344 19.453125 C 21.566406 19.453125 20.484375 20.546875 20.484375 21.894531 L 20.484375 32.539062 L 10.789062 42.328125 C 9.609375 43.519531 9.609375 45.453125 10.789062 46.644531 C 11.378906 47.238281 12.152344 47.535156 12.925781 47.535156 C 13.699219 47.535156 14.46875 47.238281 15.058594 46.644531 L 38.289062 23.1875 L 61.519531 46.644531 C 62.699219 47.835938 64.609375 47.835938 65.789062 46.644531 C 66.964844 45.453125 66.964844 43.519531 65.789062 42.328125 Z M 65.789062 42.328125 "
						/>
					</svg>
					<div class="block">
						<div class="w-full font-semibold">Maison</div>
						<div class="w-full text-xs">J'habite une maison</div>
					</div>
				</label>
			</li>
			<li>
				<input
					type="radio"
					id="hosting-big"
					name="habitation"
					value="Appartement"
					bind:group={$formData.habitation}
					class="hidden peer"
				/>
				<label
					for="hosting-big"
					class="inline-flex items-center gap-2 w-full px-3 py-5 text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer  dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 "
				>
					<svg
						class="w-12"
						viewBox="0 0 75 74.999997"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
					>
						<path
							stroke="currentColor"
							d="M 23.050781 69.460938 L 23.050781 56.71875 L 31.101562 56.71875 L 31.101562 69.460938 Z M 10.117188 56.71875 L 18.167969 56.71875 L 18.167969 64.769531 L 10.117188 64.769531 Z M 10.117188 47.007812 L 18.167969 47.007812 L 18.167969 55.058594 L 10.117188 55.058594 Z M 10.117188 37.292969 L 18.167969 37.292969 L 18.167969 45.34375 L 10.117188 45.34375 Z M 23.050781 47.007812 L 31.101562 47.007812 L 31.101562 55.058594 L 23.050781 55.058594 Z M 23.050781 37.292969 L 31.101562 37.292969 L 31.101562 45.34375 L 23.050781 45.34375 Z M 35.984375 56.71875 L 44.035156 56.71875 L 44.035156 64.769531 L 35.984375 64.769531 Z M 35.984375 47.007812 L 44.035156 47.007812 L 44.035156 55.058594 L 35.984375 55.058594 Z M 35.984375 37.292969 L 44.035156 37.292969 L 44.035156 45.34375 L 35.984375 45.34375 Z M 39.917969 30.152344 L 39.917969 20.898438 L 49.171875 20.898438 L 49.171875 30.152344 Z M 54.78125 54.253906 L 64.035156 54.253906 L 64.035156 63.507812 L 54.78125 63.507812 Z M 54.78125 43.089844 L 64.035156 43.089844 L 64.035156 52.34375 L 54.78125 52.34375 Z M 54.78125 32.0625 L 64.035156 32.0625 L 64.035156 41.316406 L 54.78125 41.316406 Z M 54.78125 20.898438 L 64.035156 20.898438 L 64.035156 30.152344 L 54.78125 30.152344 Z M 68.664062 69.460938 L 68.664062 12.75 L 35.289062 12.75 L 35.289062 31.277344 L 47.816406 31.277344 C 48.351562 31.277344 48.960938 31.601562 49.171875 32.0625 L 49.171875 41.316406 L 49.140625 41.316406 L 49.140625 43.089844 L 49.171875 43.089844 L 49.171875 52.34375 L 49.140625 52.34375 L 49.140625 54.253906 L 49.171875 54.253906 L 49.171875 63.507812 L 49.140625 63.507812 L 49.140625 69.460938 L 47.816406 69.460938 L 47.816406 32.605469 L 6.335938 32.605469 L 6.335938 69.460938 L 0.226562 69.460938 L 0.226562 75.039062 L 74.773438 75.039062 L 74.773438 69.460938 L 68.664062 69.460938 "
						/>
					</svg>
					<div class="block">
						<div class="w-full font-semibold">Appartement</div>
						<div class="w-full text-xs">J'habite un appartement</div>
					</div>
				</label>
			</li>
		</ul>
	{/if}

	{#if $currentStep === 2}
		<div class="w-full" transition:slide>
			<p class="font-medium mb-2">
				Vous habitez
				<span class="text-green-500"
					>un{#if $formData.habitation === "Maison"}e{/if}
					{$formData.habitation}</span
				>
				et vous êtes?
			</p>
			<ul class="grid w-full gap-3 md:grid-cols-2">
				<li>
					<input
						type="radio"
						id="owner"
						name="statut"
						value="Propriétaire"
						bind:group={$formData.statut}
						class="hidden peer"
					/>
					<label
						for="owner"
						class="inline-flex items-center gap-2 w-full p-3 text-gray-700 bg-white border border-gray-200 rounded-lg cursor-pointer  dark:peer-checked:text-green-500 peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 "
					>
						<svg
							class="w-14"
							viewBox="0 0 75 74.999997"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
						>
							<path
								stroke="currentColor"
								d="M 49.570312 43.972656 C 54.757812 41.878906 57.261719 35.984375 55.152344 30.8125 C 53.046875 25.640625 47.140625 23.144531 41.953125 25.246094 C 40.246094 25.933594 38.765625 27.066406 37.660156 28.53125 C 39.476562 29.886719 41.664062 30.644531 43.925781 30.710938 L 49.484375 30.710938 C 50.605469 30.71875 51.511719 31.628906 51.503906 32.742188 C 51.5 33.851562 50.597656 34.753906 49.484375 34.757812 L 43.464844 34.757812 C 40.78125 34.996094 38.09375 34.4375 35.726562 33.164062 C 35.121094 37.34375 37.1875 41.464844 40.910156 43.484375 L 40.910156 65.167969 C 40.910156 66.515625 41.792969 67.710938 43.085938 68.109375 L 43.085938 46.210938 L 44.636719 46.210938 L 44.636719 68.25 L 45.355469 68.25 C 47.058594 68.25 48.445312 66.875 48.445312 65.167969 L 48.445312 64.34375 L 50.308594 62.375 L 48.828125 60.816406 L 50.308594 59.25 L 48.828125 57.691406 L 50.308594 56.136719 L 48.828125 54.574219 L 50.308594 53.015625 L 48.828125 51.453125 L 50.308594 49.894531 L 48.835938 48.335938 L 50.582031 46.519531 L 49.570312 43.972656"
							/>
							<path
								stroke="currentColor"
								d="M 40.75 23.730469 C 38.355469 21.648438 35.121094 20.804688 32.011719 21.457031 C 31.863281 15.824219 36.324219 11.128906 41.972656 10.980469 C 47.628906 10.828125 52.332031 15.277344 52.484375 20.914062 C 52.511719 22.085938 52.34375 23.25 51.972656 24.363281 C 52.53125 24.699219 53.058594 25.082031 53.554688 25.503906 C 55.945312 19.277344 52.820312 12.292969 46.574219 9.910156 C 40.332031 7.527344 33.332031 10.640625 30.933594 16.867188 C 30.304688 18.511719 30.039062 20.273438 30.167969 22.027344 C 25.40625 24.023438 22.910156 29.269531 24.367188 34.203125 L 8.988281 49.539062 C 7.933594 50.589844 7.78125 52.238281 8.625 53.460938 L 23.546875 38.585938 L 24.644531 39.679688 L 9.6875 54.59375 L 9.949219 54.851562 C 11.15625 56.054688 13.109375 56.054688 14.316406 54.851562 L 14.902344 54.265625 L 17.617188 54.183594 L 17.679688 52.042969 L 19.828125 51.980469 L 19.894531 49.832031 L 22.042969 49.773438 L 22.105469 47.628906 L 24.257812 47.570312 L 24.316406 45.421875 L 26.46875 45.359375 L 26.53125 43.222656 L 29.054688 43.171875 L 30.144531 40.65625 C 31.9375 41.410156 33.898438 41.636719 35.8125 41.304688 C 33.882812 38.460938 33.273438 34.925781 34.140625 31.605469 L 31.355469 28.828125 C 30.625 28.101562 30.5625 26.941406 31.203125 26.132812 C 33.0625 30.261719 37.074219 33 41.605469 33.242188 C 41.71875 32.628906 41.777344 32.003906 41.785156 31.382812 C 37.929688 31.207031 34.496094 28.882812 32.910156 25.378906 C 33.40625 25.402344 33.875 25.613281 34.226562 25.964844 L 35.960938 27.691406 C 37.179688 25.976562 38.835938 24.605469 40.757812 23.730469 L 40.75 23.730469 "
						/>
						</svg>
						<div class="block">
							<div class="w-full font-semibold">Propriétaire</div>
							<div class="w-full text-xs">Je suis Propriétaire</div>
						</div>
					</label>
				</li>
				<li>
					<input
						type="radio"
						id="locataire"
						name="statut"
						value="Locataire"
						bind:group={$formData.statut}
						class="hidden peer"
						required
					/>
					<label
						for="locataire"
						class="inline-flex items-center w-full p-3 text-gray-700 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-green-600 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100 "
					>
						<svg class="w-14" viewBox="0 0 75 74.999997" fill="currentColor">
							<path
								stroke="currentColor"
								d="M 13.125 45.46875 C 13.125 41.585938 16.273438 38.4375 20.15625 38.4375 C 24.039062 38.4375 27.1875 41.585938 27.1875 45.46875 C 27.1875 49.351562 24.039062 52.5 20.15625 52.5 C 16.273438 52.5 13.125 49.351562 13.125 45.46875 Z M 27.1875 58.125 L 13.125 58.125 C 10.019531 58.125 7.5 60.644531 7.5 63.75 L 7.5 66.5625 L 32.8125 66.5625 L 32.8125 63.75 C 32.8125 60.644531 30.292969 58.125 27.1875 58.125 Z M 63.75 26.703125 L 63.75 60.9375 C 63.75 64.042969 61.230469 66.5625 58.125 66.5625 L 35.625 66.5625 L 35.625 63.75 C 35.625 63.019531 35.523438 62.316406 35.347656 61.640625 L 55.3125 61.640625 C 55.703125 61.640625 56.015625 61.328125 56.015625 60.9375 C 56.015625 60.546875 55.703125 60.234375 55.3125 60.234375 L 34.847656 60.234375 C 33.980469 58.355469 32.449219 56.84375 30.550781 56.015625 L 55.3125 56.015625 C 55.699219 56.015625 56.015625 55.703125 56.015625 55.3125 C 56.015625 54.921875 55.699219 54.609375 55.3125 54.609375 L 27.1875 54.609375 C 26.796875 54.609375 26.484375 54.921875 26.484375 55.3125 L 20.15625 55.3125 C 23.789062 55.3125 26.964844 53.328125 28.667969 50.390625 L 55.3125 50.390625 C 55.703125 50.390625 56.015625 50.078125 56.015625 49.6875 C 56.015625 49.296875 55.703125 48.984375 55.3125 48.984375 L 29.339844 48.984375 C 29.761719 47.890625 30 46.707031 30 45.46875 C 30 45.230469 29.980469 45 29.964844 44.765625 L 55.3125 44.765625 C 55.703125 44.765625 56.015625 44.453125 56.015625 44.0625 C 56.015625 43.671875 55.703125 43.359375 55.3125 43.359375 L 29.765625 43.359375 C 29.417969 41.777344 28.695312 40.339844 27.6875 39.140625 L 55.3125 39.140625 C 55.703125 39.140625 56.015625 38.828125 56.015625 38.4375 C 56.015625 38.046875 55.703125 37.734375 55.3125 37.734375 L 27.1875 37.734375 C 26.941406 37.734375 26.738281 37.867188 26.613281 38.054688 C 24.882812 36.546875 22.628906 35.625 20.15625 35.625 C 19.675781 35.625 19.210938 35.671875 18.75 35.738281 L 18.75 15.9375 C 18.75 12.832031 21.269531 10.3125 24.375 10.3125 L 47.359375 10.3125 C 48.847656 10.3125 50.28125 10.90625 51.335938 11.960938 L 62.101562 22.726562 C 63.15625 23.78125 63.75 25.214844 63.75 26.703125 Z M 26.484375 21.5625 C 26.484375 21.953125 26.796875 22.265625 27.1875 22.265625 L 41.25 22.265625 C 41.640625 22.265625 41.953125 21.953125 41.953125 21.5625 C 41.953125 21.171875 41.640625 20.859375 41.25 20.859375 L 27.1875 20.859375 C 26.796875 20.859375 26.484375 21.171875 26.484375 21.5625 Z M 26.484375 27.1875 C 26.484375 27.578125 26.796875 27.890625 27.1875 27.890625 L 42.65625 27.890625 C 43.046875 27.890625 43.359375 27.578125 43.359375 27.1875 C 43.359375 26.796875 43.046875 26.484375 42.65625 26.484375 L 27.1875 26.484375 C 26.796875 26.484375 26.484375 26.796875 26.484375 27.1875 Z M 56.015625 32.8125 C 56.015625 32.421875 55.703125 32.109375 55.3125 32.109375 L 27.1875 32.109375 C 26.796875 32.109375 26.484375 32.421875 26.484375 32.8125 C 26.484375 33.203125 26.796875 33.515625 27.1875 33.515625 L 55.3125 33.515625 C 55.703125 33.515625 56.015625 33.203125 56.015625 32.8125 Z M 60.9375 26.703125 C 60.9375 25.964844 60.636719 25.238281 60.113281 24.714844 L 49.347656 13.949219 C 48.816406 13.417969 48.109375 13.125 47.355469 13.125 L 46.875 13.125 L 46.875 21.5625 C 46.875 24.667969 49.394531 27.1875 52.5 27.1875 L 60.9375 27.1875 Z M 60.9375 26.703125 "
							/>
						</svg>
						<div class="block">
							<div class="w-full font-semibold">Locataire</div>
							<div class="w-full text-xs">Je suis locataire </div>
						</div>
					</label>
				</li>
			</ul>
		</div>
	{/if}

	{#if $currentStep === 3}
		<!-- Étape 3 : Code postal -->
		<div class="w-full flex flex-col" transition:slide>
			<p class="font-medium mb-2">
				Vous habitez
				<span class="text-green-500"
					>un{#if $formData.habitation === "Maison"}e{/if}
					{$formData.habitation}</span
				>, vous êtes <span class="text-green-500">{$formData.statut}</span>.
			</p>
			<label class="text-xs mb-2">Quel est votre code postal?</label>
			<input
				type="number"
				class="input border px-5 py-1.5"
				bind:value={$formData.codePostal}
				placeholder="75000"
			/>
		</div>
	{/if}

	{#if $currentStep === 4}
		<!-- Étape 4 : Travaux -->
		<div class="w-full" transition:slide>
			<p class="font-medium mb-2">Dites nous quels travaux vous intéressent ?</p>
			<p class="italic text-xs mb-2">Un ou plusieurs choix possibles</p>
			<ul
				class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
			>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<div class="flex items-center ps-3">
						<input
							id="iso-ext"
							type="checkbox"
							value="Isolation par l’extérieur (crépi inclus)"
							bind:group={$formData.travaux}
							class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
						/>
						<label for="iso-ext" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
							>Isolation par l’extérieur (crépi inclus)</label
						>
					</div>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<div class="flex items-center ps-3">
						<input
							id="iso-int"
							type="checkbox"
							value="Isolation par l’intérieur"
							bind:group={$formData.travaux}
							class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
						/>
						<label for="iso-int" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
							>Isolation par l’intérieur</label
						>
					</div>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<div class="flex items-center ps-3">
						<input
							id="iso-comble"
							type="checkbox"
							value="Isolation des combles perdues"
							bind:group={$formData.travaux}
							class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
						/>
						<label
							for="iso-comble"
							class="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
							>Isolation des combles perdues</label
						>
					</div>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<div class="flex items-center ps-3">
						<input
							id="iso-ramp"
							type="checkbox"
							value="Isolation des rampants"
							bind:group={$formData.travaux}
							class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
						/>
						<label
							for="iso-ramp"
							class="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
							>Isolation des rampants</label
						>
					</div>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<div class="flex items-center ps-3">
						<input
							id="iso-planchers"
							type="checkbox"
							value="Isolation des planchers bas"
							bind:group={$formData.travaux}
							class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
						/>
						<label
							for="iso-planchers"
							class="w-full py-3 ms-2 text-sm font-medium text-gray-900 "
							>Isolation des planchers bas</label
						>
					</div>
				</li>
			</ul>
		</div>
	{/if}

	{#if $currentStep === 5}
		<!-- Étape 5 : Chauffage -->
		<div class="w-full" transition:slide>
			<p class="font-medium mb-2">Comment êtes-vous chauffés actuellement ? </p>
			<ul
				class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
			>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-3">
						<input
							type="radio"
							name="chauffage"
							value="Gaz"
							bind:group={$formData.chauffage}
						/>
						Gaz
					</label>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-3">
						<input
							type="radio"
							name="chauffage"
							value="Électricité"
							bind:group={$formData.chauffage}
						/>
						Électricité
					</label>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-3">
						<input
							type="radio"
							name="chauffage"
							value="Fioul"
							bind:group={$formData.chauffage}
						/>
						Fioul
					</label>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-3">
						<input
							type="radio"
							name="chauffage"
							value="Autres"
							bind:group={$formData.chauffage}
						/>
						Autres
					</label>
				</li>
			</ul>
		</div>
	{/if}

	{#if $currentStep === 6}
		<!-- Étape 6 : Foyer -->
		<div class="w-full" transition:slide>
			<p class="font-medium mb-2">
				De combien personnes se compose votre foyer?
			</p>
			<ul
				class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
			>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-2.5">
						<input type="radio" name="foyer" value="1" bind:group={$formData.foyer} />
						1 personne
					</label>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-2.5">
						<input type="radio" name="foyer" value="2" bind:group={$formData.foyer} />
						2 personnes
					</label>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-2.5">
						<input type="radio" name="foyer" value="3" bind:group={$formData.foyer} />
						3 personnes
					</label>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-2.5">
						<input type="radio" name="foyer" value="4" bind:group={$formData.foyer} />
						4 personnes
					</label>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-2.5">
						<input type="radio" name="foyer" value="5" bind:group={$formData.foyer} />
						5 personnes
					</label>
				</li>
				<li class="w-full border-b border-gray-200 rounded-t-lg hover:bg-gray-100">
					<label class="block p-2.5">
						<input
							type="radio"
							name="foyer"
							value="6+"
							bind:group={$formData.foyer}
						/>
						6 et plus
					</label>
				</li>
			</ul>
		</div>
	{/if}

	{#if $currentStep === 7}
		<p class="font-medium mb-2">Votre revenu fiscal de référence ?</p>
		<!-- Étape 7 : Revenus -->
		<ul
			class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex"
		>
			{#if revenueOptions.length > 0}
				{#each revenueOptions as option, i}
					<li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
						<div class="flex items-center ps-3">
							<input
								id="{option}-{i}"
								type="radio"
								name="revenus"
								value={option}
								bind:group={$formData.revenus}
								class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 "
							/>
							<label
								for="{option}-{i}"
								class="w-full py-3 ms-2 text-sm font-medium text-gray-90"
								>{option}</label
							>
						</div>
					</li>
				{/each}
			{:else}
				<p class="text-red-500">
					Veuillez d'abord entrer un code postal valide et sélectionner un foyer.
				</p>
			{/if}
		</ul>
	{/if}

	{#if $currentStep === 8}
		<!-- Étape 8 : Informations personnelles -->
		<div class="w-full flex flex-col" transition:slide>
			<label class="text-sm text-gray-500">Nom et prénom</label>
			<div class="w-full flex flex-col md:flex-row gap-2 mb-2">
				<div class="relative">
					<div
						class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"
					>
						<svg
							class="w-4 h-4 text-gray-500"
							data-slot="icon"
							fill="none"
							stroke-width="1.5"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
							></path>
						</svg>
					</div>
					<input
						type="text"
						bind:value={$formData.informations.nom}
						aria-describedby="helper-text-explanation"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5"
						placeholder="Votre nom"
						required
					/>
				</div>

				<div class="relative">
					<div
						class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"
					>
						<svg
							class="w-4 h-4 text-gray-500"
							data-slot="icon"
							fill="none"
							stroke-width="1.5"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
							></path>
						</svg>
					</div>
					<input
						type="text"
						bind:value={$formData.informations.prenom}
						aria-describedby="helper-text-explanation"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5"
						placeholder="Votre prénom"
						required
					/>
				</div>
			</div>

			<label class="text-sm text-gray-500">Téléphone</label>
			<div class="relative mb-2">
				<div
					class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"
				>
					<svg
						class="w-4 h-4 text-gray-500"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 19 18"
					>
						<path
							d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"
						/>
					</svg>
				</div>
				<input
					type="text"
					id="phone"
					bind:value={$formData.informations.telephone}
					aria-describedby="helper-text-explanation"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5"
					placeholder="06 12 34 56 78"
					required
				/>
			</div>

			<label class="text-sm text-gray-500">Email</label>
			<div class="relative mb-2">
				<div
					class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"
				>
					<svg
						class="w-4 h-4 text-gray-500"
						data-slot="icon"
						fill="none"
						stroke-width="1.5"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
						></path>
					</svg>
				</div>
				<input
					type="email"
					bind:value={$formData.informations.email}
					aria-describedby="helper-text-explanation"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5"
					placeholder="jean.dupont@gmail.com"
					required
				/>
			</div>
		</div>

		<p class="text-xs text-center mt-5 text-gray-500">
			En soumettant votre demande, vous acceptez que Groupe Dumont vous contactent
			et utilisent les données recueillies afin de vous proposer une offre adaptée à
			vos besoins. Pour en savoir plus sur la gestion de vos données personnelles et
			pour exercer vos droits, veuillez consulter notre
			<a
				href="https://groupedumont.fr/politique-de-confidentialite/"
				class="text-green-500"
				>Politique de Confidentialité*</a
			>
		</p>
	{/if}

	{#if $currentStep === 9}
		<div
			class="p-4 mb-4 text-sm text-center text-green-800 rounded-lg bg-green-100 "
			role="alert"
		>
			<p class="font-bold">
				Merci ! Votre demande a bien été prise en compte.
			</p>
			<p>Un de nos techniciens vous recontactera dans les plus brefs délais.</p>
		</div>
	{/if}

	<div class="mt-10 flex gap-2">
		{#if $currentStep > 1 && $currentStep < 9}
			<button
				type="button"
				class="flex items-center gap-3 bg-white  border px-5 py-1.5 rounded-full hover:bg-gray-100 transition ease-in-out"
				on:click={prevStep}
			>
				<svg
					class="w-6"
					data-slot="icon"
					fill="none"
					stroke-width="1.5"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
					></path>
				</svg>
				<span class="hidden sm:block">Précédent</span>
			</button>
		{/if}

		{#if $currentStep < 9}
			<p
				class="flex items-center text-xs font-bold bg-slate-50 border px-3 rounded-full w-[90px]"
			>
				Étape {$currentStep}/8
			</p>
		{/if}

		{#if $currentStep < 8}
			<button
				type="button"
				class="flex items-center gap-3 bg-green-500 text-white px-5 py-1.5 rounded-full hover:bg-green-600 transition ease-in-out font-bold"
				on:click={nextStep}
			>
				Suivant
				<svg
					class="w-6"
					data-slot="icon"
					fill="none"
					stroke-width="1.5"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
					></path>
				</svg>
			</button>
		{/if}

		{#if $currentStep === 8}
			<button
				type="submit"
				class="flex items-center justify-center bg-green-500 text-white px-5 py-1.5 rounded-full hover:bg-green-600 font-bold transition ease-in-out"
			>
				<svg
					class="mr-3 -ml-1 size-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class:hidden={!$isLoading}
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				Soumettre
			</button>
		{/if}
	</div>
</form>
