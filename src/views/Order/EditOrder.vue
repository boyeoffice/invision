<template>
	<div class="row">
		<div class="col-md-8">
			<div class="box box-default">
				<div class="box-header with-border">
					<h3>Order Details: Ron Weasley - 2017 Winter Season</h3>
				</div>
				<div class="box-body">
					<label>Monday</label>
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Quantity</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="col-md-8">Froozen Butterbeer</td>
								<td class="col-md-2">1</td>
								<td class="col-md-2">Remove</td>
							</tr>
							<tr>
								<td>Shepherd's pie</td>
								<td>1</td>
								<td>Remove</td>
							</tr>
							<tr>
								<td>Shepherd's pie</td>
								<td>1</td>
								<td>Remove</td>
							</tr>
						</tbody>
					</table>
					<br/>
					<label>Tuesday</label>
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Quantity</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="col-md-8">The Great Feast P;atter</td>
								<td class="col-md-2">1</td>
								<td class="col-md-2">Remove</td>
							</tr>
							<tr>
								<td>Pumpkin Fizz</td>
								<td>1</td>
								<td>Remove</td>
							</tr>
						</tbody>
					</table>
					<br/>
					<label>Wednessday</label>
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Quantity</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="col-md-8">Beef, Lamb, & Guinness Stew</td>
								<td class="col-md-2">1</td>
								<td class="col-md-2">Remove</td>
							</tr>
							<tr>
								<td>Chocolate Frog</td>
								<td>1</td>
								<td>Remove</td>
							</tr>
						</tbody>
					</table>
					<br/>
					<label>Thursday</label>
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Quantity</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="col-md-8">Pumpkin Juice</td>
								<td class="col-md-2">1</td>
								<td class="col-md-2">Remove</td>
							</tr>
							<tr>
								<td>Exploiding Bon Bons</td>
								<td>1</td>
								<td>Remove</td>
							</tr>
						</tbody>
					</table>
					<br/>
					<label>Friday</label>
					<table class="table table-striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Quantity</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="col-md-8">Beef sunday Roast</td>
								<td class="col-md-2">1</td>
								<td class="col-md-2">Remove</td>
							</tr>
							<tr>
								<td>Chocolate Frog</td>
								<td>1</td>
								<td>Remove</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="box box-default">
				<div class="box-header with-border">
					<h3 class="box-title">Transactions</h3>
				</div>
				<div class="box-body">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Date</th>
								<th>Description</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><router-link to="/order/2017/a"> 2017-06-08</router-link></td>
								<td><router-link to="/order/desc/b">Order Placed</router-link></td>
								<td><router-link to="/order/amount/c">$100</router-link></td>
							</tr>
							<tr>
								<td><router-link to="/order/2017/a"> 2017-06-09</router-link></td>
								<td><router-link to="/order/desc/b"> Quantity Adjusted</router-link></td>
								<td><router-link to="/order/amount/c">$150</router-link></td>
							</tr>
							<tr>
								<td><router-link to="/order/2017/a"> 2017-06-15</router-link></td>
								<td><router-link to="/order/desc/b">Item(s) added</router-link></td>
								<td><router-link to="/order/amount/c">$375</router-link></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>