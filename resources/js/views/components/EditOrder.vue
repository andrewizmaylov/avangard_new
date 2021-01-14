<template>
	<section>
		<div class="flex justify-between">
			<span class="text-lg text-gray-600">Change order {{details.order.id}}</span>
			<span @click="goOrdersPage" class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded">goBack</span> 
		</div>
		<div class="flex flex-col rounded-lg shadow-lg my-6">
			
			<form class="w-4/5 mx-auto mb-16" @submit.prevent="saveOrder">
				<label class="block text-2xl text-gray-600 mb-4 ml-2">Change order details</label>
				<label class="block tex-sm text-gray-600 mb-2 ml-2">Clients email</label>	
				<input name="order.client_email" class="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order.client_email" type="email" v-model="details.order.client_email">
				<label class="block tex-sm text-gray-600 mb-2 ml-2">Order status</label>	
				<select name="order.status" class="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order.status" type="text" v-model="details.order.status">
					<option :value="0">New order</option>
					<option :value="10">Order Confirmed</option>
					<option :value="20">Order Completed</option>
				</select>
				<div class="flex">
					<button class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" type="submit">Change Order</button>	
				</div>
			</form>

			<form class="w-4/5 mx-auto mb-16" @submit.prevent="savePartner">
				<label class="block text-2xl text-gray-600 mb-4 ml-2">Change Partner</label>
				<label class="block tex-sm text-gray-600 mb-2 ml-2">Partner email</label>	
				<input name="order.partner.email" class="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order.partner.email" type="email" v-model="details.order.partner.email">
				<label class="block tex-sm text-gray-600 mb-2 ml-2">Partner name</label>	
				<input name="order.partner.name" class="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order.partner.name" type="text" v-model="details.order.partner.name">
				<div class="flex">
					<button class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" type="submit">Change Partner Details</button>	
				</div>
			</form>	

			<form class="w-4/5 mx-auto mb-16" @submit.prevent="saveDetails">
				<label class="block text-2xl text-gray-600 mb-4 ml-2">Change Bascket</label>
	        		<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-100">
							<tr>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
									<span>Product Name</span> 
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									<span>Quantity</span> 
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									<span>Price</span> 
								</th>
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									<span>Sum</span> 
								</th>
							</tr>
						</thead>
	          			<tbody>
	          				<tr v-for="product in details.orderDetails" :class="product.position % 2 == 0 ? 'bg-gray-100' : 'bg-white'" :key="product.id" >
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						{{productName(product.product_id)[0].name}}
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						<input name="product.quantity" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product.id" type="number" v-model="product.quantity">
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						{{product.price}}
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						{{product.quantity*product.price}}
	          					</td>
	          				</tr>
	          			</tbody>
	        		</table>

				<div class="flex mt-6">
					<button class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" type="submit">Change Order Details</button>	
				</div>
			</form>			
			
		</div>
	</section>
</template>
<script>
	export default {
		name: 'editOrder',
		data() {
			return {
				details: {},
				products: [],
			}
		},
		created() {
			this.refreshOrder();
			axios.get('/api/products')
			    .then(response => {
			    	this.products = response.data;
			        console.log(response);
			    })
			    .catch(error => {
			        console.log(error);
			    });
		},
		methods: {
			saveOrder() {
				axios.post('/api/order/'+this.details.order.id, {
				        client_email: this.details.order.client_email,
				        status: this.details.order.status,
				        // id: this.details.order.id
				    })
				    .then(response => {
				    	this.refreshOrder();
				        console.log(response);
				    })
				    .catch(error => {
				        console.log(error);
				    });
				 
			},
			savePartner() {
				axios.post('/api/partner/'+this.details.order.partner.id, {
				        email: this.details.order.partner.email,
				        name: this.details.order.partner.name,
				        // id: this.details.order.id
				    })
				    .then(response => {
				    	this.refreshOrder();
				        console.log(response);
				    })
				    .catch(error => {
				        console.log(error);
				    });
				 
			},
			saveDetails() {
				axios.post('/api/order_products/'+this.details.order.id, this.details.orderDetails)
				    .then(response => {
				    	this.refreshOrder();
				        console.log(response);
				    })
				    .catch(error => {
				        console.log(error);
				    });
				 
			},
			productName(id) {
				return this.products.filter(product => {
					if (product.id == id) {
						return product;
					}
				})
			},
			markRows() {
				let position = 0;
				return this.details.orderDetails.filter(item => {
					return item.position = position += 1;
				});
			},
			goOrdersPage() {
				this.$router.push({name: 'orders'});
			},
			refreshOrder() {
				axios.get('/api/order/'+this.$route.params.order.id)
				    .then(response => {
				    	console.log('success');
				        this.details = response.data;
				    })
				    .catch(error => {
				        console.log(error);
				    });
			}
		}
	}
</script>