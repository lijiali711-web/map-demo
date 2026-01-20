import React, { useRef, useEffect, useState } from "react";
import { Modal, Form, Button, message } from "antd";

const ModalMap = ({ visible, closeMapModal, data }) => {
  const mapRef = useRef();
  const mapDOM = useRef();
  const overlays = useRef({});
  useEffect(() => {
    mapDOM.current && initMap(); //加载地图
    // 有覆盖物就进行删除
  }, [mapDOM.current, overlays.current]);



  useEffect(() => {
    if (!mapRef.current) return;
    // console.log(data)
    overlays.current = { ...data }
  }, [mapRef.current, data]);
  // 加载地图
  const initMap = () => {
    const map = new window.BMapGL.Map(mapDOM.current);
    map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 5.5); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);
    map.addControl(new window.BMapGL.ZoomControl()); //todo 添加缩放
    // todo 显示覆盖物
    map.showOverlayContainer();
    mapRef.current = map;
    var bounds = new window.BMapGL.Bounds();
    //  todo 当前传递的数据
    // console.log(overlays.current);
    overlays.current && overlays.current.features && overlays.current.features.forEach(function (feature) {

      if (feature.geometry.type === 'Polygon') { //多边
        var path = feature.geometry.coordinates[0].map(function (coord) {
          return new window.BMapGL.Point(coord[0], coord[1]);
        });
        var polygon = new window.BMapGL.Polygon(path, { strokeColor: "blue", fillColor: "blue", fillOpacity: 0.3 });
        map.addOverlay(polygon);
        bounds.extend(polygon.getBounds().getSouthWest());
        bounds.extend(polygon.getBounds().getNorthEast());
      } else if (feature.geometry.type === 'Point' && feature.properties.radius) { //圆
        var center = new window.BMapGL.Point(feature.geometry.coordinates[0], feature.geometry.coordinates[1]);
        var radius = feature.properties.radius;
        var circle = new window.BMapGL.Circle(center, radius, { strokeColor: "red", fillColor: "red", fillOpacity: 0.3 });
        map.addOverlay(circle);
        bounds.extend(circle.getBounds().getSouthWest());
        bounds.extend(circle.getBounds().getNorthEast());
      }


    });
    map.setViewport(bounds);
    map.enableScrollWheelZoom(true); //鼠标滚动缩放
  };

  // todo 取消事件
  const handleCancel = () => {
    overlays.current = {}
    mapRef.current.clearOverlays(); // 清除地图上的覆盖物
    closeMapModal();
  };

  // todo 保存事件
  const handleSave = () => { };

  return (
    <Modal
      wrapClassName="map-modal-select"
      forceRender
      title="自定义地图"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          保存
        </Button>,
      ]}
    >
      <div className="map-tips">
        *右键进行自定义区域选择，右键编辑完成后可点击保存
      </div>
      <div
        className="map-con"
        ref={mapDOM}
        style={{ width: "auto", height: 450 }}
      ></div>

    </Modal>
  );
};

export default ModalMap;
