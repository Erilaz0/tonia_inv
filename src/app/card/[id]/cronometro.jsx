import React, { useState, useEffect } from 'react';

const Cronometrer = ( { styles , date , px } ) => {
    const [countdownTime, setCountdownTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {

        const targetDate = new Date(date).getTime();
        
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setCountdownTime({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                return; // Detener el conteo regresivo cuando se acabe el tiempo
            }

            setCountdownTime({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    return (
       <div className="countdown"  style={ styles && { backgroundImage : styles.cronometrer }  } >
        <div className='date-container' style={ px && { transform : `${ px }`}  }>
         <div className="date">
          <p className="date-number" style={ styles && { fontFamily : styles.cronometrerNumberFont  }}>{countdownTime.days}</p>
          <p style={ styles && { color : styles.cronometrerColor , fontFamily : styles.cronometrerLetterFont }} className='word'>Días</p>
         </div>
         <div className="date">
          <p className="date-number" style={ styles && { fontFamily : styles.cronometrerNumberFont  }}>{countdownTime.hours}</p>
          <p style={ styles && { color : styles.cronometrerColor, fontFamily : styles.cronometrerLetterFont  }} className='word'>Hs</p>
         </div>
         <div className="date">
          <p className="date-number" style={ styles && { fontFamily : styles.cronometrerNumberFont  }}>{countdownTime.minutes}</p>
          <p style={ styles && { color : styles.cronometrerColor, fontFamily : styles.cronometrerLetterFont  }} className='word'>Min</p>
         </div>
         <div className="date date-s">
          <p className="date-number" style={ styles && { fontFamily : styles.cronometrerNumberFont  }}>{countdownTime.seconds}</p>
          <p style={ styles && { color : styles.cronometrerColor, fontFamily : styles.cronometrerLetterFont  }} className='word'>Seg</p>
         </div>
        </div>
       </div>
    );
};

export default Cronometrer;
