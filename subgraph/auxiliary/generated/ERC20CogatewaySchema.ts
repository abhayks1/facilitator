/* eslint-disable @typescript-eslint/explicit-member-accessibility */
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ConfirmedDepositIntent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save ConfirmedDepositIntent entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ConfirmedDepositIntent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ConfirmedDepositIntent", id.toString(), this);
  }

  static load(id: string): ConfirmedDepositIntent | null {
    return store.get(
      "ConfirmedDepositIntent",
      id
    ) as ConfirmedDepositIntent | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get messageHash(): Bytes {
    let value = this.get("messageHash");
    return value.toBytes();
  }

  set messageHash(value: Bytes) {
    this.set("messageHash", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}

export class ProvenGateway extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ProvenGateway entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ProvenGateway entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ProvenGateway", id.toString(), this);
  }

  static load(id: string): ProvenGateway | null {
    return store.get("ProvenGateway", id) as ProvenGateway | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get remoteGateway(): Bytes {
    let value = this.get("remoteGateway");
    return value.toBytes();
  }

  set remoteGateway(value: Bytes) {
    this.set("remoteGateway", Value.fromBytes(value));
  }

  get provenBlockNumber(): BigInt {
    let value = this.get("provenBlockNumber");
    return value.toBigInt();
  }

  set provenBlockNumber(value: BigInt) {
    this.set("provenBlockNumber", Value.fromBigInt(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}

export class CreatedUtilityToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save CreatedUtilityToken entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save CreatedUtilityToken entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("CreatedUtilityToken", id.toString(), this);
  }

  static load(id: string): CreatedUtilityToken | null {
    return store.get("CreatedUtilityToken", id) as CreatedUtilityToken | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get valueToken(): Bytes {
    let value = this.get("valueToken");
    return value.toBytes();
  }

  set valueToken(value: Bytes) {
    this.set("valueToken", Value.fromBytes(value));
  }

  get utilityToken(): Bytes {
    let value = this.get("utilityToken");
    return value.toBytes();
  }

  set utilityToken(value: Bytes) {
    this.set("utilityToken", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}

export class DeclaredWithdrawIntent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save DeclaredWithdrawIntent entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DeclaredWithdrawIntent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("WithdrawIntentDeclared", id.toString(), this);
  }

  static load(id: string): DeclaredWithdrawIntent | null {
    return store.get(
      "DeclaredWithdrawIntent",
      id
    ) as DeclaredWithdrawIntent | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get nonce(): BigInt {
    let value = this.get("nonce");
    return value.toBigInt();
  }

  set nonce(value: BigInt) {
    this.set("nonce", Value.fromBigInt(value));
  }

  get beneficiary(): Bytes {
    let value = this.get("beneficiary");
    return value.toBytes();
  }

  set beneficiary(value: Bytes) {
    this.set("beneficiary", Value.fromBytes(value));
  }

  get feeGasPrice(): BigInt {
    let value = this.get("feeGasPrice");
    return value.toBigInt();
  }

  set feeGasPrice(value: BigInt) {
    this.set("feeGasPrice", Value.fromBigInt(value));
  }

  get feeGasLimit(): BigInt {
    let value = this.get("feeGasLimit");
    return value.toBigInt();
  }

  set feeGasLimit(value: BigInt) {
    this.set("feeGasLimit", Value.fromBigInt(value));
  }

  get withdrawer(): Bytes {
    let value = this.get("withdrawer");
    return value.toBytes();
  }

  set withdrawer(value: Bytes) {
    this.set("withdrawer", Value.fromBytes(value));
  }

  get utilityToken(): Bytes {
    let value = this.get("utilityToken");
    return value.toBytes();
  }

  set utilityToken(value: Bytes) {
    this.set("utilityToken", Value.fromBytes(value));
  }

  get messageHash(): Bytes {
    let value = this.get("messageHash");
    return value.toBytes();
  }

  set messageHash(value: Bytes) {
    this.set("messageHash", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get blockHash(): Bytes {
    let value = this.get("blockHash");
    return value.toBytes();
  }

  set blockHash(value: Bytes) {
    this.set("blockHash", Value.fromBytes(value));
  }

  get contractAddress(): Bytes {
    let value = this.get("contractAddress");
    return value.toBytes();
  }

  set contractAddress(value: Bytes) {
    this.set("contractAddress", Value.fromBytes(value));
  }

  get uts(): BigInt {
    let value = this.get("uts");
    return value.toBigInt();
  }

  set uts(value: BigInt) {
    this.set("uts", Value.fromBigInt(value));
  }
}