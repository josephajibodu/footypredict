import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@/Components/ui/drawer';
import { MatchOptionEnum, MatchOptionLabels } from '@/enums/MatchOptionEnum';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import FacebookIcon from '@/Images/facebook.svg';
import TelegramIcon from '@/Images/telegram.svg';
import TwitterIcon from '@/Images/twitter.svg';
import WhatsappIcon from '@/Images/whatsapp.svg';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { cn, toMoney } from '@/lib/utils';
import { Bet, PageProps } from '@/types';
import { BetStatus, SportEventStatus } from '@/types/enums';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import {
    CheckCircle,
    CircleOff,
    Copy,
    LinkIcon,
    Share2Icon,
    XCircle,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import { toast } from 'sonner';

const socialPlatforms = [
    {
        key: 'facebook',
        label: 'Facebook',
        image: FacebookIcon,
    },
    {
        key: 'whatsapp',
        label: 'Whatsapp',
        image: WhatsappIcon,
    },
    {
        key: 'telegram',
        label: 'Telegram',
        image: TelegramIcon,
    },
    {
        key: 'twitter',
        label: 'Twitter',
        image: TwitterIcon,
    },
];

interface BetDetailsProps extends PageProps {
    bet: Bet;
}

export default function BetDetails({ bet }: BetDetailsProps) {
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [, copy] = useCopyToClipboard();
    async function handleCopyBookingCode() {
        await copy(bet.code);
        toast.success('Booking code copied to clipboard.', {
            duration: 2000,
        });
    }

    function handleShare(platform: string) {
        const shareUrl = route('bets-slip.share', { code: bet.code });
        const shareText = `Check out my bet on Footypredict with booking code: ${bet.code}`;

        switch (platform) {
            case 'facebook':
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                );
                break;
            case 'twitter':
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                );
                break;
            case 'telegram':
                window.open(
                    `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
                    '_blank',
                );
                break;
            case 'whatsapp':
                window.open(
                    `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
                    '_blank',
                );
                break;
            default:
                break;
        }
    }

    function handleSaveImage() {
        // Implement logic to save the bet details as an image
        toast.success('Image saved successfully.', {
            duration: 2000,
        });
    }

    async function handleCopyBookingLink() {
        await copy(route('bets-slip.share', { code: bet.code }));
        toast.success('Booking link copied to clipboard.', {
            duration: 2000,
            position: 'bottom-center',
        });
    }

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
                        <div className="flex justify-between border-b pb-4">
                            <div className="flex items-center gap-2">
                                <span>Booking Code</span>
                                <Share2Icon
                                    className="size-4 cursor-pointer"
                                    onClick={() => setOpenShareDialog(true)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{bet.code}</span>
                                <Copy
                                    className="size-4 cursor-pointer"
                                    onClick={handleCopyBookingCode}
                                />
                            </div>
                        </div>
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

                    <Link
                        href={route('transaction.show', {
                            transaction: bet.transaction.reference,
                        })}
                        className="mt-4 block text-center font-semibold text-gray-400 underline"
                    >
                        Check Transaction History
                    </Link>
                </div>

                {/* Footer */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    {/*{bet.ip_address} | {bet.device}*/}
                </p>
            </div>

            <Drawer open={openShareDialog} onOpenChange={setOpenShareDialog}>
                <DrawerContent className="bg-card">
                    <DrawerHeader className={'flex flex-col justify-start'}>
                        <div className="flex w-full items-center justify-between">
                            <DrawerTitle className="text-3xl">
                                Booking Code
                            </DrawerTitle>

                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">
                                    {bet.code}
                                </span>
                                <Copy
                                    className="size-4 cursor-pointer"
                                    onClick={handleCopyBookingCode}
                                />
                            </div>
                        </div>
                    </DrawerHeader>
                    <div className="min-h-[200px] p-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            <div
                                className="flex flex-col items-center"
                                role="button"
                                aria-label="copy link"
                                onClick={handleCopyBookingLink}
                            >
                                <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-gray-300">
                                    <LinkIcon className="text-primary" />
                                </div>
                                <span>Copy Link</span>
                            </div>

                            {socialPlatforms.map((platform) => (
                                <div
                                    key={platform.key}
                                    className="flex flex-col items-center"
                                    role="button"
                                    aria-label={platform.label}
                                    onClick={() => handleShare(platform.key)}
                                >
                                    <img
                                        className="mb-2 w-12"
                                        src={platform.image}
                                        alt={platform.label}
                                    />
                                    <span>{platform.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

BetDetails.layout = (page: ReactNode) => (
    <Authenticated
        title="Bet Details"
        showHeader={false}
        backUrl={route('bets.open-bets')}
        hideBottomNav
    >
        {page}
    </Authenticated>
);
