<template>
  <div class="row">
    <div class="col-md-12">
      <div class="box box-default">
        <div class="box-header with-border">
          Order Transaction - Ron Weasley - 2017 Winter Session
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-4">
              Ordered on June 9, 2017
            </div>
            <div class="col-md-4">
              Transaction Type: Refund
            </div>
            <div class="col-md-4">
              Ordered ID: f7hrkhdu8478uisufir8u489385
              <br/>
              Stripe TX ID: ccc-xxx-sss-eee-fff
            </div>
          </div>
          <!-- /.row -->
          <div class="row">
            <div class="col-md-4">
              <b>Payment Details</b>
            </div>
            <div class="col-md-4">
              <span>American Express xxxxxxxx119</span>
            </div>
          </div>
          <!-- /.row -->
          <div class="row">
            <div class="col-md-12">
              <label for="monday">Monday</label>
              <table class="table table-striped">
                <thead>
                  <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Days</th>
                  <th>Line Total</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="col-md-4">Frozen Butterbeer</td>
                    <td class="col-md-2">$2.00</td>
                    <td class="col-md-2">1</td>
                    <td class="col-md-2">16</td>
                    <td class="col-md-2">-$32.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label for="tuesday">Tuesday</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label for="wednessday">Wednessday</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label for="thursday">Thursday</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label for="friday">Friday</label>
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td class="col-md-4">Chocolate Frog</td>
                    <td class="col-md-2">$0.50</td>
                    <td class="col-md-2">4</td>
                    <td class="col-md-2">15</td>
                    <td class="col-md-2">-$30.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- /.row -->
          <div class="row">
            <div class="col-md-5 col-md-offset-5">
              <span>Subtotal</span>
            </div>
            <div class="col-md-1 colmd1">
               <b>-$62.00</b>
            </div>
            <div class="col-md-5 col-md-offset-5">
              Tax(6.875%)
            </div>
            <div class="col-md-1 colmd1">
               <b>-$4.26</b>
            </div>
            <div class="col-md-10">
              <b>Total</b>
            </div>
            <div class="col-md-1 colmd1">
              <b>$66.26</b>
            </div>
          </div>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <div class="col-md-4 col-md-offset-4">
            <router-link :to="{ name: 'Order', params: {} }" class="btn btn-default">Back to Order Summary</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template
