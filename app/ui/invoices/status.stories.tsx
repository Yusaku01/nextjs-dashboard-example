import type { Meta, StoryObj } from "@storybook/react";
import InvoiceStatus from "./status";

const meta: Meta<typeof InvoiceStatus> = {
  title: "Invoices/Status",
  component: InvoiceStatus,
  argTypes: {
    status: {
      control: { type: "inline-radio" },
      options: ["pending", "paid"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof InvoiceStatus>;

export const Pending: Story = {
  args: { status: "pending" },
};

export const Paid: Story = {
  args: { status: "paid" },
};
