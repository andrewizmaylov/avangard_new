<template>
	<div class="flex w-md flex-col rounded-lg shadow-lg overflow-hidden">
	    <div class="flex-shrink-0">
			<iframe class="h-48 w-full object-cover" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28165.019339552047!2d34.35397163278829!3d53.23489008942226!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4132a78d14da3a05%3A0x6ad84109759a19a0!2z0JHRgNGP0L3RgdC6LCDQkdGA0Y_QvdGB0LrQsNGPINC-0LHQuy4!5e0!3m2!1sru!2sru!4v1610624532495!5m2!1sru!2sru" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
	    </div>
	    <div v-if="result==null" class="flex flex-col mx-auto mt-6 text-gray-600 text-center">
	    	<p>Важнее всего погода в Брянске...</p>
	    	<img src="/image/isLoading.gif" class="w-24 h-24 mx-auto"  v-if="!showMessage">
	    	<span class="my-4 text-red-500 font-medium cursor-pointer" v-else @click="loadWeather">Click here to reload component. Some server errors happened</span>
	    </div>
	    <div class="flex-1 bg-white p-6 flex justify-between" v-else>
		    <div class="flex-1">
		        <p class="text-sm font-medium text-indigo-600">
			        <a href="#" class="hover:underline">
			            {{this.result.geo_object.province.name}}, {{this.result.geo_object.country.name}}
			        </a>
		        </p>
		        <a href="#" class="block mt-2">
			        <p class="text-xl font-semibold text-gray-900">
			            {{this.result.geo_object.locality.name}} {{this.result.fact.temp}}
			        </p>
			        <p class="mt-3 text-base text-gray-500">
			            Fill like {{this.result.fact.feels_like}}
			        </p>
		        </a>
		    </div>
<!-- 		    <div>
		    	<span >Weather for a week</span>
		    	<div class="flex">
		    		<div class="flex flex-col text-center mx-4" v-for="item in result.forecasts">
			    		<span class="text-gray-500 text-sm">{{item.date}}</span>
			    		<span class="tect-lg font-bold text-gray-800">{{item.hours[12].temp}}</span>
		    		</div>
		    	</div>
		    </div> -->
		    <div class="mt-6 flex items-center">
		        <div class="flex-shrink-0">
		            <img class="h-16 w-16 rounded-full" :src="icon" alt="">
		        </div>
		    </div>
	    </div>
	</div>
</template>
<script>
	export default {
		name: 'weather',
		data() {
			return {
				result: null,
				showMessage: false,
			}
		},
		created() {
			this.loadWeather();
		},
		methods: {
			loadWeather() {
				this.showMessage = false;
				axios.get('/weather')
				    .then(response => {
				    	if(response.data.message == "ok") {
					    	this.result = response.data.result;
				    	}
				        console.log(response);
				    })
				    .catch(error => {
				    	if (error.response.status == 500) {
				    		this.showMessage = true;
				    	}
				        console.log(error);
				    });
			},
			moment() {
				return moment().format("MM.DD");
			},

		},
		computed: {
			icon() {
				return "https://yastatic.net/weather/i/icons/blueye/color/svg/"+this.result.fact.icon+".svg";
			},
		}
	}
</script>