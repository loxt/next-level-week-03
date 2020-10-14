import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import { FiPlus, FiArrowRight } from 'react-icons/fi';

import mapMarker from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(res => {
      setOrphanages(res.data);
    });
  }, []);

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

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}>
              <Popup closeButton={false} minWidth={240} maxWIdth={240} className='map-popup'>
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff"/>
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>
      <Link to='/orphanages/create' className='create-orphanage'>
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
