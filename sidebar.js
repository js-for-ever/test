class Sidebar 
{
    constructor ( steps = 1 )
    {
        this.domElement = document.createElement( "div" );
        this.domElement.classList.add( "sidebar" );
        this.domElement.innerHTML = `<ul class="step-list"></ul>`;

        this.stepList = this.domElement.getElementsByClassName( "step-item" );

        this.steps = steps;
        this.current = 0;

        this.path = "";
    }

    init ( current = 0 )
    {
        this.current = current;
        this._generateSteps();
        this._generateNavigation();
        this._generateBackToMenuButton();
        document.body.insertBefore( this.domElement, document.body.firstChild );
    }

    _generateSteps ()
    {
        for ( let i = 0; i < this.steps; i++ ) this._addStep( i );
    }

    _addStep ( i ) 
    {
        const index = i;
        const li = document.createElement( "li" );
        li.classList.add( "step-item" );

        if ( index < this.current ) li.classList.add( "completed" );
        else if ( index === this.current ) li.classList.add( "active" );
        else li.classList.add( "upcoming" );

        li.id = `step${index}`;
        li.dataset.step = index;

        const a = document.createElement( "a" );
        a.href = `${this.path}${index}.html`;
        a.classList.add( "step-link" );

        const title = document.createElement( "p" );
        title.classList.add( "step-title" );
        title.textContent = `Schritt ${index}`;

        a.appendChild( title );
        li.appendChild( a );

        this.domElement.querySelector( ".step-list" ).appendChild( li );
    }

    _generateNavigation () 
    {
        const nav = document.createElement( "div" );
        nav.classList.add( "step-navigation" );

        if ( this.current > 0 ) 
        {
            const back = document.createElement( "button" );
            back.textContent = "Zurück";
            back.classList.add( "step-back" );
            back.addEventListener( "click", () => { window.location.href = `${this.path}${this.current - 1}.html` } );
            nav.appendChild( back );
        }

        if ( this.current < this.steps - 1 ) 
        {
            const next = document.createElement( "button" );
            next.textContent = "Weiter";
            next.classList.add( "step-next" );
            next.addEventListener( "click", () => { window.location.href = `${this.path}${this.current + 1}.html` } );
            nav.appendChild( next );
        }

        document.body.appendChild( nav );
    }

    _generateBackToMenuButton () 
    {
        const menuButton = document.createElement( "button" );
        menuButton.textContent = "Zum Menü";
        menuButton.classList.add( "menu-button" );
        menuButton.addEventListener( "click", () => window.location.href = "../../index.html" );

        this.domElement.appendChild( menuButton );
    }
}