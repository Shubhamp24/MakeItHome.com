package com.app.pojos;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
public class Payment extends BaseEntity {
	@Column(name = "payment_date")
	private LocalDateTime paymentDate;
	@Column(name = "payment_amount")
	private double paymentAmount;
	@Column(name = "transaction_id")
	private String transactionId;
	@Column(name = "razorpay_paymentId")
	private String razorPayPaymentId;
	@OneToOne
	@JoinColumn(name = "order_id")
	private Order orderId;
	@Column(name="razorpay_orderId")
	private String razorPayOrderId;
	@Column(name="payment_status")
	private String payementStatus;
	
	public Payment(double paymentAmount, String transactionId, String razorPayPaymentId,
			Order orderId, String razorPayOrderId) {
		super();
		this.paymentDate = LocalDateTime.now();
		this.paymentAmount = paymentAmount;
		this.transactionId = transactionId;
		this.razorPayPaymentId = razorPayPaymentId;
		this.orderId = orderId;
		this.razorPayOrderId = razorPayOrderId;
		this.payementStatus = "NOT PAID";
	}

	@Override
	public String toString() {
		return "Payment [paymentDate=" + paymentDate + ", paymentAmount=" + paymentAmount + ", transactionId="
				+ transactionId + ", razorPayPaymentId=" + razorPayPaymentId + ", orderId=" + orderId
				+ ", razorPayOrderId=" + razorPayOrderId + ", payementStatus=" + payementStatus + "]";
	}


}
