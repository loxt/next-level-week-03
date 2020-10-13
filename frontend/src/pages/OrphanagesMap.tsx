import React from 'react';
import { Link } from 'react-router-dom';

import { Map, TileLayer } from 'react-leaflet';

import { FiPlus } from 'react-icons/fi';

import mapMarker from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';

export default function OrphanagesMap() {
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarker} alt='Happy'/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Ivinhema</strong>
          <span>Mato Grosso do Sul</span>
        </footer>
      </aside>

      <Map
        center={[-22.2901377, -53.8128811]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
      </Map>
      <Link to='/' className='create-orphanage'>
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
