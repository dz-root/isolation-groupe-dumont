<div class="scroll bg-green-500" style="--time:120s">
	<div class="font-bold">

		<span>Isolation par l’extérieur</span>
        <span>Aides ITE 2025</span>
		<span>Isolation par l’intérieur</span>
        <span>Financement ITE</span>
		<span>Isolation des combles</span>
        <span>CEE isolation par l’extérieur</span>
		<span>Isolation des rampants</span>
        <span>Ponts thermiques</span>
		<span>Isolation des planchers</span>
        <span>isolation polystyrène graphité</span>
        <span>Isolant façade laine de roche</span>

	</div>
	<div class="font-bold">

		<span>Isolation par l’extérieur</span>
        <span>Aides ITE 2025</span>
		<span>Isolation par l’intérieur</span>
        <span>Financement ITE</span>
		<span>Isolation des combles</span>
        <span>CEE isolation par l’extérieur</span>
		<span>Isolation des rampants</span>
        <span>Ponts thermiques</span>
		<span>Isolation des planchers</span>
        <span>isolation polystyrène graphité</span>
        <span>Isolant façade laine de roche</span>

	</div>	
</div>




<style>
    .scroll {
        position: relative;
        display: flex;
        width: 100%;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent)
    }
    
    .scroll div {
        white-space: nowrap;
        animation: scroll var(--time) linear infinite;
        animation-delay: calc(var(--time)*-1);
    
    }
    
    .scroll div:nth-child(2) {
        animation: scroll2 var(--time) linear infinite;
        animation-delay: calc(var(--time)/-2);
    }
    
    @keyframes scroll {
        0% {
            transform: translateX(100%);
        }
    
        100% {
            transform: translateX(-100%);
        }
    }
    
    @keyframes scroll2 {
        0% {
            transform: translateX(0);
        }
    
        100% {
            transform: translateX(-200%);
        }
    }
    
    .scroll div span {
        display: inline-flex;
        margin: 10px;
        background: rgba(255, 255, 255, 0.10);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        transition: 0.5s;
    }
    

    
    .imgBox div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .imgBox img {
        max-width: 100px;
        scale: 0.8;
    }
    </style>