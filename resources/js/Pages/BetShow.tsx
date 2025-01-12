import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {ReactNode} from 'react';
import dayjs from 'dayjs';
import {BetStatus} from '@/types/enums';
import {Bet, PageProps} from '@/types';
import {cn, toMoney} from '@/lib/utils';
import {MatchOptionEnum, MatchOptionLabels} from "@/enums/MatchOptionEnum";
import {CheckCircle, XCircle} from "lucide-react";

interface BetDetailsProps extends PageProps {
    bet: Bet;
}

export default function BetDetails({ bet }: BetDetailsProps) {

    return (
        <>
            <Head title="Bet Details" />

            <div className="">
                {/* Header */}
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-lg">Ticket Details</h1>
                        <span>{dayjs(bet.created_at).format('DD/MM HH:mm')}</span>
                    </div>
                    <p className={cn("font-bold text-xl mt-2 capitalize", {
                        "text-red-600": bet.status === BetStatus.Lost || bet.status === BetStatus.Canceled,
                        "text-green-600": bet.status === BetStatus.Won,
                        "text-orange-600": bet.status === BetStatus.Pending,
                    })}>
                        {bet.status}
                    </p>
                </div>

                {/* Ticket Info */}
                <div className="bg-card text-white p-4">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Expected Multiplier</span>
                            <span className="font-bold">x{bet.multiplier_settings.main}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Stake</span>
                            <span className="font-bold">{toMoney(bet.stake)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Return</span>
                            <span className="font-bold">{toMoney(bet.potential_winnings || 0)}</span>
                        </div>
                    </div>
                </div>

                {/* Bet Details */}
                <div className="p-4 mt-4 space-y-4">
                    {bet.sport_events?.map((event) => (
                        <div key={event.id} className="border bg-card py-4 px-4 rounded-lg text-sm">
                            <div className="flex justify-between">
                                <span>{dayjs(event.kickoff_time).format('DD/MM HH:mm')}</span>
                            </div>
                            <p className="text-lg font-semibold">{event.team1.name} vs {event.team2.name}</p>
                            <div className="mt-2 space-y-2">
                                <div className="flex justify-between">
                                    <span>Pick:</span>
                                    <span className="font-bold">{MatchOptionLabels[MatchOptionEnum[event.selected_option?.type.toUpperCase() as keyof typeof MatchOptionEnum]]}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Outcome:</span>
                                    <span className="font-bold flex items-center gap-2">
                                        {event.selected_option?.id === event.outcome_option?.id
                                            ? <CheckCircle className="text-green-600 size-4" />
                                            : <XCircle className="text-destructive size-4" />}
                                        {MatchOptionLabels[MatchOptionEnum[event.outcome_option?.type.toUpperCase() as keyof typeof MatchOptionEnum]]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Actions */}
                <div className="bg-card text-center p-4 mt-4">
                    <span>Number of Matches: {bet.sport_events?.length}</span>
                    <Link
                        href={route('transaction.show', {transaction: bet.transaction.reference})}
                        className="block mt-4 text-center text-gray-400 underline font-semibold"
                    >
                        Check Transaction History
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 mt-4 text-sm">
                    {/*{bet.ip_address} | {bet.device}*/}
                </p>
            </div>
        </>
    );
}

BetDetails.layout = (page: ReactNode) => (
    <Authenticated
        title="Bet Details"
        showHeader={false}
        backUrl={route('bets')}
        hideBottomNav
    >
        {page}
    </Authenticated>
);