<script>
    export let images = ['./slides/installation-fenetres.png','./slides/isolation-comble.png','./slides/installation-chauf-eau.png','./slides/systeme-chauf.png', './slides/installation_vmc.png', './slides/photovoltaique.png', './slides/dumont-prestations.png']
    export let animation=""
    export let duration = 2500
    export let classes = ''
    export let alt = ''
    let src = ''
    let counter = 0

    
    function change() {
        src = images[counter]
        counter++
        if(counter >= images.length) { counter = 0; }
    }
    change()

    setInterval(change, duration);

</script>


    
<img src="{src}" class="{classes} {animation} rounded-xl transition ease-in-out" alt={alt}>
