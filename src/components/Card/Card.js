import React from 'react';
import './style.css'
import pokemonType from '../../helpers/pokemonTypes';

function Card({pokemon}) {
    return (
        <div className='Card'>
            <div className='Card__img'>
                <img src={pokemon.sprites.front_default} alt=''/>
            </div>
            <div className='Card__name'>
                {pokemon.name}
            </div>
            <div className='Card__types' >
                {
                    pokemon.types.map(type => {
                        return (
                            <div 
                                className="Card__type"
                                style={{ backgroundColor: pokemonType[type.type.name] }}
                            >
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className='Card__info'>
                <div className='Card__data Card__data--weight'>
                    <p className='title'>Weight</p>
                    <p>{pokemon.weight}</p>
                </div>

                <div className='Card__data Card__data--ability'>
                    <p className='title'>Ability</p>
                    <p>{pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;