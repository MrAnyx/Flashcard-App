<template>
    <BaseModal title="Challenge Your Knowledge">
        <div class="flex flex-col space-y-6">
            <p>Welcome to your session where you take on your entire brain! You'll be pulling cards from your own collection, so <b>no topic is safe</b>. Math? Korean? Cooking? That random science fact you swore you'd never forget? They're all in the mix, because you made them!</p>

            <p>
                Each card has a question you've crafted, and your mission, should you choose to accept, is to answer without sneaking a look at the back. After each question, you'll rate your performance :
                <span class="inline-flex space-x-1">
                    <UTooltip text="Oops! Let's give that one another go—your brain's still warming up!" :ui="{ width: 'max-w-md' }">
                        <UBadge color="red" variant="subtle" class="space-x-1 items-center">
                            <UIcon name="i-tabler-reload" class="w-3 h-3" />
                            <span>Again</span>
                        </UBadge>
                    </UTooltip>
                    <UTooltip text="Close, but not quite there. It's a tough one, but you're getting it!" :ui="{ width: 'max-w-md' }">
                        <UBadge color="orange" variant="subtle" class="space-x-1 items-center">
                            <UIcon name="i-tabler-brain" class="w-3 h-3" />
                            <span>Hard</span>
                        </UBadge>
                    </UTooltip>
                    <UTooltip text="Nicely done! You've got the gist, but maybe a bit more practice wouldn't hurt." :ui="{ width: 'max-w-md' }">
                        <UBadge color="sky" variant="subtle" class="space-x-1 items-center">
                            <UIcon name="i-tabler-circle-dashed-check" class="w-3 h-3" />
                            <span>Good</span>
                        </UBadge>
                    </UTooltip>
                    <UTooltip text="Nailed it! You could answer this one in your sleep!" :ui="{ width: 'max-w-md' }">
                        <UBadge color="green" variant="subtle" class="space-x-1 items-center">
                            <UIcon name="i-tabler-checks" class="w-3 h-3" />
                            <span>Easy</span>
                        </UBadge>
                    </UTooltip>
                </span>
            </p>

            <p>Get it right, and bask in the glory. Get it wrong, and well… it's still your collection, so nobody else has to know!</p>

            <p>Time to outwit your own memory!</p>

            <UCheckbox label="Don't show again?" />

            <UButton type="submit" block icon="i-tabler-device-gamepad-2">
                Let's play
            </UButton>
        </div>
    </BaseModal>
</template>

<script setup lang="ts">
const modal = useModal();
const repository = useRepository();
</script>
