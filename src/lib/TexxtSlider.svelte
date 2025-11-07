<script>
    export let color = 'text-green-500'
    export let text = ['Isolation par l\’extérieur','Isolation par l\’intérieur','Isolation des combles perdues','Isolation des rampants', 'Isolation des planchers bas', 'Amélioration classe DPE']
    export let animation = 'animate-bounce'
    export let duration = 1500
    let nomMetier = ''
    let counter = 0

    
    function change() {
        nomMetier = text[counter]
        counter++
        if(counter >= text.length) { counter = 0; }
    }

    setInterval(change, duration);
</script>

<div class="flex justify-center lg:justify-start">
    <p class="flex items-center justify-center gap-1.5 bg-white border border-green-300 px-2 rounded-full text-sm font-semibold {color} {animation}  transition ease-in-out">
        <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {nomMetier}
    </p>
</div>