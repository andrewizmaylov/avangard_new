<template>
	<tr>
		<td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-center">
			<span @click="changeOrder" class="text-indigo-600 hover:text-white hover:bg-indigo-600 rounded-lg cursor-pointer p-4">{{order.id}}</span>
		</td>
		<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
			{{partnerName()}}
		</td>
		<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
			{{orderAmount()}}
		</td>
		<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
			<ul v-for="item in products()">
				<li>{{item}}</li>
			</ul>
		</td>
		<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
			{{status()}}
		</td>
	</tr>
</template>
<script>
	export default {
		name: 'rowFromOrder',
		props: ['order'],
		data() {
			return {
				details: {},
			}
		},
		created() {
			axios.get('/api/order/'+this.order.id)
			    .then(response => {
			        this.details = response.data;
			    })
			    .catch(error => {
			        console.log(error);
			    });
		},
		methods: {
			changeOrder() {
				this.$router.push({name: 'editOrder', params: { order: this.order }});
			},
			partnerName() {
				return this.details.order.partner.name;
			},
			orderAmount() {
				let amount = 0;
				this.details.orderDetails.filter(item => {
					amount += item.price * item.quantity;
				})
				return amount;
			},
			products() {
				let items = [];
				this.details.order.products.filter(item => {
					return items.push(item.name);
				})
				return items;
			},
			status() {
				if (this.order.status == 20) {
					return "Order completed. " + moment(this.order.delivery_dt).format("YYYY-MM-DD HH:mm:ss");
				} else if (this.order.status == 10) {
					return "Order confirmed. Expiration date: " + moment(this.order.delivery_dt).format("YYYY-MM-DD HH:mm:ss");
				} 
				return "New order. Expiration date: " + moment(this.order.delivery_dt).format("YYYY-MM-DD HH:mm:ss");
			}
		}
	}
</script>