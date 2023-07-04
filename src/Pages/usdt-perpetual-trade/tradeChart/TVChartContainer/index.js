import * as React from "react";
import socketIOClient from "socket.io-client";

import styles from "./index.module.css";
import { widget } from "../../../../static/charting_library";
import Config from "../../../../core/config/";

// const axios = require('axios').default;
import axios from "axios";
// import $ from "jquery";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
const historys = {};
let resolutionValue = "D";
let chartLength = -1;
const config = {
  supported_resolutions: ["1", "5", "15", "30", "60", "D", "W", "M"],
};
const defaultProps = {
  interval: "D",
  datafeedUrl: "https://demo_feed.tradingview.com",
  libraryPath: "/static/charting_library/",
  chartsStorageUrl: "https://saveload.tradingview.com",
  chartsStorageApiVersion: "2.1",
  clientId: "tradingview.com",
  userId: "public_user_id",
  // clientId: "7133au-cba5a72-842029c",
  // userId: "Fibit_Pro",
  fullscreen: false,
  autosize: true,
  studiesOverrides: {
    "volume.volume.color.0": "#0ecb81",
    "volume.volume.color.1": "#f6465d",

    "ma.color": "#2a2e39",
    "moving average.ma.color": "#2a2e39",
    "moving average.ma.linewidth": 2,
  },
};
export default class TVChartContainer extends React.PureComponent {
  tvWidget = null;
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.socketConnection = null;
    this._subscriptions = [];
    this.channelString = "";
    this.symbol = "";
  }
  componentDidUpdate() {
    this.loadChart();
  }
  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps : ", {nextProps});
  }
  async componentDidMount() {
    let socket = socketIOClient(Config.USDM_SOCKET_URL, {
      transports: ["websocket"],
      // rejectUnauthorized: false
    });
    if (socket) {
      socket.on(
        "connect",
        function () {
          console.log("TVC trade socket connected");
          this.socketConnection = socket;
          this.socketCall();
        }.bind(this)
      );
      socket.on("connect_error", (err) => {
        console.log("TVC trade socket connect_error", err);
      });
      socket.on("disconnect", function () {
        console.log("TVC trade socket disconnected");
      });
    }
    this.loadChart();
    // setTimeout(() => {
    //   // document.getElementsByClassName("iconArrow-2KhwsEwE").click();
    //   $(".iconArrow-2KhwsEwE").click();
    // }, 4000);
  }
  loadChart() {
    // console.log('loadChart : ');
    let dataFeed = {
      onReady: (cb) => {
        setTimeout(() => cb(config), 0);
      },
      searchSymbols: (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
      ) => {},
      resolveSymbol: (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
      ) => {
        var split_data = symbolName.split("/");
        if (split_data.length == 2) {
          var symbol_stub = {
            name: symbolName,
            description: `${split_data[0]}/${split_data[1]}`,
            type: "crypto",
            session: "24x7",
            timezone: "Etc/UTC",
            ticker: symbolName,
            exchange: Config.SITENAME,
            minmov: 1,
            debug: true,
            pricescale: Math.pow(10, 2),
            has_no_volume: false,
            has_intraday: true,
            intraday_multipliers: ["1", "60"],
            supported_resolutions: ["1", "5", "15", "30", "60", "D", "W", "M"],
            volume_precision: 8,
            full_name: "full_name",
            listed_exchange: "listed_exchange",
          };
          setTimeout(function () {
            onSymbolResolvedCallback(symbol_stub);
          }, 0);
        }
      },
      getBars: async (
        symbolInfo,
        resolution,
        periodParams,
        onHistoryCallback,
        onErrorCallback
      ) => {
        let resolutionChanged = 0;
        if (resolutionValue != resolution) {
          resolutionValue = resolution;
          resolutionChanged = 1;
        }
        if (this.symbol != symbolInfo.name) {
          this.symbol = symbolInfo.name;
          resolutionChanged = 1;
        }

        if (chartLength == -1 || chartLength > 50 || resolutionChanged == 1) {
          var split_symbol = symbolInfo.name.split("/");

          let interval = "";
          if (resolutionValue < 60) {
            interval = resolutionValue + "m";
          }
          else if (resolutionValue == 60) {
            interval = "1h";
          }
          else if (
            resolutionValue == 1440 ||
            resolutionValue == "1D" ||
            resolutionValue == "D"
          ) {
            interval = "1d";
          }
          else if (resolutionValue == "1W" || resolutionValue == "W") {
            interval = "1w";
          }
          else if (resolutionValue == "1M" || resolutionValue == "M") {
            interval = "1M";
          }

          let qs = {
            pair:
              (split_symbol[1] == "INR" ? "I" : "B") +
              "-" +
              split_symbol[0] +
              "_" +
              split_symbol[1],
            interval: interval,
          };
          qs.startTime = periodParams.from ? periodParams.from * 1000 : 0;
          qs.endTime = periodParams.to ? periodParams.to * 1000 : 0;

          axios
            .post(Config.V1_API_URL + "trade/market_data/candles", qs)
            // .post(Config.USDM_V1_API_URL + "usdt-perpetual/market_data/candles", qs)
            .then(function (response) {
              let data = response.data;
              chartLength = response.data.length;
              if (data.length == 0) {
                onHistoryCallback([], { noData: true });
              } else {
                var bars = data.reverse().map((el) => {
                  return {
                    time: el.time,
                    low: el.low,
                    high: el.high,
                    open: el.open,
                    close: el.close,
                    volume: el.volume,
                  };
                });
                if (periodParams.firstDataRequest) {
                  var lastBar = bars[bars.length - 1];
                  historys[symbolInfo.name] = { lastBar: lastBar };
                }
                if (bars.length > 0) {
                  onHistoryCallback(bars, { noData: false });
                } else {
                  onHistoryCallback([], { noData: true });
                }
              }
            })
            .catch(function (error) {
              onHistoryCallback([], { noData: true });
              console.log(error);
            });
        } else {
          onHistoryCallback([], { noData: true });
        }
      },
      subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback,
        history
      ) => {
        this.subscribeBars(
          symbolInfo,
          resolution,
          onRealtimeCallback,
          subscribeUID,
          onResetCacheNeededCallback,
          history
        );
      },
      unsubscribeBars: (subscriberUID) => {
        this.unsubscribeBars(subscriberUID);
      },
      calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
        if (resolutionValue != resolution) {
          chartLength = -1;
          resolutionValue = resolution;
        }
        if (resolution === "1D") {
          return {
            resolutionBack: "M",
            intervalBack: 6,
          };
        }
        else if (resolution == "3D") {
          return {
            resolutionBack: "M",
            intervalBack: 6,
          };
        }
        if (parseInt(resolution) < 60) {
          return { resolutionBack: "D", intervalBack: 1 };
        } else {
          return undefined;
        }
      },
      getMarks: (
        symbolInfo,
        startDate,
        endDate,
        onDataCallback,
        resolution
      ) => {},
      getTimescaleMarks: (
        symbolInfo,
        startDate,
        endDate,
        onDataCallback,
        resolution
      ) => {},
      getServerTime: (cb) => {},
    };
    const userTheme =
      this.props && this.props.theme ? this.props.theme : "light";
    let overrides = {};
    if(userTheme === "light-new" || userTheme === "light") {
      overrides = {
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#171616",
        "paneProperties.background": "#FFFFFF",
        "paneProperties.backgroundType": "solid",

        "paneProperties.vertGridProperties.color": "#f0f5f5",
        "paneProperties.horzGridProperties.color": "#f0f5f5",

        "mainSeriesProperties.candleStyle.wickUpColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.wickDownColor": "#f6465d",

        "mainSeriesProperties.candleStyle.upColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.downColor": "#f6465d",

        "mainSeriesProperties.candleStyle.borderUpColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.borderDownColor": "#f6465d",

        "mainSeriesProperties.candleStyle.drawBorder": true,
      }
    }
    else {
      overrides = {
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#FFFFFF",
        "paneProperties.background": "#171616",
        "paneProperties.backgroundType": "solid",

        "paneProperties.vertGridProperties.color": "1f2a3c",
        "paneProperties.horzGridProperties.color": "1f2a3c",

        "mainSeriesProperties.candleStyle.wickUpColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.wickDownColor": "#f6465d",

        "mainSeriesProperties.candleStyle.upColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.downColor": "#f6465d",

        "mainSeriesProperties.candleStyle.borderUpColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.borderDownColor": "#f6465d",

        "mainSeriesProperties.candleStyle.drawBorder": true,
      }
    }
    const widgetOptions = {
      symbol:
        typeof this.props.symbol == "string" ? this.props.symbol : "USDT/INR",
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: dataFeed, //new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
      interval: defaultProps.interval,
      container: this.ref.current,
      library_path: defaultProps.libraryPath,
      debug: false,
      theme: (userTheme == "light-new" || userTheme == "light") ? "light" : "dark",
      locale: getLanguageFromURL() || "en",
      disabled_features: [
        "use_localstorage_for_settings",
        "display_market_status",
        "header_symbol_search",
        "show_logo_on_all_charts",
        // "header_compare",
        // "header_screenshot",
        "header_undo_redo",
        "timeframes_toolbar",
        "header_settings",
        "border_around_the_chart",
        "save_chart_prperties_to_local_storage",
        "volume_force_overlay",
      ],
      enabled_features: [
        "show_hide_button_in_legend",
        "header_indicators",
        "study_templates",
        // "hide_left_toolbar_by_default",
        "move_logo_to_main_pane",
        "side_toolbar_in_fullscreen_mode",
        // "header_in_fullscreen_mode",
      ],
      charts_storage_url: defaultProps.chartsStorageUrl,
      charts_storage_api_version: defaultProps.chartsStorageApiVersion,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      toolbar_bg: userTheme === "light-new" ? "#ffffff" : "#171616",
      overrides: {
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor":
          userTheme === "light-new" ? "#171616" : "#FFFFFF",
        "paneProperties.background":
          userTheme === "light-new" ? "#FFFFFF" : "#171616",
        "paneProperties.backgroundType": "solid",

        "paneProperties.vertGridProperties.color": userTheme === "light-new" ? "#f0f5f5" : "1f2a3c",
        "paneProperties.horzGridProperties.color": userTheme === "light-new" ? "#f0f5f5": "1f2a3c",

        "mainSeriesProperties.candleStyle.wickUpColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.wickDownColor": "#f6465d",

        "mainSeriesProperties.candleStyle.upColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.downColor": "#f6465d",

        "mainSeriesProperties.candleStyle.borderUpColor": "#0ecb81",
        "mainSeriesProperties.candleStyle.borderDownColor": "#f6465d",

        "mainSeriesProperties.candleStyle.drawBorder": true,

      },
    };
    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;
    this.tvWidget.onChartReady(() => {
      this.tvWidget.chart().createStudy("Moving Average", false, false, [7], "null", {
        'Plot.linewidth': 10,
        "%d.color" : "#FF0000",
      });
      this.tvWidget.chart().createStudy("Moving Average", false, false, [25]);
      this.tvWidget.chart().createStudy("Moving Average", false, false, [99]);
    });
  }
  socketCall() {
    // USDTPerpetualPairResp
    // pairResponseFutures
    // createResponseUSDTPerpetual
    // this.socketConnection.on("USDTPerpetualPairResp", (e) => {
    //   console.log("USDTPerpetualPairResp 1 : ", {e});
    // });
    // this.socketConnection.on("createResponseUSDTPerpetual", (e) => {
    //   console.log("USDTPerpetualPairResp 2 : ", {e});
    // });
    this.socketConnection.on("pairResponseFutures", (e) => {
      // console.log("USDTPerpetualPairResp 3 : ", {e});
      if (
        typeof e.tradeHistory != "undefined" &&
        e.tradeHistory != undefined &&
        e.tradeHistory != "undefined" &&
        e.tradeHistory
      ) {
        const data = {
          exchange: Config.SITENAME,
          to_sym: e.pair.split("_")[1],
          from_sym: e.pair.split("_")[0],
          volume:
            e.type == 1
              ? e.tradeHistory[0].volume
              : parseFloat(e.tradeHistory.volume),
          price: parseFloat(e.marketPrice),
          ts: new Date().getTime() / 1000,
        };
        const channelString = `${data.exchange}-${data.from_sym}-${data.to_sym}`;
        const sub = this._subscriptions.find(
          (e) => e.channelString === channelString
        );
        if (sub) {
          var _lastBar = this.updateBar(data, sub);
          sub.listener(_lastBar);
          sub.lastBar = _lastBar;
        }
      }
    });
  }
  updateBar(data, sub) {
    var lastBar = sub.lastBar;
    let resolution = sub.resolution;
    if (resolution.includes("D")) {
      resolution = 1440;
    } else if (resolution.includes("W")) {
      resolution = 10080;
    }
    var coeff = resolution * 60;
    var rounded = Math.floor(data.ts / coeff) * coeff;
    var lastBarSec = lastBar.time / 1000;
    var _lastBar;
    if (rounded > lastBarSec) {
      _lastBar = {
        time: rounded * 1000,
        open: lastBar.close,
        high: lastBar.close,
        low: lastBar.close,
        close: data.price,
        volume: data.volume,
      };
    } else {
      if (data.price < lastBar.low) {
        lastBar.low = data.price;
      } else if (data.price > lastBar.high) {
        lastBar.high = data.price;
      }
      lastBar.volume = lastBar.volume > 0 ? lastBar.volume : 0;
      lastBar.volume += data.volume;
      lastBar.close = data.price;
      _lastBar = lastBar;
    }
    return _lastBar;
  }
  createChannelString(symbolInfo) {
    var channel = symbolInfo.name.split("/");
    const exchange = Config.SITENAME;
    const to = channel[1];
    const from = channel[0];
    return `${exchange}-${from}-${to}`;
  }
  subscribeBars(symbolInfo, resolution, updateCb, uid, resetCache, history) {
    this._subscriptions = [];
    this.channelString = this.createChannelString(symbolInfo);
    if (
      typeof historys[symbolInfo.name] != "undefined" &&
      historys[symbolInfo.name] != undefined &&
      typeof historys[symbolInfo.name].lastBar != "undefined" &&
      historys[symbolInfo.name].lastBar != undefined
    ) {
      let a = this.channelString;
      var newSub = {
        channelString: a,
        uid,
        resolution,
        symbolInfo,
        lastBar: historys[symbolInfo.name].lastBar,
        listener: updateCb,
      };
      this._subscriptions.push(newSub);
    }
  }
  unsubscribeBars(uid) {
    var subIndex = this._subscriptions.findIndex((e) => e.uid === uid);
    if (subIndex === -1) {
      return;
    }
    this._subscriptions.splice(subIndex, 1);
  }
  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
    if (
      typeof this.socketConnection != "undefined" &&
      this.socketConnection != undefined &&
      this.socketConnection !== null
    ) {
      this.socketConnection.disconnect();
    }
  }

  render() {
    return (
      <>
        <div ref={this.ref} className={styles.TVChartContainer} />
      </>
    );
  }
}
