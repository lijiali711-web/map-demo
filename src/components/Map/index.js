import React, { useRef, useEffect, useState } from "react";
import "./index.css";
import ModalMap from "../Modal/index";

const NewMap = () => {
  const mapRef = useRef();
  const mapDOM = useRef();
  const oldFilLayer = useRef([]); // 以数组形式存储图层数据,方便多个时一起清除
  const mapModalGeo = useRef({}); //todo 当前圈选geo文件
  //   todo 地图弹窗
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [propsData,setPropsData]=useState({})

  //todo 定义最大的geo数据
  const [mergedGeoJSON, setMergedGeoJSON] = useState({
    type: "FeatureCollection",
    features: [],
  });
 
  useEffect(() => {
    console.log('Map组件useEffect触发，mapDOM.current:', mapDOM.current);
    if (mapDOM.current) {
      // 延迟一点时间确保DOM完全渲染
      setTimeout(() => {
        initMap();
      }, 100);
    }
  }, []);
  
  //todo 加载地图
  const initMap = () => {
    console.log('初始化地图，容器:', mapDOM.current);
    console.log('BMapGL是否可用:', !!window.BMapGL);
    
    if (!window.BMapGL) {
      console.error('百度地图API未加载');
      return;
    }
    
    if (!mapDOM.current) {
      console.error('地图容器未找到');
      return;
    }
    
    const map = new window.BMapGL.Map(mapDOM.current);
    map.centerAndZoom(new window.BMapGL.Point(116.004, 39.215), 5.5); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.addControl(new window.BMapGL.ZoomControl()); //todo 添加缩放
    // todo 显示覆盖物
    map.showOverlayContainer();
    //  todo 获取覆盖物列表
    mapRef.current = map;
    
    console.log('地图初始化完成:', map);
    let menu = new window.BMapGL.ContextMenu();
    //todo  右键菜单
    let txtMenuItem = [
      // todo 多边形
      {
        text: "添加多边形", // 定义菜单项的显示文本
        callback: function (e) {
          // 初始化绘图工具
          let pp = new window.BMapGL.Polygon(
            [
              new window.BMapGL.Point(e.lng, e.lat),
              new window.BMapGL.Point(e.lng + 0.5, e.lat + 0.5),
              new window.BMapGL.Point(e.lng + 1, e.lat),
            ],
            {
              strokeWeight: 3, // 边线的宽度，以像素为单位
              strokeColor: "#3C7EFD", // 边线颜色
              fillColor: "#FFF", // 填充颜色
              fillOpacity: 0, // 填充透明度
            }
          );
          // 地图中添加覆盖物
          map.addOverlay(pp);
          //todo  将当前覆盖物赋值给状态变量
          // 添加一个绘制完成的item
          let newItem = new window.BMapGL.MenuItem(
            "编辑完成",
            () => {
              pp.disableEditing();
              // todo 收集数组
              const name = window.prompt("请输入name值");
              pp.name = name;
              oldFilLayer.current.push(pp);
            //  todo 删除编辑按钮
              menu.removeItem(newItem);
            },
            {
              width: 150,
              id: "menu" + 7,
            }
          );

          // 右击时开启编辑并且增加编辑完成item
          pp.addEventListener("click", (e) => {
            e.currentTarget.enableEditing();
            menu.addItem(newItem);
          });
        },
      },
      //   todo 圆形
      {
        text: "添加圆形覆盖",
        callback: function (e) {
          // 初始化绘图工具
          let cc = new window.BMapGL.Circle(
            new window.BMapGL.Point(e.lng, e.lat),
            100000,
            {
              strokeWeight: 3, // 边线的宽度，以像素为单位
              strokeColor: "#3C7EFD", // 边线颜色
              fillColor: "#FFF", // 填充颜色
              fillOpacity: 0, // 填充透明度
            }
          );
          cc.enableEditing();
          // 判断覆盖物是否为圆形

          map.addOverlay(cc);
          // 添加一个绘制完成的item
          let newItem = new window.BMapGL.MenuItem(
            "编辑完成",
            () => {
              cc.disableEditing();
              const name = window.prompt("请输入name值");
              cc.name = name;
              oldFilLayer.current.push(cc);
              menu.removeItem(newItem);
            },
            {
              width: 150,
              id: "menu" + 8,
            }
          );

          // 右击时开启编辑并且增加编辑完成item
          cc.addEventListener("click", (e) => {
            e.currentTarget.enableEditing();
            menu.addItem(newItem);
          });
        },
      },
    ];

    for (var i = 0; i < txtMenuItem.length; i++) {
      menu.addItem(
        new window.BMapGL.MenuItem( // 定义菜单项实例
          txtMenuItem[i].text, // 传入菜单项的显示文本
          txtMenuItem[i].callback, // 传入菜单项的回调函数
          {
            width: 150, // 指定菜单项的宽度
            id: "menu" + i, // 指定菜单项dom的id
          }
        )
      );
    }
    map.addContextMenu(menu);
  };
  //   todo 点击保存按钮
  const save = () => {
    if(mergedGeoJSON){
      heBing();
      setMapModalVisible(true);

    }
   
    //   todo
   
  };
  
  // todo 关闭地图弹窗
  const closeMapModal = () => {
    setMergedGeoJSON({
      type: "FeatureCollection",
      features: [],
    })
    oldFilLayer.current=[]
    setMapModalVisible(false);
     mapRef.current.clearOverlays(); // 清除地图上的覆盖物
  };
  // ! 数据合并
  const heBing = () => {
    console.log(oldFilLayer.current, "ggggggggg");
    oldFilLayer.current.forEach(function (overlay) {
      console.log(overlay);
      var feature = {
        type: "Feature",
        geometry: {
          coordinates: [],
        },
        properties: {},
      };

      if (overlay instanceof window.BMapGL.Polygon) {
        feature.geometry.type = "Polygon";
        var path = overlay.getPath();
        feature.geometry.coordinates[0] = path.map(function (point) {
          return [point.lng, point.lat];
        });
        feature.geometry.coordinates[0].push([path[0].lng, path[0].lat]); // Close the polygon
      } else if (overlay instanceof window.BMapGL.Circle) {
        feature.geometry.type = "Point";
        var center = overlay.getCenter();
        feature.geometry.coordinates = [center.lng, center.lat];
        feature.properties.radius = overlay.getRadius();
      }
      mergedGeoJSON.features.push(feature);
    });
    console.log(mergedGeoJSON);

    setMergedGeoJSON({...mergedGeoJSON})
  };

  return (
    <div>
      <button onClick={save}>点击保存数据</button>

      <div className="map-container" ref={mapDOM}></div>
      <ModalMap
        visible={mapModalVisible}
        closeMapModal={closeMapModal}
        data={mergedGeoJSON}
      ></ModalMap>
    </div>
  );
};

export default NewMap;
