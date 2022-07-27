package com.google.sps.data;

/** An item on a todo list. */
public final class Money {

  private final long id;
  private final String type;
  private final long timestamp;
  private final Float amount;

  public Money(long id, String type, Float amount, long timestamp) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.timestamp = timestamp;
  }
}