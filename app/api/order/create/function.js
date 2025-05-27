import axios from "axios";
import Address from "@/models/Address";
import Product from "@/models/Product";

export async function sendOrderMessage(order) {
    try {
        // Enrich item details with product names
        const enrichedItems = await Promise.all(order.items.map(async (item) => {
            const product = await Product.findById(item.product);
            return {
                name: product ? product.name : 'Unknown Product',
                size: item.size,
                color: item.color,
                quantity: item.quantity
            };
        }));

        // Fetch full address
        const newaddress = await Address.findById(order.address);

        // Construct the message
        const message = `🛒 *New Order Received*

📍 *Shipping Address:*
 ${newaddress.fullName}
 ${newaddress.phoneNumber}
 ${newaddress.area}, ${newaddress.city}, ${newaddress.state} - ${newaddress.pincode}

 *Items:*
${enrichedItems.map((item, i) =>
            `  ${i + 1}. ${item.name} x${item.quantity} ${item.size !== "null" ? `(Size: ${item.size})` : ""} ${item.color !== "null" ? `(Color: ${item.color})` : ""}`
        ).join('\n')}

 *Amount:* ₹${order.amount}
 *Date:* ${new Date(order.date).toLocaleString()}
`;

        // WhatsApp API credentials
        const token = process.env.TOKEN; // keep this secure
        const phoneNumberId = '677332382129481';
       const recipientPhone = '+916375921418';
       
    //    const recipientPhone = '+917005969269';

        // Send message
        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
            {
                messaging_product: "whatsapp",
                to: recipientPhone,
                type: "text",
                text: { body: message }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.status === 200;
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
        return false;
    }
}
