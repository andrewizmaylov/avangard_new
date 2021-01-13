<template>
	<div class="flex flex-col">
	    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
	        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
	        	<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
	        		<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-100">
							<tr>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
									<span>Order_ID</span> <!-- from orders table -->
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Partner_Name <!-- from partner_id thrue relantionship -->
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Order_Amount <!-- thrue order_products table quantity*price -->
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Product_name <!-- order_products table -> product_id -> products_name -->
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							    <select id="location" name="location" class="mt-1 -ml-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" v-model="list">
								    <option :value="allOrders">All orders</option>
								    <option :value="delayedOrders">Delayed orders</option>
								    <option :value="newOrders">New orders</option>
								    <option :value="todayOrders">Today orders</option>
								    <option :value="completedOrders">Completed orders</option>
							    </select>
								</th>
							</tr>
						</thead>
	          			<tbody>
							<tr v-for="order in list" :class="order.position % 2 == 0 ? 'bg-gray-100' : 'bg-white'">
								<td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-center">
									<span @click="changeOrder" class="text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg cursor-pointer p-4">{{order.id}}</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									partnerName(order.id) {{order.position}}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									orderAmount(order.id)
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									productName(order)
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{{status(order)}}
								</td>
							</tr>
	          			</tbody>
	        </table>
	      </div>
	    </div>
	  </div>
	</div>
</template>
<script>
	export default {
		name: 'orders',
		data() {
			return {
				orders: [],
				list: '',
			}
		},
		created() {
			axios.get('/api/orders')
			    .then(response => {
			        this.orders = response.data;
			        this.list = 'allOrders'
			    })
			    .catch(error => {
			        console.log(error);
			    });
		},
		computed: {
			allOrders() {
				var pos = 0;
				return this.orders.filter(order => {
					if (order.id) {
						order.position = ++pos;
						return order;
					}
				});
			},
			completedOrders() {
				let position = 0; 
				return this.orders.filter(order => {
					if (order.status == 20) {
						order.position = ++position;
						return order;
					}
				});
			},
			newOrders() {
				let position = 0; 
				return this.orders.filter(order => {
					if (order.status == 0) {
						order.position = ++position;
						return order;
					}
				});
			},
			todayOrders() {
				let position = 0; 
				let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
				let plusDay = moment(now).add(1, 'days');
				return this.orders.filter(order => {
					if (order.status == 10 && moment(order.delivery_dt).isBetween(now, plusDay)) {
						order.position = ++position;
						return order;
					}
				});
			},
			delayedOrders() {
				let position = 0; 
				let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
				return this.orders.filter(order => {
					if (order.status == 10 && moment(order.delivery_dt).isBefore(now)) {
						order.position = ++position;
						return order;
					}
				});
			},

		},
		methods: {
			changeOrder(id) {
				this.$router.push('/order'+id)
			},
			partnerName(id) {
				return id;
			},
			orderAmount(id) {
				return id;
			},
			productName(id) {
				return id;
			},
			status(order) {
				if (order.status == 20) {
					return "order completed";
				} else if (order.status == 10) {
					return "order confirmed";
				} 
				return "new order";
			}
		}
	}
</script>