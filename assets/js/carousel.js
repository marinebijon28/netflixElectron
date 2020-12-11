class Carousel {

    /**
     * This callback type is called `requestCallback` and is displayed as a global symbol.
     *
     * @callback moveCallback
     * @param {number} index
     */

    /**
     * 
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Object} [options.slidesToScroll=1] Nombre d'élément a faire défiler 
     * @param {Object} [options.slidesVisible=1] Nombre d'élément visible dans un slide
     * @param {boolean} [options.loop=false] Doit-on boucler en fin de carousel
     * @param {boolean} [options.infinite=false] 
     */
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false,
            infinite: false
        }, options);

        // Recovered all items in the div
        let children = [].slice.call(element.children);
        this.isMobile = false;

        this.currentItem = 0;

        // Modify the DOM
        // set class
        this.divMain = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel__container');
        this.divMain.setAttribute('tabindex', '0')

        // create element
        this.divMain.appendChild(this.container);
        this.element.appendChild(this.divMain);

       // this.moveCallbacks = []; 

        this.items = children.map((child) => {
    
            // set class
            let item = this.createDivWithClass('carousel__item');

             // create element
            item.appendChild(child);
            this.container.appendChild(item);

            return item;
        });
        this.sizeItems = this.items.length;

        if (this.options.infinite) {
            this.offset = this.options.slidesVisible * 2 - 1;
            if (this.offset > this.items.length)
                this.offset = this.items.length
            this.items = [
                ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)),
            ]
            console.log(this.items.length)
            console.log(this.offset);
            this.goToItem(this.offset, false);
        }
    

        this.items.forEach(item => this.container.appendChild(item));

        this.setStyle();
        this.createNavigation();
       // this.onWindowResize()

        // events
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.divMain.addEventListener('keyup', e => {
           
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.next();
            }
            else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                this.prev();
            }
        });
    }

    createNavigation() {
        let nextButton = document.createElement('div');
        let prevButton = document.createElement('div');;
        this.divMain.appendChild(nextButton);
        this.divMain.appendChild(prevButton);
        nextButton.setAttribute('class', "fa-3x fas fa-angle-left");
        prevButton.setAttribute('class', "fa-3x fas fa-angle-right");
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
        // this.onMove(index => {
        //     if (index === 0)
        //     {
        //         prevButton.classList.add('fa-angle-left--hidden');
        //     }
        //     else
        //     {
        //         prevButton.classList.remove('fa-angle-left--hidden');
        //     }
        // });
    }

    // /**
    //  * 
    //  * @param {moveCallback} cb 
    //  */
    // onMove(cb) {
    //     this.moveCallbacks.push(cb);
    // }

    onWindowResize() {
        let mobile = window.innerWidth < 900
        console.log(mobile)
        if (mobile !== this.isMobile) {
            this.mobile = mobile
            if (window.innerWidth < 900) {
                this.options.slidesVisible = 4;
                this.options.slidesToScroll = 4;
            }
            if (window.innerWidth < 700) {
                this.options.slidesVisible = 3;
                this.options.slidesToScroll = 3;
            }
            if (window.innerWidth < 500) {
                this.options.slidesVisible = 2;
                this.options.slidesToScroll = 2;
            }
            if (window.innerWidth < 300) {
                this.options.slidesVisible = 1;
                this.options.slidesToScroll = 1;
            }
        }
        else {
            this.options.slidesVisible = 5;
                this.options.slidesToScroll = 5;
        }
        this.setStyle()
    }

    /**
     * @returns {number}
     */
    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }

    /**
     * @returns {number}
     */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible
    }

    prev() {
        this.goToItem(this.currentItem + this.slidesToScroll)
    }

    next() {
        this.goToItem(this.currentItem - this.slidesToScroll)
    }

    /**
     * Déplace le carousel vers l'élément cible
     * @param {number} index
     * @param {boolean} [animation = true]
     */
    goToItem(index, animation = true) {
        // console.log(index);
        // console.log(this.options.slidesVisible);
      //  console.log(this.sizeItems);
        //console.log(index - this.offset);
        if (index < 0) {
            index = this.sizeItems - this.options.slidesVisible;
            // bouger du nombre d'élément qui restent
          //  this.options.slidesToScroll = index;
           
        }
        else if (index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)) {
            index = 0
        }
        //bouger du nombre d'élément qui restent
        // else if (index > this.sizeItems) {
        //     this.options.slidesToScroll = this.sizeItems - this.options.slidesVisible;
        //     console.log("slides : " + this.options.slidesToScroll);
        // }

        let translateX = index * -100 / this.items.length;
        if (animation === false) {
            this.container.style.transition = 'none';
        }
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        if (animation === false) {
            this.container.style.transition = '';
        }
        this.currentItem = index;
        // this.moveCallbacks.forEach(cb => cb(index));
    }

    /**
     * Applies the correct dimensions to the navigation elements of the carousel
     */
    setStyle () {
        let ratio = this.items.length / this.slidesVisible;
        this.container.style.width = (ratio * 100) + '%';
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%");
    }

    /**
     * 
     * @param {string} className the name of the class
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

}


document.addEventListener('DOMContentLoaded', () => {
    new Carousel(document.querySelector('#carousel1'), ({
        slidesToScroll: 2,
        slidesVisible: 5,
        infinite: true
    }));
})
