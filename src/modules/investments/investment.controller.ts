import { FastifyRequest, FastifyReply } from 'fastify';
import Investment from './investment.model';
import { getLivePrice } from './price.service';

export const getUserPortfolio = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user as { id: string };
  const userId = user.id;

  const investments = await Investment.find({ user: userId }).populate('bank', 'bankName');

  if (!investments.length) {
    return reply.send({ data: [], totalValue: 0, totalProfitLoss: 0 });
  }

  let totalValue = 0;
  let totalInvested = 0;

  const enrichedPortfolio = await Promise.all(investments.map(async (inv) => {
    
    const livePrice = await getLivePrice(inv.symbol, inv.type);
    
    const currentTotalValue = livePrice * inv.quantity;
    const investedAmount = inv.averageBuyPrice * inv.quantity;
    const profitLoss = currentTotalValue - investedAmount;
    const profitLossPercentage = investedAmount > 0 
      ? (profitLoss / investedAmount) * 100 
      : 0;

    totalValue += currentTotalValue;
    totalInvested += investedAmount;

    return {
      id: inv._id,
      bankName: (inv.bank as any)?.bankName || 'Sconosciuto',
      symbol: inv.symbol,
      type: inv.type,
      quantity: inv.quantity,
      averageBuyPrice: inv.averageBuyPrice,
      livePrice,
      currentTotalValue,
      profitLoss,
      profitLossPercentage
    };
  }));

  const totalGlobalProfitLoss = totalValue - totalInvested;

  return reply.send({
    data: enrichedPortfolio,
    summary: {
      totalValue,
      totalInvested,
      totalGlobalProfitLoss,
      totalGlobalProfitLossPercentage: totalInvested > 0 
        ? (totalGlobalProfitLoss / totalInvested) * 100 
        : 0
    }
  });
};

export const addInvestment = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user as { id: string };
  const { symbol, type, quantity, averageBuyPrice, currency, bankId } = request.body as any;

  try {
    const existing = await Investment.findOne({ user: user.id, symbol, bank: bankId });

    if (existing) {
      const oldTotalValue = existing.quantity * existing.averageBuyPrice;
      const newAddedValue = quantity * averageBuyPrice;
      
      const newQuantity = existing.quantity + quantity;
      const newAveragePrice = (oldTotalValue + newAddedValue) / newQuantity;

      existing.quantity = newQuantity;
      existing.averageBuyPrice = newAveragePrice;
      await existing.save();

      return reply.status(200).send({ message: 'Posizione aggiornata con successo!', data: existing });
    }

    const newInvestment = await Investment.create({
      user: user.id,
      bank: bankId,
      symbol,
      type,
      quantity,
      averageBuyPrice,
      currency: currency || 'EUR'
    });

    return reply.status(201).send({ message: 'Investimento aggiunto!', data: newInvestment });
  } catch (error) {
    return reply.status(500).send({ message: 'Errore durante il salvataggio', error });
  }
};

export const deleteInvestment = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user as { id: string };
  const { id } = request.params as { id: string };

  try {
    await Investment.findOneAndDelete({ _id: id, user: user.id });
    return reply.send({ message: 'Asset eliminato dal portafoglio' });
  } catch (error) {
    return reply.status(500).send({ message: 'Errore durante l\'eliminazione', error });
  }
};