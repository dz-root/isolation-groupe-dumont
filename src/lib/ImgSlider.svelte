<script>
    export let images = ['./slides/9.png','./slides/11.png','./slides/13.png','./slides/14.png']
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
