<template>
	<section>
		<div class="flex justify-between">
			<span class="text-lg text-gray-600">Change order {{details.order.id}}</span>
			<span @click="goOrdersPage" class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded">goBack</span> 
		</div>
		<div class="flex flex-col rounded-lg shadow-lg my-6 border border-gray-200">
			<form class="w-4/5 mx-auto mt-6 mb-16" @submit.prevent="saveOrder">
				<label class="block text-2xl text-gray-600 mb-4 ml-2">Change order details</label>
				<label class="block tex-sm text-gray-600 mb-2 ml-2">Clients email</label>	
				<input name="order.client_email" class="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order.client_email" type="email" v-model="details.order.client_email">
<!-- 				<label class="block tex-sm text-gray-600 mb-2 ml-2">Order status</label>	
				<select name="order.status" class="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order.status" type="text" v-model="details.order.status">
					<option :value="0">New order</option>
					<option :value="10">Order Confirmed</option>
					<option :value="20">Order Completed</option>
				</select> -->
				<div class="flex">
					<button class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" type="submit">Change Order</button>	
				</div>
			</form>

			<div class="w-4/5 mx-auto mb-16" >
				<label class="block text-2xl text-gray-600 mb-4 ml-2 text-center">Change order status</label>
				<div class="flex justify-center">
					<span class="cursor-pointer mx-2 shadow hover:bg-indigo-700 hover:text-white focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded" :class="details.order.status == 0 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'" @click="markOrder(0)">
						<span v-if="details.order.status !== 0">Mark order as a NEW</span><span v-else>This is a New Order</span>
					</span>
					<span class="cursor-pointer mx-2 shadow hover:bg-indigo-700 hover:text-white focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded" :class="details.order.status == 10 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'" @click="markOrder(10)">
						<span v-if="details.order.status !== 10">Mark order as a CONFIRMED</span><span v-else>This order was confirmed</span>
					</span>
					<span class="cursor-pointer mx-2 shadow hover:bg-indigo-700 hover:text-white focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded" :class="details.order.status == 20 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'" @click="markOrder(20)">
						<span v-if="details.order.status !== 20">Mark order as a COMPLETED</span><span v-else>This order is completed</span>
					</span>
				</div>
			</div>

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
								<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									<span class="mx-auto">Delete order</span> 
								</th>
							</tr>
						</thead>
	          			<tbody>
	          				<tr v-for="(product, index) in details.orderDetails" :class="index % 2 == 0 ? 'bg-white' : 'bg-gray-100'" :key="product.id" >
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						{{productName(product.product_id)[0].name}}
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						<input name="product.quantity" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product.id" type="number" v-model="product.quantity" :disabled="details.order.status == 20">
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						{{product.price}}
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						{{product.quantity*product.price}}
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						<div class="cursor-pointer py-2" @click="deleteItem(product)">
		          						<svg class="w-4 h-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		          						  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
		          						</svg>
	          						</div>
	          					</td>
	          				</tr>
	          			</tbody>
	        		</table>

				<div class="flex mt-6">
					<button class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" type="submit">Change Order Details</button>	
					<span class="ml-auto shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" @click="checkOrderCompleted">Add more product to order</span>	
				</div>

			</form>		
			<form v-if="addNewItem" class="w-4/5 mx-auto mb-16" @submit.prevent="addProduct">
				<label class="block text-2xl text-gray-600 mb-4 ml-2">Add new item for the order {{details.order.id}}</label>
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
	          				<tr class="bg-white">
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						<select v-model="newItem" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
	          							<option v-for="product in products" :value="product">{{product.name}}</option>
	          						</select>
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						<input name="product.quantity" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product.id" type="number" v-model="newItem.quantity" placeholder="enter quantuty...">
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" v-model="newItem.price">
	          						{{newItem.price}}
	          					</td>
	          					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
	          						{{newItemPrice()}}
	          					</td>

	          				</tr>
	          			</tbody>
	        		</table>

				<div class="flex mt-6">
					<button class="shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" type="submit" >Add New Item to the order {{details.order.id}}</button>	
					<span class="ml-6 shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded" @click="clearNewItem">Add Cancel</span>	
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
				addNewItem: false,
				newItem: {},
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
			markOrder(status) {
				let fieldsToChange = {
			        status: status,					   
				}
				this.updateOrder(fieldsToChange)
			},
			deleteItem(item) {
				if (this.details.order.status == 20) {
					alert('This order is already delivered. You can not modified it any more');
					return;
				}
				let deleteItem = confirm("You are aboute to delete " + this.productName(item.product_id)[0].name +" from the order");
				if (deleteItem) {
					axios.post('/api/deleteItem/'+item.id)
					    .then(response => {
					    	this.refreshOrder();
					        console.log(response);
					    })
					    .catch(error => {
					        console.log(error);
					    });
				}
			},
			clearNewItem() {
				this.addNewItem = false;
				this.newItem ={};
			},
			checkOrderCompleted() {
				if (this.details.order.status == 20) {
					alert('This order is already delivered. You can not modified it any more');
					return;
				}
				this.addNewItem = true;
			},
			addProduct() {
				if (!this.newItem.quantity) {
					alert('You have to provide item quantuty first');
					return;
				};
				let itemToAdd = this.newItem;
				itemToAdd.order_id = this.details.order.id;
				axios.post('/api/addNewProduct', itemToAdd)
				    .then(response => {
				    	this.clearNewItem();
				    	this.refreshOrder();
				    })
				    .catch(error => {
				        console.log(error);
				    });
				 
				this.addNewItem = false;
				this.refreshOrder;
			},
			newItemPrice() {
				if (!this.newItem || !this.newItem.quantity) {
					return null;
				} else {
					return this.newItem.price*this.newItem.quantity;
				}
			},
			saveOrder() {
				let fieldsToChange = {
			        client_email: this.details.order.client_email,
			        // status: this.details.order.status,					   
				}
				this.updateOrder(fieldsToChange)
			},
			updateOrder(fieldsToChange) {
				if (fieldsToChange.status == 20 && this.details.order.status !== 20) {
					alert('Fire event about Order is Completed');
				}
				axios.post('/api/order/'+this.details.order.id, fieldsToChange)
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
				if (this.details.order.status == 20) {
					alert('This order is already delivered. You can not modified it any more');
					return;
				}
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