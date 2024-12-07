import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"


export default function Welcome() {

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-purple-800 text-white dark:bg-black dark:text-white/50 h-screen flex flex-col gap-8 items-center justify-center">
                <h1 className="text-4xl">Coming Soon</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>

            </div>
        </>
    );
}
