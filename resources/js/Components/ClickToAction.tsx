import {Button} from "@/Components/ui/button";

export default function ClickToAction() {
    return (
        <div className="max-w-screen-xl bg-gradient-to-r from-primary to-card mx-auto py-12 px-6 rounded-lg">
            <h2 className="text-4xl font-bold mb-6">
                Ready to Start Winning Big?
            </h2>
            <p className="text-lg mb-8 text-prose">
                Don’t wait to turn your football knowledge into real winnings. Join the thousands of fans already
                making accurate predictions and staking with FootyPredict today!
            </p>

            <Button
                variant="secondary"
                size="lg"
                className="bg-gradient-to-r from-secondary to-accent text-base h-12"
            >
                Watch out for launch
            </Button>
        </div>
    );
}