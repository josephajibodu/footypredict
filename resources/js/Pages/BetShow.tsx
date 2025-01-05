import Authenticated from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import { ReactNode } from 'react';
import dayjs from 'dayjs';
import { BetStatus } from '@/types/enums';
import { Bet, PageProps } from '@/types';
import { toMoney } from '@/lib/utils';
import {MatchOptionEnum, MatchOptionLabels} from "@/enums/MatchOptionEnum";

interface BetDetailsProps extends PageProps {
    bet: Bet;
}

export default function BetDetails({ bet }: BetDetailsProps) {
    const isLost = bet.status === BetStatus.Lost;
    const statusClass = isLost ? 'text-red-600' : 'text-green-600';

    return (
        <>
            <Head title="Bet Details" />

            <div className="">
                {/* Header */}
                <div className="bg-red-600 text-white p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-lg">Ticket Details</h1>
                        <span>{dayjs(bet.created_at).format('DD/MM HH:mm')}</span>
                    </div>
                    <p className={`${statusClass} font-bold text-xl mt-2`}>
                        {bet.status === BetStatus.Lost ? 'Lost' : 'Won'}
                    </p>
                </div>

                {/* Ticket Info */}
                <div className="bg-black text-white p-4 space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold">Singles</h2>
                        <div className="flex justify-between">
                            <span>Total Return</span>
                            <span className="font-bold">{toMoney(bet.potential_winnings || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Stake</span>
                            <span className="font-bold">{toMoney(bet.stake)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Odds</span>
                            <span className="font-bold">2</span>
                        </div>
                    </div>
                </div>

                {/* Bet Details */}
                <div className="bg-white p-4 mt-4">
                    {bet.sport_events?.map((event) => (
                        <div key={event.id} className="border-b pb-4 mb-4">
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
                                    <span className="font-bold">{MatchOptionLabels[MatchOptionEnum[event.outcome_option?.type.toUpperCase() as keyof typeof MatchOptionEnum]]}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Actions */}
                <div className="bg-white p-4 mt-4">
                    <div className="flex justify-between items-center">
                        <span>Number of Bets: {bet.sport_events?.length}</span>
                        <Link href={route('transaction.show', {transaction: bet.transaction_id})} className="text-green-600 font-semibold">
                            Bet Details
                        </Link>
                    </div>
                    <a
                        href={route('wallet')}
                        className="block mt-4 text-center text-green-600 font-semibold"
                    >
                        Check Transaction History
                    </a>
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