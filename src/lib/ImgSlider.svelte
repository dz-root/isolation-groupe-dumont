<script>
    export let images = [
        './slides/9.png',
        './slides/11.png',
        './slides/13.png',
        './slides/14.png'
    ];
    
    export let duration = 2500;  
    export let alt = "";
    export let classes = "";

    let src = "";
    let counter = 0;
    let progress = 0;

    function change() {
        src = images[counter];
        counter = (counter + 1) % images.length;
        progress = 0;
    }

    change();

    // Animation progression
    setInterval(() => {
        progress += 100 / (duration / 100);
        if (progress >= 100) {
            progress = 100;
            change();
        }
    }, 100);
</script>

<div class="relative w-full shadow-xl shadow-black/15 rounded-xl">
    
    <img 
        src="{src}" 
        alt={alt}
        class="{classes} rounded-xl transition-all duration-700 ease-in-out transform fade-anim"
    >

    <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white rounded-full overflow-hidden">
        <div 
            class="h-full bg-green-300 progress-bar"
            style="width: {progress}%"
        ></div>
    </div>
</div>

<style>

    .fade-anim {
        opacity: 0;
        transform: scale(1.02);
        animation: fadeZoom 0.7s forwards;
    }

    @keyframes fadeZoom {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Animation lissée de la barre de progression */
    .progress-bar {
        transition: width 0.1s linear;
    }
</style>
