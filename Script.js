<script>
		//Fetch the price of Ethereum
		const eth_api_url = 'https://api.cryptonator.com/api/ticker/eth-usd';
		function ethereumHttpObject() {
			try { return new XMLHttpRequest(); }
			catch (error) { }
		}
		function ethereumGetData() {
			var request = ethereumHttpObject();
			request.open("GET", eth_api_url, false);
			request.send(null);
			console.log(request.responseText);
			return request.responseText;
		}
		function ethereumDataHandler() {
			var raw_data_string = ethereumGetData();

			var data = JSON.parse(raw_data_string);

			var base = data.ticker.base;
			var target = data.ticker.target;
			var price = data.ticker.price;
			var volume = data.ticker.volume;
			var change = data.ticker.change;
			var api_server_epoch_timestamp = data.timestamp;
			var api_success = data.success;
			var api_error = data.error;
			return price;
		}

		document.getElementById("eth_val").innerHTML = "$" + Math.round(ethereumDataHandler());


		//Fetch the price of Litecoin
		const ltc_api_url = 'https://api.cryptonator.com/api/ticker/ltc-usd';
		function litecoinHttpObject() {
			try { return new XMLHttpRequest(); }
			catch (error) { }
		}
		function litecoinGetData() {
			var request = litecoinHttpObject();
			request.open("GET", ltc_api_url, false);
			request.send(null);
			//console.log(request.responseText);	
			return request.responseText;
		}
		function litecoinDataHandler() {
			var raw_data_string = litecoinGetData();
			var data = JSON.parse(raw_data_string);
			var base = data.ticker.base;
			var target = data.ticker.target;
			var price = data.ticker.price;
			var volume = data.ticker.volume;
			var change = data.ticker.change;
			var api_server_epoch_timestamp = data.timestamp;
			var api_success = data.success;
			var api_error = data.error;
			return price;
		}
		document.getElementById("ltc_val").innerHTML = "$" + Math.round(litecoinDataHandler());

		//Fetch the value of Bitcoin
		const api_url = 'https://api.cryptonator.com/api/ticker/btc-usd';

		const time_interval = 2;
		function addLeadingZero(num) {
			return (num <= 9) ? ("0" + num) : num;
		}
		function clientDateTime() {
			var date_time = new Date();
			// var weekday = date_time.getDay();
			// var today_date = date_time.getDate();
			// var month = date_time.getMonth();
			// var full_year = date_time.getFullYear();
			var curr_hour = date_time.getHours();
			var zero_added_curr_hour = addLeadingZero(curr_hour);
			var curr_min = date_time.getMinutes();
			var curr_sec = date_time.getSeconds();
			var curr_time = zero_added_curr_hour + ':' + curr_min + ':' + curr_sec;
			return curr_time
		}
		function makeHttpObject() {
			try { return new XMLHttpRequest(); }
			catch (error) { }
		}
		function bitcoinGetData() {
			var request = makeHttpObject();
			request.open("GET", api_url, false);
			request.send(null);
			return request.responseText;
		}
		function bitcoinDataHandler() {
			var raw_data_string = bitcoinGetData();
			var data = JSON.parse(raw_data_string);
			var base = data.ticker.base;
			var target = data.ticker.target;
			var price = data.ticker.price;
			var volume = data.ticker.volume;
			var change = data.ticker.change;
			var api_server_epoch_timestamp = data.timestamp;
			var api_success = data.success;
			var api_error = data.error;
			return price;
		}

		document.getElementById("btc_val").innerHTML = "$" + Math.round(bitcoinDataHandler());

		FusionCharts.ready(function () {
			var fusioncharts = new FusionCharts({
				id: "stockRealTimeChart",
				type: 'realtimeline',
				renderAt: 'chart-container',
				width: '100%',
				height: '350',
				dataFormat: 'json',
				dataSource: {
					"chart": {
						"caption": "Bitcoin Hourglass",
						"subCaption": "",
						"xAxisName": "Local Time",
						"yAxisName": "USD",
						"numberPrefix": "$",
						"refreshinterval": "2",
						"slantLabels": "1",
						"numdisplaysets": "10",
						"labeldisplay": "rotate",
						"showValues": "0",
						"showRealTimeValue": "0",
						"theme": "fusion",
						"yAxisMaxValue": (bitcoinDataHandler().toString() + 20),
						"yAxisMinValue": (bitcoinDataHandler().toString() - 20),
					},
					"categories": [{
						"category": [{
							"label": clientDateTime().toString()
						}]
					}],
					"dataset": [{
						"data": [{
							"value": bitcoinDataHandler().toString()
						}]
					}]
				},
				"events": {
					"initialized": function (e) {
						function updateData() {
							// Get reference to the chart using its ID
							var chartRef = FusionCharts("stockRealTimeChart"),
								x_axis = clientDateTime(),
								y_axis = bitcoinDataHandler(),
								strData = "&label=" + x_axis + "&value=" + y_axis;
							// Feed it to chart.
							chartRef.feedData(strData);
						}
						e.sender.chartInterval = setInterval(function () {
							updateData();
						}, time_interval * 1000);
					},
					"disposed": function (evt, arg) {
						clearInterval(evt.sender.chartInterval);
					}
				}
			}
			);
			fusioncharts.render();
		});
	</script>
