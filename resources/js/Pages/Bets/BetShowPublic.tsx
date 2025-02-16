import { MatchOptionEnum, MatchOptionLabels } from '@/enums/MatchOptionEnum';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { cn, toMoney } from '@/lib/utils';
import { Bet, PageProps } from '@/types';
import { BetStatus, SportEventStatus } from '@/types/enums';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import { CheckCircle, CircleOff, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

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
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-bold">Ticket Details</h1>
                        <span>
                            {dayjs(bet.created_at).format('DD/MM HH:mm')}
                        </span>
                    </div>
                    <p
                        className={cn('mt-2 text-xl font-bold capitalize', {
                            'text-red-600':
                                bet.status === BetStatus.Lost ||
                                bet.status === BetStatus.Canceled,
                            'text-green-600': bet.status === BetStatus.Won,
                            'text-orange-600': bet.status === BetStatus.Pending,
                        })}
                    >
                        {bet.status}
                    </p>
                </div>

                {/* Ticket Info */}
                <div className="bg-card p-4 text-white">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Expected Multiplier</span>
                            <span className="font-bold">
                                {bet.is_flexed && (
                                    <span className="me-2 text-sm">
                                        (Flexed)
                                    </span>
                                )}
                                x
                                {bet.is_flexed
                                    ? bet.multiplier_settings.flex_0
                                    : bet.multiplier_settings.main}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Stake</span>
                            <span className="font-bold">
                                {toMoney(bet.stake)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total Return</span>
                            <span className="font-bold">
                                {toMoney(bet.potential_winnings || 0)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bet Details */}
                <div className="mt-4 space-y-4 p-4">
                    {bet.sport_events?.map((event) => (
                        <div
                            key={event.id}
                            className="rounded-lg border bg-card px-4 py-4 text-sm"
                        >
                            <div className="flex justify-between">
                                <span>
                                    {dayjs(event.kickoff_time).format(
                                        'DD/MM HH:mm',
                                    )}
                                </span>
                            </div>
                            <p className="text-lg font-semibold">
                                {event.team1.name} vs {event.team2.name}
                            </p>
                            <div className="mt-2 space-y-2">
                                <div className="flex justify-between">
                                    <span>Pick:</span>
                                    <span className="font-bold">
                                        {
                                            MatchOptionLabels[
                                                MatchOptionEnum[
                                                    event.selected_option?.type.toUpperCase() as keyof typeof MatchOptionEnum
                                                ]
                                            ]
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Outcome:</span>
                                    <span className="flex items-center gap-2 font-bold">
                                        {event.selected_option?.id ===
                                            event.outcome_option?.id && (
                                            <CheckCircle className="size-4 text-green-600" />
                                        )}

                                        {event.selected_option?.id !==
                                            event.outcome_option?.id &&
                                            event.outcome_option !== null && (
                                                <XCircle className="size-4 text-destructive" />
                                            )}

                                        {
                                            MatchOptionLabels[
                                                MatchOptionEnum[
                                                    event.outcome_option?.type.toUpperCase() as keyof typeof MatchOptionEnum
                                                ]
                                            ]
                                        }

                                        {[
                                            SportEventStatus.Canceled,
                                            SportEventStatus.Postponed,
                                        ].includes(event.status) ? (
                                            <div className="flex items-center gap-2 rounded bg-destructive/20 px-2 text-destructive">
                                                <CircleOff className="size-4 text-destructive" />
                                                <span className="uppercase">
                                                    {event.status}
                                                </span>
                                            </div>
                                        ) : null}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Actions */}
                <div className="mt-4 bg-card p-4 text-center">
                    <span>Number of Matches: {bet.sport_events?.length}</span>

                    {bet.is_flexed && (
                        <div className="my-3 flex flex-col rounded bg-primary/50 py-2 text-sm">
                            <span className="mb-2 font-bold">
                                Multiplier Details
                            </span>
                            <p>
                                <span className="text-gray-300">
                                    Get all {bet.multiplier_settings.selection}{' '}
                                    correct for x
                                    {bet.multiplier_settings.flex_0}
                                </span>
                            </p>
                            {bet.multiplier_settings.flex_1 && (
                                <p>
                                    <span className="text-gray-300">
                                        Get{' '}
                                        {bet.multiplier_settings.selection - 1}{' '}
                                        correct for x
                                        {bet.multiplier_settings.flex_1}
                                    </span>
                                </p>
                            )}
                            {bet.multiplier_settings.flex_2 && (
                                <p>
                                    <span className="text-gray-300">
                                        Get{' '}
                                        {bet.multiplier_settings.selection - 2}{' '}
                                        correct for x
                                        {bet.multiplier_settings.flex_2}
                                    </span>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

BetDetails.layout = (page: ReactNode) => (
    <Authenticated title="Bet Details" showHeader={false} hideBottomNav>
        {page}
    </Authenticated>
);
