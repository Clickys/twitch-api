import a from './test';

const key = process.env.KEY;

async function topLiveSreamers( game ) {
    const response = await fetch(
        `https://api.twitch.tv/kraken/streams/?game=${ game }&client_id=${ key }&stream_type=live&limit=5`,
    );
    const data = await response.json();
    return data.streams.map( info => ( {
        streamerName: info.channel.name,
        streamerLogo: info.channel.logo,
        streamerStatus: info.channel.status,
        streamerViewers: info.viewers,
        streamerGame: info.game,
    } ) );
}

function postAllStreamers( streamers ) {
    streamers.forEach( ( streamers, index ) => {
        const streamerLogoImage = document.querySelector( `.streamer-logo-image-${ index }` );
        const streamerInfo = document.querySelector( `.twitch__streamer-info-${ index }` );
        const streamerDOMViewers = document.querySelector( `.twitch__streamer-viewers-${ index }` );
        const twitchTitle = document.querySelector( '.twitch__title--heading' );
        const streamerName = streamerInfo.children[ 0 ];
        const streamerDOMStatus = streamerInfo.children[ 1 ];

        const {
            streamerLogo: logoImage,
            streamerName: streamerUser,
            streamerStatus,
            streamerViewers,
            streamerGame,
        } = streamers;

        const streamerViewersDecimals = streamerViewers
            .toString()
            .split( '' )
            .map( ( char, index, array ) => {
                if ( array.length === 5 && index === 2 ) {
                    return `,${ char }`;
                }
                if ( array.length === 6 && index === 3 ) {
                    return `,${ char }`;
                }
                if ( array.length === 4 && index === 1 ) {
                    return `,${ char }`;
                }
                return `${ char }`;
            } )
            .join( '' );

        // DOM CHANGES

        streamerLogoImage.setAttribute( 'src', logoImage );
        streamerName.textContent = streamerUser;
        streamerDOMStatus.textContent = streamerStatus;
        streamerDOMViewers.textContent = streamerViewersDecimals;
        twitchTitle.textContent = streamerGame;
    } );
}

const handlers = {
    callGame( game ) {
        const streamers = topLiveSreamers( game );

        streamers.then( ( streamers ) => {
            postAllStreamers( streamers );
        } );
    },
    gameWallpaper( game ) {
        document.querySelector(
            '.twitch',
        ).style.backgroundImage = `url(  images/games/${ game }.png )`;
    },
    counterStrike() {
        document.querySelector( '.counter-strike' ).addEventListener( 'click', () => {
            this.callGame( 'Counter-Strike%3A%20Global%20Offensive' );
            this.gameWallpaper( 'counter-strike' );
        } );
    },
    fortnite() {
        document.querySelector( '.fornite' ).addEventListener( 'click', () => {
            this.callGame( 'Fortnite' );
            this.gameWallpaper( 'fornite' );
        } );
    },
    pubg() {
        document.querySelector( '.pubg' ).addEventListener( 'click', () => {
            this.callGame( "PLAYERUNKNOWN'S%20BATTLEGROUNDS" );
            this.gameWallpaper( 'pubg' );
        } );
    },
    lol() {
        document.querySelector( '.lol' ).addEventListener( 'click', () => {
            this.callGame( 'League%20of%20Legends' );
            this.gameWallpaper( 'lol' );
        } );
    },
    init() {
        this.counterStrike();
        this.fortnite();
        this.pubg();
        this.lol();
        const streamers = topLiveSreamers( 'Fortnite' );

        streamers
            .then( ( streamers ) => {
                postAllStreamers( streamers );
            } )
            .catch( ( error ) => {
                console.log( error );
            } );
    },
};

handlers.init();
