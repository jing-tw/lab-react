import React, { Component } from "react";
import "./Map.css";

declare global {
  interface Window {
    H: any;
  }
}

interface IProps {
  debug?: boolean;
}

interface IState {
  lat: number;
  lng: number;
  zoom: number;
}

class Map extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      lat: 24.180244,
      lng: 121.310877,
      zoom: 18
    };
  }
  componentDidMount() {
    let H = (window as any).H;
    var platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_APIKEY
    });
    var defaultLayers = platform.createDefaultLayers();
    var map = new H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: this.state.lat, lng: this.state.lng },
        zoom: this.state.zoom,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    map.getViewModel().setLookAtData({ tilt: 45, heading: 0 });
    window.addEventListener("resize", () => map.getViewPort().resize());
    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    H.ui.UI.createDefault(map, defaultLayers);
  }
  render() {
    return (
      <div className="mapWrapper">
        <div className="map" id="map"></div>
      </div>
    );
  }
}
export default Map;