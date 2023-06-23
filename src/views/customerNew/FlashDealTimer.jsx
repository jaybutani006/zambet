import React from 'react';
import { useState, useEffect } from 'react';

const FlashDealTimer = (props) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    // const deadline = "December, 31, 2022";
    // const deadline = "2022-12-28T11:49:11.549Z";
    // const deadline = '2023-01-01T00:00:00.000Z'; // in UTC 0
    // const deadline = '2023-01-31T18:30:00.000Z'; // DEADLINE from server must be of UTC timezone
    const [timeOver, setTimeOver] = useState(false)

    const getTime = () => {
        const time = Date.parse(props?.deadline) - Date.now();
        if (time <= 0) {
            setTimeOver(true)
        } else {
            setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((time / 1000 / 60) % 60));
            setSeconds(Math.floor((time / 1000) % 60));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(props?.deadline), 1000);

        return () => clearInterval(interval);
    }, [props]);

    return (
        <div className="timer">
            {!!timeOver ?
                <>
                    <span className="cz-countdown d-flex justify-content-center align-items-center">
                        <span className="cz-countdown-days align-items-center">
                            <span className="cz-countdown-value">Coming Soon</span>
                        </span>
                    </span>
                </>
                :
                <>
                    <span
                        className="cz-countdown d-flex justify-content-center align-items-center"
                        data-countdown="07/08/2022 11:59:00 PM"
                    >
                        <span className="cz-countdown-days align-items-center">
                            <span className="cz-countdown-value">{days}</span>
                            <span>Day</span>
                        </span>
                        <span className="cz-countdown-value p-1">:</span>
                        <span className="cz-countdown-hours align-items-center">
                            <span className="cz-countdown-value">{hours}</span>
                            <span>Hrs</span>
                        </span>
                        <span className="cz-countdown-value p-1">:</span>
                        <span className="cz-countdown-minutes align-items-center">
                            <span className="cz-countdown-value">{minutes}</span>
                            <span>Min</span>
                        </span>
                        <span className="cz-countdown-value p-1">:</span>
                        <span className="cz-countdown-seconds align-items-center">
                            <span className="cz-countdown-value">{seconds}</span>
                            <span>Sec</span>
                        </span>
                    </span>
                </>
            }
        </div>
    );
};

export default FlashDealTimer;