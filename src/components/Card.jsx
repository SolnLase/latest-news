import React from "react";

class Card extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <div className="col col-card" >
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="card__add-info pb-2">
                            <p className="">entertainment</p>
                            <p className="text-end">2022-02-03 13:49:30</p>
                        </div>
                        <h5 className="card-title">
                            Megerősítve a Ghostwire: Tokyo márciusi megjelenése, friss látnivalókat is kaptunk a
                            játékból
                        </h5>
                        <p className="card-text pt-2">A tegnap esti órákban lezajlott PlayStation Showcase online
                            esemény részeként minden, és valóban minden a Ghostwire: Tokyo című videojátékról
                            szólt, mely csapat bár manapság a Microsoft égisze alatt ügyködik, azonban van még
                            egy tartozásuk a Sony felé. Ezt pedig nemsokára törlesztik majd, hiszen a kérdéses
                            eventen #link#htt...</p>

                        <div className="card__add-info pt-2">
                            <p className="">hungarian</p>
                            <p className="text-end">hungary</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Card;