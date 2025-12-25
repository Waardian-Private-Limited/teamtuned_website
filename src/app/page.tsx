import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import AttendanceFlowSection from "@/components/Attendance";
import Navbar from "@/components/Header";
import WalletSection from "@/components/Wallet";
import TaskSection from "@/components/Task";
import DownloadsSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import ComingSoonCinematic from "@/components/commingSoon";



export default function Page() {
  return (
    <main className="relative">
      {/* <ComingSoonCinematic /> */}
      <Navbar />
      <Hero />
      <div id="features">
        <FeaturesSection />
      </div>
      <AttendanceFlowSection />
      <WalletSection />
      <TaskSection />
      <DownloadsSection />
      <Footer />
    </main>
  );
}
