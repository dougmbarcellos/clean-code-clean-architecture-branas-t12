import Ride from '../Ride';
import InvoiceSentStatus from './InvoiceSentStatus';
import RideStatus from './RideStatus';

export default class PaymentProcessedStatus extends RideStatus {
  value: string;

  constructor(ride: Ride) {
    super(ride);
    this.value = 'paymentProcessed';
  }

  request(): void {
    throw new Error('Invalid status');
  }
  accept(): void {
    throw new Error('Invalid status');
  }
  start(): void {
    throw new Error('Invalid status');
  }
  end(): void {
    throw new Error('Invalid status');
  }
  processPayment(): void {
    throw new Error('Invalid status');
  }
  sendInvoice(): void {
    this.ride.rideStatus = new InvoiceSentStatus(this.ride);
  }
}
