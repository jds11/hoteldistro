import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata = { 
  title: "Contact — Hotel Distribution",
  description: "Get in touch with the authors of this hotel distribution textbook. Questions about distribution strategy, technology, or hospitality education are welcome."
};

export default function ContactPage() {

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Nav />
      <PageHeader
        label="Get In Touch"
        title="Contact"
        subtitle="Questions about hotel distribution or this textbook? We'd love to hear from you."
      />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
